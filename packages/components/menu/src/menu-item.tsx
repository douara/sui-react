import React, { FC, useId } from "react"

import { generateCN, handleOnKeyDown, isEmpty } from "@wpmudev/sui-utils"
import { useInteraction } from "@wpmudev/sui-hooks"

import * as Icons from "@wpmudev/sui-icons"

import { MenuItemProps } from "./menu.types"

// Define the MenuItem component
const MenuItem: FC<MenuItemProps> = ({
	icon,
	href,
	className = "",
	children,
	isDisabled,
	onClick,
	...props
}) => {
	// Use the useInteraction hook to manage hover and focus states
	const [isHovered, isFocused, methods] = useInteraction({})

	// Generate a unique ID for the menu item and its related elements
	const id = useId()
	const menuId = `sui-menu-item-${id}`
	const menuTitleId = `${menuId}-title`

	// Determine the element tag name (either "li" or "a" based on the presence of href)
	let TagName = "li"
	if (!!href) {
		TagName = "a"
	}

	// Generate class names for the menu item
	const classNames = generateCN(
		"sui-menu__item",
		{
			hover: isHovered,
			focus: isFocused,
			disabled: isDisabled,
		},
		className,
	)

	// Check if an icon is specified and assign it to IconTag
	let IconTag = null
	if (!isEmpty(icon ?? "")) {
		IconTag = Icons?.[icon] ?? null
	}

	// Prepare attributes for the menu item element
	const attrs = {
		className: classNames,
		href: !!href ? href : undefined,
		...props,
	}

	// Prepare attributes for a button element if onClick is provided
	const btnAttr: unknown = {}
	if (!!onClick) {
		btnAttr.role = "button"
		btnAttr.onClick = onClick
		btnAttr.onKeyDown = (e) => handleOnKeyDown(e, onClick)
	}

	return (
		<TagName
			className={classNames}
			{...attrs}
			{...methods}
			tabIndex={isDisabled ? -1 : 0}
			aria-labelledby={menuTitleId}
			{...btnAttr}
		>
			{!!IconTag && <IconTag size="sm" />}
			<span id={menuTitleId}>{children}</span>
		</TagName>
	)
}

export { MenuItem }
