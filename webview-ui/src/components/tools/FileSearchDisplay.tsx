import React from "react"
import { FileSearchTool, BaseToolDisplayProps } from "./types"
import CodeAccordian from "../common/CodeAccordian"

interface FileSearchDisplayProps extends Omit<BaseToolDisplayProps, 'tool'> {
    tool: FileSearchTool
}

export const FileSearchDisplay: React.FC<FileSearchDisplayProps> = ({
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
                {toolIcon("search")}
                <span style={{ fontWeight: "bold" }}>
                    {message.type === "ask" ? (
                        <>
                            Cline wants to search this directory for <code>{tool.regex}</code>:
                        </>
                    ) : (
                        <>
                            Cline searched this directory for <code>{tool.regex}</code>:
                        </>
                    )}
                </span>
            </div>
            <CodeAccordian
                code={tool.content}
                path={tool.path! + (tool.filePattern ? `/(${tool.filePattern})` : "")}
                language="plaintext"
                isExpanded={isExpanded}
                onToggleExpand={onToggleExpand}
            />
        </>
    )
}

export default FileSearchDisplay
