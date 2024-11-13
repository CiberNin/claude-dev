import { VSCodeLink, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { ApiConfiguration } from "../../../../../src/shared/api"

interface OpenAINativeProviderProps {
	apiConfiguration: ApiConfiguration | undefined
	onInputChange: (key: keyof ApiConfiguration) => (e: any) => void
}

export const OpenAINativeProvider: React.FC<OpenAINativeProviderProps> = ({
	apiConfiguration,
	onInputChange,
}) => {
	return (
		<div>
			<VSCodeTextField
				value={apiConfiguration?.openAiNativeApiKey || ""}
				style={{ width: "100%" }}
				type="password"
				onInput={onInputChange("openAiNativeApiKey")}
				placeholder="Enter API Key...">
				<span style={{ fontWeight: 500 }}>OpenAI API Key</span>
			</VSCodeTextField>
			<p
				style={{
					fontSize: "12px",
					marginTop: 3,
					color: "var(--vscode-descriptionForeground)",
				}}>
				This key is stored locally and only used to make API requests from this extension.
				{!apiConfiguration?.openAiNativeApiKey && (
					<VSCodeLink
						href="https://platform.openai.com/api-keys"
						style={{ display: "inline", fontSize: "inherit" }}>
						You can get an OpenAI API key by signing up here.
					</VSCodeLink>
				)}
			</p>
		</div>
	)
}
