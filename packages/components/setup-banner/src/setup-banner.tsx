import React from "react"

import { generateCN, PluginsIcons } from "@wpmudev/sui-utils"
import * as Icons from "@wpmudev/sui-icons"

import { SetupBannerProps } from "./setup-banner.types"

/**
 * SetupBanner renders a banner with optional icon and description.
 *
 * @param {SetupBannerProps} props - The props for the SetupBanner component.
 * @return {JSX.Element} - The rendered SetupBanner component.
 */
const SetupBanner: React.FC<SetupBannerProps> = ({
	type = "smush",
	title,
	className,
	description,
}) => {
	const classNames = generateCN(
		"sui-setup-banner",
		{
			[type]: true,
		},
		className,
	)

	const icon: string = PluginsIcons?.[type] ?? "Plugin"

	// Dynamically determine the IconTag based on the provided icon prop.
	let IconTag = null
	if (!!icon) {
		IconTag = Icons?.[icon]
	}

	return (
		<div className={classNames}>
			{IconTag && (
				<div className="sui-setup-banner__bg">
					<IconTag className="sui-setup-banner__bg-icon" />
				</div>
			)}
			<div className="sui-setup-banner__subtitle">Quick Setup</div>
			<div className="sui-setup-banner__info">
				{!!IconTag && (
					<div className="sui-setup-banner__info-logo">
						<IconTag fill="#FFFFFF" />
					</div>
				)}
				{!!title && <h2 className="sui-setup-banner__info-title">{title}</h2>}
			</div>
			{!!description && (
				<div className="sui-setup-banner__description">{description}</div>
			)}
		</div>
	)
}

// Publish required component.
export { SetupBanner }
