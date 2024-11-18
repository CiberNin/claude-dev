import React from "react"
import { FileListTool, BaseToolDisplayProps } from "./types"
import CodeAccordian from "../common/CodeAccordian"

interface FileListDisplayProps extends Omit<BaseToolDisplayProps, 'tool'> {
    tool: FileListTool
}

export const FileListDisplay: React.FC<FileListDisplayProps> = ({
    tool,
    message,
    isExpanded,
    onToggleExpand,
    headerStyle,
    toolIcon
}) => {
    const isRecursive = tool.tool === 'listFilesRecursive'
    
    return (
        <>
            <div style={headerStyle}>
                {toolIcon("folder-opened")}
                <span style={{ fontWeight: "bold" }}>
                    {message.type === "ask"
                        ? `Cline wants to ${isRecursive ? 'recursively ' : ''}view ${isRecursive ? 'all' : 'the top level'} files in this directory:`
                        : `Cline ${isRecursive ? 'recursively ' : ''}viewed ${isRecursive ? 'all' : 'the top level'} files in this directory:`}
                </span>
            </div>
            <CodeAccordian
                code={tool.content}
                path={tool.path!}
                language="shell-session"
                isExpanded={isExpanded}
                onToggleExpand={onToggleExpand}
            />
        </>
    )
}

export default FileListDisplay
