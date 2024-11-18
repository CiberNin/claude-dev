import React from "react"
import { FileCreatorTool, BaseToolDisplayProps } from "./types"
import CodeAccordian from "../common/CodeAccordian"

interface FileCreatorDisplayProps extends Omit<BaseToolDisplayProps, 'tool'> {
    tool: FileCreatorTool
}

export const FileCreatorDisplay: React.FC<FileCreatorDisplayProps> = ({
    tool,
    message,
    isExpanded,
    onToggleExpand,
    headerStyle,
    toolIcon
}) => {
    return (
        <>
            <div style={headerStyle}>
                {toolIcon("new-file")}
                <span style={{ fontWeight: "bold" }}>
                    {message.type === "ask" 
                        ? "Cline wants to create a new file:"
                        : "Cline created a new file:"}
                </span>
            </div>
            <CodeAccordian
                isLoading={message.partial}
                code={tool.content}
                path={tool.path!}
                isExpanded={isExpanded}
                onToggleExpand={onToggleExpand}
            />
        </>
    )
}

export default FileCreatorDisplay
