import React from "react"
import { FileReaderTool, BaseToolDisplayProps } from "./types"
import { CODE_BLOCK_BG_COLOR } from "../common/CodeBlock"
import { removeLeadingNonAlphanumeric } from "../common/CodeAccordian"
import { vscode } from "../../utils/vscode"

interface FileReaderDisplayProps extends Omit<BaseToolDisplayProps, 'tool'> {
    tool: FileReaderTool
}

export const FileReaderDisplay: React.FC<FileReaderDisplayProps> = ({
    tool,
    message,
    headerStyle,
    toolIcon
}) => {
    return (
        <>
            <div style={headerStyle}>
                {toolIcon("file-code")}
                <span style={{ fontWeight: "bold" }}>
                    {message.type === "ask" 
                        ? "Cline wants to read this file:"
                        : "Cline read this file:"}
                </span>
            </div>
            <div
                style={{
                    borderRadius: 3,
                    backgroundColor: CODE_BLOCK_BG_COLOR,
                    overflow: "hidden",
                    border: "1px solid var(--vscode-editorGroup-border)",
                }}>
                <div
                    style={{
                        color: "var(--vscode-descriptionForeground)",
                        display: "flex",
                        alignItems: "center",
                        padding: "9px 10px",
                        cursor: "pointer",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none",
                    }}
                    onClick={() => {
                        vscode.postMessage({ type: "openFile", text: tool.content })
                    }}>
                    {tool.path?.startsWith(".") && <span>.</span>}
                    <span
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            marginRight: "8px",
                            direction: "rtl",
                            textAlign: "left",
                        }}>
                        {removeLeadingNonAlphanumeric(tool.path ?? "") + "\u200E"}
                    </span>
                    <div style={{ flexGrow: 1 }}></div>
                    <span
                        className={`codicon codicon-link-external`}
                        style={{ fontSize: 13.5, margin: "1px 0" }}></span>
                </div>
            </div>
        </>
    )
}

export default FileReaderDisplay
