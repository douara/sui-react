import React from "react"
import { isUndefined, isEmpty, generateCN } from "@wpmudev/react-utils"

interface ButtonIconProps {
	/**
	 * Icon name
	 *
	 * @type {string | undefined}
	 */
	name?: string
}

// Build "Icon" component.
const Icon: React.FC<ButtonIconProps> = ({ name = "" }) => {
	const hasIcon = !isUndefined(name) && !isEmpty(name ?? "")

	if (!hasIcon) {
		throw new Error(
			`Required parameter is empty. More details below:\n\n⬇️ ⬇️ ⬇️\n\n📦 Shared UI - Components: Button\n\nThe "name" parameter in the icon element is required and must not be empty.\n\n`,
		)
	}

	const classNames = generateCN("suicons", {
		[name]: !isEmpty(name),
		md: true,
	})

	return (
		<span className="sui-button__icon" aria-hidden="true">
			<span className={classNames} />
		</span>
	)
}

// Publish required component(s).
export { Icon }