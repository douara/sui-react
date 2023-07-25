import React from "react"

// Import required component.
import { TreeView as SuiTreeView } from "../src"

// Import documentation main page.
import docs from "./TreeView.mdx"
import { TreeViewGroup } from "../src/tree-view-group"
import { TreeViewItem, TreeViewItemGroup } from "../src/tree-view-item"

// Configure default options.
export default {
	title: "SUI/Components/Core/Tree View",
	component: SuiTreeView,
	parameters: {
		layout: "fullscreen",
		docs: {
			page: docs,
		},
	},
}

// Build "Tag" story.
const TreeView = ({ color, ...props }) => {
	const boxStyles = {
		padding: 20,
		borderRadius: 4,
		background: color !== "white" ? "#fff" : "#333",
	}

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<div style={boxStyles}>
					<SuiTreeView {...props}>
						<TreeViewGroup id="group-1" title="Tree Group">
							<TreeViewGroup id="group-2" title="Tree Group" isDisabled={true}>
								<TreeViewItem id="item-1">Tree Item</TreeViewItem>
								<TreeViewItem id="item-2">Tree Item</TreeViewItem>
								<TreeViewItem id="item-3">Tree Item</TreeViewItem>
								<TreeViewGroup id="group-4" title="Tree Group">
									<TreeViewItem id="item-4">Tree Item</TreeViewItem>
									<TreeViewItem id="item-5">Tree Item</TreeViewItem>
									<TreeViewItem id="item-6">Tree Item</TreeViewItem>
								</TreeViewGroup>
							</TreeViewGroup>
							<TreeViewItem id="item-7">Tree Item</TreeViewItem>
							<TreeViewItem id="item-8">Tree Item</TreeViewItem>
							<TreeViewItem id="item-9">Tree Item</TreeViewItem>
							<TreeViewGroup id="group-5" title="Tree Group">
								<TreeViewItem id="item-10">Tree Item</TreeViewItem>
								<TreeViewItem id="item-11">Tree Item</TreeViewItem>
								<TreeViewItem id="item-12">Tree Item</TreeViewItem>
							</TreeViewGroup>
							<TreeViewGroup id="group-6" title="Tree Group">
								<TreeViewItem id="item-13">Tree Item</TreeViewItem>
								<TreeViewItem id="item-14">Tree Item</TreeViewItem>
								<TreeViewItem id="item-15">Tree Item</TreeViewItem>
							</TreeViewGroup>
							<TreeViewItem id="item-16" isDisabled={true}>
								Tree Item
							</TreeViewItem>
							<TreeViewItem id="item-17">Tree Item</TreeViewItem>
						</TreeViewGroup>
					</SuiTreeView>
				</div>
			</div>
		</div>
	)
}

// Set story arguments.
TreeView.args = {
	allowCheck: false,
	showIcons: false,
}

// Set controls for story arguments.
TreeView.argTypes = {
	allowCheck: {
		name: "Allow Check",
		control: {
			type: "boolean",
		},
	},
	showIcons: {
		name: "Show Icons",
		control: {
			type: "boolean",
		},
	},
}

// Publish required stories.
export { TreeView }