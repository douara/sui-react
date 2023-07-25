import { HTMLProps } from "react"

import { FormFieldProps } from "@wpmudev/sui-form-field"

/**
 * Represents the properties for an uploader component.
 */
interface UploaderProps extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
	/**
	 * Upload button title
	 */
	btnTitle?: string

	/**
	 * Allow select multiple files
	 */
	multiple?: boolean

	/**
	 * Allowed files
	 */
	accept?: string

	/**
	 * Allow drag and drop
	 */
	allowDragAndDrop?: boolean

	/**
	 * Form Field attributes
	 */
	fieldAttrs: FormFieldProps
	/**
	 * Send the files array to parent component when file uploaded or removed
	 *
	 * @param {Record<File, any>[]} file
	 */
	onChange: (file: Record<File, any>[]) => void
}

/**
 * Represents the properties for a file in the uploader component.
 */
interface UploaderFileProps {
	/**
	 * The unique ID of the file.
	 */
	id: number

	/**
	 * The File object representing the uploaded file.
	 */
	file: File

	/**
	 * Callback function to remove the file.
	 *
	 * @param fileIndex - The index of the file to remove.
	 */
	onRemoveFile?: (fileIndex: number) => void
}

/**
 * Represents the properties for the uploader component button.
 */
interface UploaderButtonProps
	extends Pick<UploaderProps, "btnTitle" | "multiple" | "allowDragAndDrop">,
		Pick<UploaderFileProps, "files"> {
	/**
	 * Callback function for button click event.
	 */
	onClick?: () => void

	/**
	 * Callback function for drag event.
	 *
	 * @param filesOrEvent - The dragged files or the drag event.
	 */
	onDrag?: (filesOrEvent: unknown | Record<File, any>[]) => void
}

export type { UploaderProps, UploaderFileProps, UploaderButtonProps }