import { VSCodeLink, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { ApiConfiguration } from "../../../../../src/shared/api"

interface GeminiProviderProps {
	apiConfiguration: ApiConfiguration | undefined
	onInputChange: (key: keyof ApiConfiguration) => (e: any) => void
}

export const GeminiProvider: React.FC<GeminiProviderProps> = ({
	apiConfiguration,
	onInputChange,
}) => {
	return (
		<div>
			<VSCodeTextField
				value={apiConfiguration?.geminiApiKey || ""}
				style={{ width: "100%" }}
				type="password"
				onInput={onInputChange("geminiApiKey")}
				placeholder="Enter API Key...">
				<span style={{ fontWeight: 500 }}>Gemini API Key</span>
			</VSCodeTextField>
			<p
				style={{
					fontSize: "12px",
					marginTop: 3,
					color: "var(--vscode-descriptionForeground)",
				}}>
				This key is stored locally and only used to make API requests from this extension.
				{!apiConfiguration?.geminiApiKey && (
					<VSCodeLink
						href="https://ai.google.dev/"
						style={{ display: "inline", fontSize: "inherit" }}>
						You can get a Gemini API key by signing up here.
					</VSCodeLink>
				)}
			</p>
		</div>
	)
}
