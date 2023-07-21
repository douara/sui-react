import React from "react"
import { AddIcon } from "@wpmudev/sui-icons"
import { generateCN } from "@wpmudev/react-utils"

interface ModalFooterProps {
	children?: React.ReactNode
	hasSep?: boolean
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, hasSep }) => {
	return (
		<footer
			className={generateCN("sui-modal__footer", {
				"has-sep": hasSep,
			})}
		>
			{children}
		</footer>
	)
}

export { ModalFooter, ModalFooterProps }
