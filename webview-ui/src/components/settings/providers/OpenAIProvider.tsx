import { useState } from "react"
import { VSCodeCheckbox, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { ApiConfiguration, azureOpenAiDefaultApiVersion } from "../../../../../src/shared/api"

interface OpenAIProviderProps {
	apiConfiguration: ApiConfiguration | undefined
	onInputChange: (key: keyof ApiConfiguration) => (e: any) => void
	setApiConfiguration: (config: ApiConfiguration) => void
}

export const OpenAIProvider: React.FC<OpenAIProviderProps> = ({
	apiConfiguration,
	onInputChange,
	setApiConfiguration,
}) => {
	const [azureApiVersionSelected, setAzureApiVersionSelected] = useState(!!apiConfiguration?.azureApiVersion)

	return (
		<div>
			<VSCodeTextField
				value={apiConfiguration?.openAiBaseUrl || ""}
				style={{ width: "100%" }}
				type="url"
				onInput={onInputChange("openAiBaseUrl")}
				placeholder={"Enter base URL..."}>
				<span style={{ fontWeight: 500 }}>Base URL</span>
			</VSCodeTextField>
			<VSCodeTextField
				value={apiConfiguration?.openAiApiKey || ""}
				style={{ width: "100%" }}
				type="password"
				onInput={onInputChange("openAiApiKey")}
				placeholder="Enter API Key...">
				<span style={{ fontWeight: 500 }}>API Key</span>
			</VSCodeTextField>
			<VSCodeTextField
				value={apiConfiguration?.openAiModelId || ""}
				style={{ width: "100%" }}
				onInput={onInputChange("openAiModelId")}
				placeholder={"Enter Model ID..."}>
				<span style={{ fontWeight: 500 }}>Model ID</span>
			</VSCodeTextField>
			<VSCodeCheckbox
				checked={azureApiVersionSelected}
				onChange={(e: any) => {
					const isChecked = e.target.checked === true
					setAzureApiVersionSelected(isChecked)
					if (!isChecked) {
						setApiConfiguration({ ...apiConfiguration, azureApiVersion: "" })
					}
				}}>
				Set Azure API version
			</VSCodeCheckbox>
			{azureApiVersionSelected && (
				<VSCodeTextField
					value={apiConfiguration?.azureApiVersion || ""}
					style={{ width: "100%", marginTop: 3 }}
					onInput={onInputChange("azureApiVersion")}
					placeholder={`Default: ${azureOpenAiDefaultApiVersion}`}
				/>
			)}
			<p
				style={{
					fontSize: "12px",
					marginTop: 3,
					color: "var(--vscode-descriptionForeground)",
				}}>
				<span style={{ color: "var(--vscode-errorForeground)" }}>
					(<span style={{ fontWeight: 500 }}>Note:</span> Cline uses complex prompts and works best
					with Claude models. Less capable models may not work as expected.)
				</span>
			</p>
		</div>
	)
}
