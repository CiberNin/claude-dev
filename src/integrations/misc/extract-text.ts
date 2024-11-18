import * as path from "path"
// @ts-ignore-next-line
import pdf from "pdf-parse/lib/pdf-parse"
import mammoth from "mammoth"
import fs from "fs/promises"
import { isBinaryFile } from "isbinaryfile"

export interface FileReadResult {
    path: string
    content?: string
    error?: string
    bytes: number
    lines: number
    modified: number // timestamp
}

export interface MultiFileReadResult {
    totalBytes: number
    totalLines: number
    files: FileReadResult[]
}

async function getFileMetadata(filePath: string, content?: string): Promise<Omit<FileReadResult, 'content' | 'error'>> {
    const stats = await fs.stat(filePath)
    return {
        path: filePath,
        bytes: stats.size,
        lines: content ? content.split('\n').length : 0,
        modified: stats.mtimeMs
    }
}

export async function extractTextFromFile(filePath: string): Promise<FileReadResult> {
    try {
        const stats = await fs.stat(filePath)
        
        // For binary files, return early with just metadata
        const isBinary = await isBinaryFile(filePath).catch(() => false)
        if (isBinary) {
            return {
                path: filePath,
                error: `Cannot read text for binary file: ${path.extname(filePath)}`,
                bytes: stats.size,
                lines: 0,
                modified: stats.mtimeMs
            }
        }

        // Read and process file based on extension
        const fileExtension = path.extname(filePath).toLowerCase()
        let content: string
        
        switch (fileExtension) {
            case ".pdf":
                content = await extractTextFromPDF(filePath)
                break
            case ".docx":
                content = await extractTextFromDOCX(filePath)
                break
            case ".ipynb":
                content = await extractTextFromIPYNB(filePath)
                break
            default:
                content = await fs.readFile(filePath, "utf8")
        }

        return {
            ...(await getFileMetadata(filePath, content)),
            content
        }

    } catch (error) {
        // For access errors, we won't have stats
        if (error.code === 'ENOENT') {
            return {
                path: filePath,
                error: `File not found: ${filePath}`,
                bytes: 0,
                lines: 0,
                modified: 0
            }
        }

        // For other errors, try to get stats if possible
        try {
            const stats = await fs.stat(filePath)
            return {
                path: filePath,
                error: error.message,
                bytes: stats.size,
                lines: 0,
                modified: stats.mtimeMs
            }
        } catch {
            return {
                path: filePath,
                error: error.message,
                bytes: 0,
                lines: 0,
                modified: 0
            }
        }
    }
}

async function extractTextFromPDF(filePath: string): Promise<string> {
    const dataBuffer = await fs.readFile(filePath)
    const data = await pdf(dataBuffer)
    return data.text
}

async function extractTextFromDOCX(filePath: string): Promise<string> {
    const result = await mammoth.extractRawText({ path: filePath })
    return result.value
}

async function extractTextFromIPYNB(filePath: string): Promise<string> {
    const data = await fs.readFile(filePath, "utf8")
    const notebook = JSON.parse(data)
    let extractedText = ""

    for (const cell of notebook.cells) {
        if ((cell.cell_type === "markdown" || cell.cell_type === "code") && cell.source) {
            extractedText += cell.source.join("\n") + "\n"
        }
    }

    return extractedText
}
