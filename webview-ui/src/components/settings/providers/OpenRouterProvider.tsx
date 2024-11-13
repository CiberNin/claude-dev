import { VSCodeDivider, VSCodeLink, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { ApiConfiguration } from "../../../../../src/shared/api"
import VSCodeButtonLink from "../../../components/common/VSCodeButtonLink"

interface OpenRouterProviderProps {
	apiConfiguration: ApiConfiguration | undefined
	onInputChange: (key: keyof ApiConfiguration) => (e: any) => void
	uriScheme?: string
}

export const OpenRouterProvider: React.FC<OpenRouterProviderProps> = ({
	apiConfiguration,
	onInputChange,
	uriScheme,
}) => {
	return (
		<div>
			<VSCodeTextField
				value={apiConfiguration?.openRouterApiKey || ""}
				style={{ width: "100%" }}
				type="password"
				onInput={onInputChange("openRouterApiKey")}
				placeholder="Enter API Key...">
				<span style={{ fontWeight: 500 }}>OpenRouter API Key</span>
			</VSCodeTextField>
			{!apiConfiguration?.openRouterApiKey && (
				<VSCodeButtonLink
					href={`https://openrouter.ai/auth?callback_url=${uriScheme || "vscode"}://saoudrizwan.claude-dev/openrouter`}
					style={{ margin: "5px 0 0 0" }}
					appearance="secondary">
					Get OpenRouter API Key
				</VSCodeButtonLink>
			)}
			<p
				style={{
					fontSize: "12px",
					marginTop: "5px",
					color: "var(--vscode-descriptionForeground)",
				}}>
				This key is stored locally and only used to make API requests from this extension.{" "}
				{/* {!apiConfiguration?.openRouterApiKey && (
					<span style={{ color: "var(--vscode-charts-green)" }}>
						(<span style={{ fontWeight: 500 }}>Note:</span> OpenRouter is recommended for high rate
						limits, prompt caching, and wider selection of models.)
					</span>
				)} */}
			</p>
		</div>
	)
}
