/**
 * Interface for generating icon parameters.
 */
import React, { Children, forwardRef } from "react"
import { isEmpty } from "@wpmudev/react-utils"

import { Icon, IconProps } from "./icon"

interface IconBuildParams {
	/**
	 * The icon `svg` viewBox.
	 *
	 * @default "0 0 24 24"
	 */
	viewBox?: string
	/**
	 * SVG icon title
	 */
	title?: string
	/**
	 * Default props automatically passed to the component; overridable.
	 */
	defaultProps?: IconProps
}

/**
 * Generate an icon component based on the provided options.
 *
 * @param {string | string[]} path
 * @param {IconBuildParams}   options
 */
const iconBuild = (path: string | string[], options: IconBuildParams) => {
	const { viewBox = "0 0 24 24", title, defaultProps = {} } = options

	// Check if the `path` has a single value
	const isSinglePath: boolean = "string" === typeof path

	// Decide path variable
	path = isSinglePath ? path : Children.toArray(path)

	// Create a new icon component using forwardRef
	const Renderer = forwardRef<"svg", IconProps>((props, ref) => (
		<Icon ref={ref} viewBox={viewBox} {...defaultProps} {...props}>
			{!isSinglePath ? path : <path fill="currentColor" d={path as string} />}
		</Icon>
	))

	// Set the display name for the generated icon component
	if (!isEmpty(title ?? "")) {
		Renderer.displayName = title
	}

	return Renderer
}

export { iconBuild }