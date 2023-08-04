import React, { useCallback, useContext } from "react"
import { getMonth, getYear } from "date-fns"

import { handleOnKeyDown, generateCN } from "@wpmudev/sui-utils"

import { DatePickerContext } from "./date-picker-context"
import { switchLists } from "./helpers"

const DatePickerList: React.FC<any> = ({ date, height }) => {
	const ctx = useContext(DatePickerContext)
	const dropdownList = switchLists?.[ctx?.listType] ?? []

	const onItemClick = useCallback(
		(value: string | number) => {
			// close list
			ctx.closeToggle()
			ctx.helpers.jumpToDate(value)
		},
		[ctx],
	)

	// check if list item is active or not
	const isActive = (val) =>
		"months" === ctx.listType
			? getMonth(date) === val
			: Number(val) === getYear(date)

	return (
		<div className="sui-date-picker__calendar-list" style={{ height }}>
			{dropdownList.map((name, index) => {
				const val = "months" === ctx.listType ? index : name
				return (
					<li
						key={index}
						className={generateCN("sui-date-picker__calendar-list-item", {
							active: isActive(val),
						})}
					>
						<span
							role="button"
							tabIndex={0}
							onClick={() => onItemClick(val)}
							onKeyDown={(e) => handleOnKeyDown(e, () => onItemClick(val))}
						>
							{name}
						</span>
					</li>
				)
			})}
		</div>
	)
}

export { DatePickerList }
