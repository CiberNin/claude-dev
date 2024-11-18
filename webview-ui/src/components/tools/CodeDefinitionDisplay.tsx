import React from "react"
import { CodeDefinitionTool, BaseToolDisplayProps } from "./types"
import CodeAccordian from "../common/CodeAccordian"

interface CodeDefinitionDisplayProps extends Omit<BaseToolDisplayProps, 'tool'> {
    tool: CodeDefinitionTool
}

export const CodeDefinitionDisplay: React.FC<CodeDefinitionDisplayProps> = ({
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
                {toolIcon("file-code")}
                <span style={{ fontWeight: "bold" }}>
                    {message.type === "ask"
                        ? "Cline wants to view source code definition names used in this directory:"
                        : "Cline viewed source code definition names used in this directory:"}
                </span>
            </div>
            <CodeAccordian
                code={tool.content}
                path={tool.path!}
                isExpanded={isExpanded}
                onToggleExpand={onToggleExpand}
            />
        </>
    )
}

export default CodeDefinitionDisplay
