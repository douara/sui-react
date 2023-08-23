import { ReactNode } from "react"

import { TagProps } from "@wpmudev/sui-tag"

/**
 * DashboardWidgetProps is the set of properties that can be passed to the DashboardWidget component.
 */
interface DashboardWidgetProps {
	/** The title of the widget */
	title?: string

	/** The description of the widget */
	description?: ReactNode

	/** The name of the icon to display in the widget */
	icon?: string

	/** Additional content or actions to display in the widget's footer */
	actions?: ReactNode

	/** Whether the widget is initially expanded */
	isExpanded?: boolean

	/** Whether the widget is disabled */
	isDisabled?: boolean

	/**
	 * Callback function that is called when the widget's expand/collapse state is toggled.
	 *
	 * @param status - The new status of the widget (expanded or collapsed)
	 */
	onToggle?(status: boolean): void

	/** Whether the widget can be collapsed or expanded */
	canCollapse?: boolean

	/** A tag associated with the widget */
	tag?: string

	/** Additional props for the tag component */
	tagProps?: TagProps

	/** The content of the widget */
	children?: ReactNode
}

export { DashboardWidgetProps }