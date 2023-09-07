import { Checkbox } from "../../../src"
import React, { useState } from "react"

// Basic Checkbox example
export const BasicCheckbox = ({ ...props }) => {
	const [isChecked, setIsChecked] = useState(false)

	return (
		<Checkbox
			{...props}
			isChecked={isChecked}
			onChange={(e) => {
				setIsChecked(e.target.checked)
			}}
		/>
	)
}
