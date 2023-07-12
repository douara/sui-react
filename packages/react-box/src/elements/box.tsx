import React from "react"
import { generateCN, isEmpty, isUndefined } from "@wpmudev/react-utils"

import { BoxGroup } from "./box-group"

/**
 * Represents the properties for a box component.
 */
interface BoxProps {
	/**
	 * The title of the box.
	 */
	title: string
	/**
	 * The icon for the box.
	 */
	icon: string
	/**
	 * The content for the left header section of the box.
	 */
	headerLeft: string
	/**
	 * The content for the right header section of the box.
	 */
	headerRight: string
	/**
	 * The content of the box.
	 */
	children?: React.ReactNode
}

// Create box component
const Box: React.FC<BoxProps> = ({
	title,
	icon,
	headerLeft,
	headerRight,
	children,
}) => {
	// Prop(s) validation
	const hasTitle = !isUndefined(title) && !isEmpty(title)
	const hasIcon = !isUndefined(icon) && !isEmpty(icon)
	const hasLeft = !isUndefined(headerRight) && !isEmpty(headerLeft)
	const hasRight = !isUndefined(headerRight) && !isEmpty(headerRight)

	const classNames = generateCN("sui-box", {})

	return (
		<div className={classNames}>
			{hasTitle && (
				<BoxGroup isInline={true}>
					<div slot="left">
						{hasIcon && (
							<span
								className={`suicons suicons--${icon} suicons--lg sui-box-group__item`}
								aria-hidden="true"
							/>
						)}
						{hasTitle && (
							<h2 className="sui-heading sui-heading--h3 sui-box-group__item">
								{title}
							</h2>
						)}
						{hasLeft && headerLeft}
					</div>
					<div {...(hasRight && { slot: "right" })}>
						{hasRight && headerRight}
					</div>
				</BoxGroup>
			)}
			{children}
		</div>
	)
}

// Publish component(s)
export { Box, BoxProps }
