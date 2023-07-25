import React from "react"
import { generateCN } from "@wpmudev/sui-utils"

interface SelectIconProps {
	name: string
	onClick?: () => {}
}

// Build "Icon" component.
const Icon: React.FC<SelectIconProps> = ({ name, onClick = () => {} }) => {
	if (!name) {
		throw new Error(
			`Required parameter is empty. More details below:\n\n⬇️ ⬇️ ⬇️\n\n📦 Shared UI - Components: Button\n\nThe "name" parameter in the icon element is required and must not be empty.\n\n`,
		)
	}

	const className = generateCN("suicons", { [name]: true, md: true })

	return (
		<span
			className={`sui-select__icon sui-select__icon--${name}`}
			onClick={onClick}
			aria-hidden="true"
		>
			<span className={className} />
		</span>
	)
}

// Publish required component(s).
export { Icon }