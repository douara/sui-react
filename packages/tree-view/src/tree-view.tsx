import React, { useId } from "react"

import { generateCN } from "@wpmudev/react-utils"

import { TreeViewProps } from "./tree-view.types"
import { TreeViewProvider } from "./tree-view-context"

/**
 * TreeView Component
 *
 * A tree view component that renders a hierarchical tree structure.
 *
 * @param {TreeViewProps} props - Component props
 * @return {JSX.Element} - JSX Element representing the TreeView component
 */
const TreeView: React.FC<TreeViewProps> = ({
	className = "",
	children,
	allowCheck,
	showIcons,
}) => {
	// Generate class names
	const classNames = generateCN("sui-tree-view", {}, className ?? "")
	const id = useId()
	const treeViewId = `sui-tree-view-${id}`

	return (
		<TreeViewProvider value={{ allowCheck, showIcons, id: treeViewId }}>
			{/* TreeView component renders a tree structure with a list */}
			<nav className={classNames}>
				<ul role="tree">{children}</ul>
			</nav>
		</TreeViewProvider>
	)
}

export { TreeView }
