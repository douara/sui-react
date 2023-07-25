import React, { forwardRef } from "react"

import { FormField } from "@wpmudev/sui-form-field"
import { Input } from "@wpmudev/sui-input"

import { TextFieldProps } from "./text-field.types"

const TextField: React.FC<TextFieldProps> = forwardRef<
	HTMLInputElement,
	TextFieldProps
>(
	(
		{
			id,
			label,
			helper,
			errorMessage,
			isSmall = false,
			isLabelHidden = false,
			isError = false,
			isDisabled = false,
			...props
		},
		ref,
	) => {
		const error = Object.assign({
			state: isError,
			text: errorMessage,
		})

		return (
			<FormField
				id={id}
				label={label}
				helper={helper}
				error={error}
				isLabelHidden={isLabelHidden}
				isSmall={isSmall}
				isDisabled={isDisabled}
			>
				<Input
					ref={ref}
					id={id}
					isSmall={isSmall}
					isError={isError}
					isDisabled={isDisabled}
					{...props}
				/>
			</FormField>
		)
	},
)

TextField.displayName = "TextField"

export { TextField }
