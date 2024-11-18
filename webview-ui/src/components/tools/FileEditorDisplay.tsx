import React from "react"
import { FileEditorTool, BaseToolDisplayProps } from "./types"
import CodeAccordian from "../common/CodeAccordian"

interface FileEditorDisplayProps extends Omit<BaseToolDisplayProps, 'tool'> {
    tool: FileEditorTool
}

export const FileEditorDisplay: React.FC<FileEditorDisplayProps> = ({
    tool,
    message,
    isExpanded,
    onToggleExpand,
    headerStyle,
    toolIcon
}) => {
    const isFeedback = message.say === "user_feedback_diff"

    return (
        <>
            {!isFeedback && (
                <div style={headerStyle}>
                    {toolIcon("edit")}
                    <span style={{ fontWeight: "bold" }}>
                        {message.type === "ask" 
                            ? "Cline wants to edit this file:"
                            : "Cline edited this file:"}
                    </span>
                </div>
            )}
            <div style={isFeedback ? { marginTop: -10, width: "100%" } : undefined}>
                <CodeAccordian
                    isLoading={message.partial}
                    diff={tool.diff}
                    path={tool.path!}
                    isExpanded={isExpanded}
                    onToggleExpand={onToggleExpand}
                    isFeedback={isFeedback}
                />
            </div>
        </>
    )
}

export default FileEditorDisplay
