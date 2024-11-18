import { ClineMessage } from "../../../../src/shared/ExtensionMessage"

export interface BaseTool {
    tool: string
    path?: string
    content?: string
    partial?: boolean
}

export interface FileEditorTool extends BaseTool {
    tool: 'editedExistingFile'
    diff: string
}

export interface FileCreatorTool extends BaseTool {
    tool: 'newFileCreated'
    content: string
}

export interface FileReaderTool extends BaseTool {
    tool: 'readFile'
    content: string
}

export interface FileSearchTool extends BaseTool {
    tool: 'searchFiles'
    regex: string
    filePattern?: string
    content: string
}

export interface FileListTool extends BaseTool {
    tool: 'listFilesTopLevel' | 'listFilesRecursive'
    content: string
}

export interface CodeDefinitionTool extends BaseTool {
    tool: 'listCodeDefinitionNames'
    content: string
}

export type Tool = 
    | FileEditorTool 
    | FileCreatorTool 
    | FileReaderTool 
    | FileSearchTool 
    | FileListTool 
    | CodeDefinitionTool

export interface ToolDisplayProps {
    tool: Tool
    message: ClineMessage
    isExpanded: boolean
    onToggleExpand: () => void
}

// Common props that most tool displays will need
export interface BaseToolDisplayProps extends ToolDisplayProps {
    headerStyle?: React.CSSProperties
    toolIcon: (name: string) => JSX.Element
}
