import React from "react"
import { Tool, ToolDisplayProps } from "./types"
import FileEditorDisplay from "./FileEditorDisplay"
import FileCreatorDisplay from "./FileCreatorDisplay"
import FileReaderDisplay from "./FileReaderDisplay"
import FileSearchDisplay from "./FileSearchDisplay"
import FileListDisplay from "./FileListDisplay"
import CodeDefinitionDisplay from "./CodeDefinitionDisplay"

// Common styles and utilities
const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
}

const toolIcon = (name: string) => (
    <span
        className={`codicon codicon-${name}`}
        style={{ color: "var(--vscode-foreground)", marginBottom: "-1.5px" }}
    />
)

export const ToolHandler: React.FC<ToolDisplayProps> = (props) => {
    const commonProps = {
        ...props,
        headerStyle,
        toolIcon,
    }

    switch (props.tool.tool) {
        case "editedExistingFile":
            return <FileEditorDisplay {...commonProps} tool={props.tool} />
        case "newFileCreated":
            return <FileCreatorDisplay {...commonProps} tool={props.tool} />
        case "readFile":
            return <FileReaderDisplay {...commonProps} tool={props.tool} />
        case "searchFiles":
            return <FileSearchDisplay {...commonProps} tool={props.tool} />
        case "listFilesTopLevel":
        case "listFilesRecursive":
            return <FileListDisplay {...commonProps} tool={props.tool} />
        case "listCodeDefinitionNames":
            return <CodeDefinitionDisplay {...commonProps} tool={props.tool} />
        default:
            console.warn(`Unknown tool type: ${(props.tool as Tool).tool}`)
            return null
    }
}

export default ToolHandler
