import { VSCodeDropdown, VSCodeOption, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { ApiConfiguration } from "../../../../../src/shared/api"

interface BedrockProviderProps {
	apiConfiguration: ApiConfiguration | undefined
	onInputChange: (key: keyof ApiConfiguration) => (e: any) => void
}

export const BedrockProvider: React.FC<BedrockProviderProps> = ({
	apiConfiguration,
	onInputChange,
}) => {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
			<VSCodeTextField
				value={apiConfiguration?.awsAccessKey || ""}
				style={{ width: "100%" }}
				type="password"
				onInput={onInputChange("awsAccessKey")}
				placeholder="Enter Access Key...">
				<span style={{ fontWeight: 500 }}>AWS Access Key</span>
			</VSCodeTextField>
			<VSCodeTextField
				value={apiConfiguration?.awsSecretKey || ""}
				style={{ width: "100%" }}
				type="password"
				onInput={onInputChange("awsSecretKey")}
				placeholder="Enter Secret Key...">
				<span style={{ fontWeight: 500 }}>AWS Secret Key</span>
			</VSCodeTextField>
			<VSCodeTextField
				value={apiConfiguration?.awsSessionToken || ""}
				style={{ width: "100%" }}
				type="password"
				onInput={onInputChange("awsSessionToken")}
				placeholder="Enter Session Token...">
				<span style={{ fontWeight: 500 }}>AWS Session Token</span>
			</VSCodeTextField>
			<div className="dropdown-container">
				<label htmlFor="aws-region-dropdown">
					<span style={{ fontWeight: 500 }}>AWS Region</span>
				</label>
				<VSCodeDropdown
					id="aws-region-dropdown"
					value={apiConfiguration?.awsRegion || ""}
					style={{ width: "100%" }}
					onChange={onInputChange("awsRegion")}>
					<VSCodeOption value="">Select a region...</VSCodeOption>
					{/* The user will have to choose a region that supports the model they use, but this shouldn't be a problem since they'd have to request access for it in that region in the first place. */}
					<VSCodeOption value="us-east-1">us-east-1</VSCodeOption>
					{/* <VSCodeOption value="us-east-2">us-east-2</VSCodeOption> */}
					{/* <VSCodeOption value="us-west-1">us-west-1</VSCodeOption> */}
					<VSCodeOption value="us-west-2">us-west-2</VSCodeOption>
					{/* <VSCodeOption value="af-south-1">af-south-1</VSCodeOption> */}
					{/* <VSCodeOption value="ap-east-1">ap-east-1</VSCodeOption> */}
					<VSCodeOption value="ap-south-1">ap-south-1</VSCodeOption>
					<VSCodeOption value="ap-northeast-1">ap-northeast-1</VSCodeOption>
					{/* <VSCodeOption value="ap-northeast-2">ap-northeast-2</VSCodeOption> */}
					{/* <VSCodeOption value="ap-northeast-3">ap-northeast-3</VSCodeOption> */}
					<VSCodeOption value="ap-southeast-1">ap-southeast-1</VSCodeOption>
					<VSCodeOption value="ap-southeast-2">ap-southeast-2</VSCodeOption>
					<VSCodeOption value="ca-central-1">ca-central-1</VSCodeOption>
					<VSCodeOption value="eu-central-1">eu-central-1</VSCodeOption>
					<VSCodeOption value="eu-west-1">eu-west-1</VSCodeOption>
					<VSCodeOption value="eu-west-2">eu-west-2</VSCodeOption>
					<VSCodeOption value="eu-west-3">eu-west-3</VSCodeOption>
					{/* <VSCodeOption value="eu-north-1">eu-north-1</VSCodeOption> */}
					{/* <VSCodeOption value="me-south-1">me-south-1</VSCodeOption> */}
					<VSCodeOption value="sa-east-1">sa-east-1</VSCodeOption>
				</VSCodeDropdown>
			</div>
			<p
				style={{
					fontSize: "12px",
					marginTop: "5px",
					color: "var(--vscode-descriptionForeground)",
				}}>
				Authenticate by either providing the keys above or use the default AWS credential providers,
				i.e. ~/.aws/credentials or environment variables. These credentials are only used locally to
				make API requests from this extension.
			</p>
		</div>
	)
}
