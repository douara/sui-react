import React, {
	Children,
	forwardRef,
	HTMLProps,
	useContext,
	useEffect,
	useState,
} from "react"
import { ReactSortable as Sortable } from "react-sortablejs"

import { TableSectionProps } from "./table.types"
import { TableContext } from "./table-context"

/**
 * TableBody component represents the body section of a table.
 * It handles the rendering of rows and supports drag-and-drop reordering of rows if the table is draggable.
 *
 * @param {TableSectionProps} props - The properties for the TableBody component.
 * @return {JSX.Element} The JSX representation of the TableBody component.
 */
const TableBody: React.FC<TableSectionProps> = ({ children, ...props }) => {
	// State to keep track of the table rows
	const [el, setEl] = useState<React.ReactNode[]>(Children.toArray(children))
	const [rows, setRows] = useState<number[]>([])
	const ctx = useContext(TableContext)

	// Effect to update the rows array when children change
	useEffect(() => {
		const d = React.Children.toArray(children).map(
			(row: React.ReactNode) => row.props.id,
		)
		setRows(d)
	}, [children])

	// Effect to update the TableContext's rows when the rows array changes
	useEffect(() => {
		ctx?.setRows(rows)
	}, [ctx, rows])

	// If the table is not draggable, render the TableBodyTag with children
	if (!ctx?.isDraggable) {
		return <TableBodyTag {...props}>{children}</TableBodyTag>
	}

	// If the table is draggable, use the Sortable component for drag-and-drop support
	return (
		<Sortable
			tag={TableBodyTag}
			list={el.map((x) => ({ ...x, id: x.props.id, chosen: true }))}
			setList={(list) => setEl(list.filter((newEl) => !!newEl))}
			animation={150}
			handle=".sui-table__cell--drag"
			onStart={() => ctx?.setForceCollapse(true)}
			onEnd={() => ctx?.setForceCollapse(false)}
		>
			{el.map((item) => (
				<React.Fragment key={item.props.id}>{item}</React.Fragment>
			))}
		</Sortable>
	)
}

// This is just like a normal component, but now has a ref.
// ForwardRef to forward the ref passed to this component to the underlying tbody element.
const TableBodyTag = forwardRef<
	HTMLTableSectionElement,
	HTMLProps<HTMLTableSectionElement>
>((props, ref) => <tbody ref={ref} {...props} className="sui-table__body" />)

TableBodyTag.displayName = "TableBodyTag"

export { TableBody }
