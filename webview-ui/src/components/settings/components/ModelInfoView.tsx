import { Fragment, memo } from "react"
import { VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { ModelInfo } from "../../../../../src/shared/api"
import { ModelDescriptionMarkdown } from "../OpenRouterModelPicker"
import ModelInfoSupportsItem from "./ModelInfoSupportsItem"

interface ModelInfoViewProps {
    selectedModelId: string
    modelInfo: ModelInfo
    isDescriptionExpanded: boolean
    setIsDescriptionExpanded: (isExpanded: boolean) => void
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price)
}

const ModelInfoView = ({
    selectedModelId,
    modelInfo,
    isDescriptionExpanded,
    setIsDescriptionExpanded,
}: ModelInfoViewProps) => {
    const isGemini = selectedModelId.includes("gemini")

    const infoItems = [
        modelInfo.description && (
            <ModelDescriptionMarkdown
                key="description"
                markdown={modelInfo.description}
                isExpanded={isDescriptionExpanded}
                setIsExpanded={setIsDescriptionExpanded}
            />
        ),
        <ModelInfoSupportsItem
            key="supportsImages"
            isSupported={modelInfo.supportsImages ?? false}
            supportsLabel="Supports images"
            doesNotSupportLabel="Does not support images"
        />,
        <ModelInfoSupportsItem
            key="supportsComputerUse"
            isSupported={modelInfo.supportsComputerUse ?? false}
            supportsLabel="Supports computer use"
            doesNotSupportLabel="Does not support computer use"
        />,
        !isGemini && (
            <ModelInfoSupportsItem
                key="supportsPromptCache"
                isSupported={modelInfo.supportsPromptCache}
                supportsLabel="Supports prompt caching"
                doesNotSupportLabel="Does not support prompt caching"
            />
        ),
        modelInfo.maxTokens !== undefined && modelInfo.maxTokens > 0 && (
            <span key="maxTokens">
                <span style={{ fontWeight: 500 }}>Max output:</span> {modelInfo.maxTokens?.toLocaleString()} tokens
            </span>
        ),
        modelInfo.inputPrice !== undefined && modelInfo.inputPrice > 0 && (
            <span key="inputPrice">
                <span style={{ fontWeight: 500 }}>Input price:</span> {formatPrice(modelInfo.inputPrice)}/million tokens
            </span>
        ),
        modelInfo.supportsPromptCache && modelInfo.cacheWritesPrice && (
            <span key="cacheWritesPrice">
                <span style={{ fontWeight: 500 }}>Cache writes price:</span>{" "}
                {formatPrice(modelInfo.cacheWritesPrice || 0)}/million tokens
            </span>
        ),
        modelInfo.supportsPromptCache && modelInfo.cacheReadsPrice && (
            <span key="cacheReadsPrice">
                <span style={{ fontWeight: 500 }}>Cache reads price:</span>{" "}
                {formatPrice(modelInfo.cacheReadsPrice || 0)}/million tokens
            </span>
        ),
        modelInfo.outputPrice !== undefined && modelInfo.outputPrice > 0 && (
            <span key="outputPrice">
                <span style={{ fontWeight: 500 }}>Output price:</span> {formatPrice(modelInfo.outputPrice)}/million
                tokens
            </span>
        ),
        isGemini && (
            <span key="geminiInfo" style={{ fontStyle: "italic" }}>
                * Free up to {selectedModelId && selectedModelId.includes("flash") ? "15" : "2"} requests per minute.
                After that, billing depends on prompt size.{" "}
                <VSCodeLink href="https://ai.google.dev/pricing" style={{ display: "inline", fontSize: "inherit" }}>
                    For more info, see pricing details.
                </VSCodeLink>
            </span>
        ),
    ].filter(Boolean)

    return (
        <p style={{ fontSize: "12px", marginTop: "2px", color: "var(--vscode-descriptionForeground)" }}>
            {infoItems.map((item, index) => (
                <Fragment key={index}>
                    {item}
                    {index < infoItems.length - 1 && <br />}
                </Fragment>
            ))}
        </p>
    )
}

export default memo(ModelInfoView)
