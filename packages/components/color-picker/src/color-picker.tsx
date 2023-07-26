import React, { useCallback, useEffect, useState } from "react"
import { ChromePicker } from "react-color"

import { ColorPickerProps, ColorPickerColorProps } from "./color-picker.types"
import { CloseAlt } from "@wpmudev/sui-icons"
import { Button } from "@wpmudev/sui-button"

/**
 * ColorPicker Component
 *
 * A code editor component that allows displaying and editing code.
 * Uses ReactPrismEditor as the code editor.
 *
 * @param {CodeEditorProps} props - Component props
 * @return {JSX.Element} - JSX Element representing the CodeEditor component
 */
const ColorPicker: React.FC<ColorPickerProps> = ({
	color = "#f0f0f0",
	onChange,
}) => {
	// State to manage the visibility of the color picker
	const [showPicker, setShowPicker] = useState(false)
	const [tempColor, setTempColor] = useState(color)

	// Update tempColor when color prop value changes
	useEffect(() => {
		if (tempColor !== color) {
			setTempColor(color)
		}
	}, [color])

	// Function to handle color change and call the parent component's onChange function
	const handleColorChange = useCallback(({ hex }: ColorPickerColorProps) => {
		setTempColor(hex)
	}, [])

	// Function to handle color apply and call the parent component's onApply function
	const handleColorApply = useCallback(() => {
		if (onChange) {
			onChange(tempColor)
		}
		setShowPicker(false)
	}, [onChange, tempColor])

	// Handle color picker close
	const closeColorPicker = useCallback(
		(e) => {
			e.stopPropagation()
			// Reset color to prop value
			setTempColor("")
		},
		[color],
	)

	return (
		<div className="sui-color-picker">
			{/* Color display box */}
			<div
				role="button"
				tabIndex={0}
				className="sui-color-picker__input"
				onMouseDown={() => setShowPicker(!showPicker)}
			>
				<div className="sui-color-picker__input-preview">
					<span
						className="sui-color-picker__input-preview-icon"
						aria-hidden={true}
						style={{
							backgroundColor: tempColor ? tempColor : "rgba(0,0,0,0.5)",
						}}
					/>
					<span className="sui-color-picker__input-preview-code">
						{tempColor}
					</span>
				</div>
				{tempColor && (
					<CloseAlt
						size="md"
						className="sui-color-picker__input-close"
						onClick={closeColorPicker}
					/>
				)}
			</div>
			{/* Conditionally render the color picker */}
			{showPicker && (
				<div
					className="sui-color-picker__popover"
					style={{ position: "absolute", zIndex: "2" }}
				>
					{/* The ChromePicker component from react-color */}
					<ChromePicker
						className="sui-color-picker__palette"
						color={tempColor}
						onChange={handleColorChange}
						styles={{ default: { body: { padding: "12px 0" } } }}
					/>
					<div>
						<Button
							appearance="secondary"
							color="black"
							isSmall={true}
							isFullWidth={true}
							onClick={handleColorApply}
						>
							Apply
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}

export { ColorPicker }
