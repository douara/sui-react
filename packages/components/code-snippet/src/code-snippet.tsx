import React, { useState, useEffect, useCallback } from "react"
import Prism from "prismjs"
// import dedent from "dedent"

import { Tooltip } from "@wpmudev/sui-tooltip"
import { generateCN } from "@wpmudev/sui-utils"

import { CodeSnippetProps } from "./code-snippet.types"

const CodeSnippet: React.FC<CodeSnippetProps> = ({
	language = "markup",
	copy = true,
	className = "",
	children,
}) => {
	// generate class names
	const classNames = generateCN("sui-code-snippet", {}, className ?? "")
	const [isCopied, setIsCopied] = useState<boolean>(false)

	// highlight the code
	useEffect(() => {
		Prism?.highlightAll()
	}, [])

	// copy text to clipboard
	const copyCodes = useCallback((text: string) => {
		navigator?.clipboard?.writeText(text)
		setIsCopied(true)
	}, [])

	return (
		<div className={classNames}>
			{copy && (
				<Tooltip
					label="Copy"
					appearance="secondary"
					color="black"
					position="top"
					aria-label={isCopied ? "Copied" : ""}
					onMouseLeave={() => setIsCopied(false)}
					customWidth="65"
					onClick={() => copyCodes(children)}
				>
					{isCopied && "Copied"}
				</Tooltip>
			)}
			<pre>
				<code className={`language-${language}`}>{children}</code>
			</pre>
		</div>
	)
}

export { CodeSnippet }
