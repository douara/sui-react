import React, { Fragment, useState } from 'react';
import {
	isBoolean,
	isEmpty,
	isObject,
	isUndefined,
} from '@wpmudev/react-utils';

const Icon = ({ icon }) => {
	const iconClass = 'suicons suicons--md suicons--' + icon;

	return (
		<Fragment>
			<i className={iconClass} aria-hidden="true" />
		</Fragment>
	);
};

// Build "Input" component.
const Input = ({ label, description, ...props }) => {
	const {
		type,
		id,
		labelId,
		placeholder,
		descriptionId,
		errorMessage,
		errorId,
		icon,
		size,
		disabled,
		value = '',
		...inputprops
	} = props;

	const [inputValue, setInputValue] = useState(
		!isUndefined(value) ? value : ''
	);

	const handleInputChange = (event) => {
		const inputValue = event.target.value;
		setInputValue(inputValue);
	};

	const input = {};

	input.class = 'sui-input';

	input.label = !isUndefined(label) && !isEmpty(label) ? label : '';
	input.description =
		!isUndefined(description) && !isEmpty(description) ? description : '';

	// Input id.
	input.id = !isUndefined(id) && !isEmpty(id) ? id : '';

	// Input type.
	input.type = !isUndefined(type) && !isEmpty(type) ? type : 'text';

	// Input placeholder.
	input.placeholder =
		!isUndefined(placeholder) && !isEmpty(placeholder) ? placeholder : '';

	// Input aria-labelledby and label id.
	input.labelId = !isUndefined(labelId) && !isEmpty(labelId) ? labelId : '';

	// Input aria-describedby and description id.
	input.descriptionId =
		!isUndefined(descriptionId) && !isEmpty(descriptionId)
			? descriptionId
			: '';

	// Input error message.
	input.error =
		!isUndefined(errorMessage) && !isEmpty(errorMessage)
			? errorMessage
			: '';
	input.errorId = !isUndefined(errorId) && !isEmpty(errorId) ? errorId : '';

	// Renders icon element.
	input.icon = Object.assign(
		{
			name: !isObject(icon) ? icon : '',
			size: 'lg',
			position: 'lead',
			label: '',
		},
		props.icon
	);

	const hasIcon = !isUndefined(input.icon.name) && !isEmpty(input.icon.name);

	// Input size.
	if (!isEmpty(size) && !isUndefined(size) && 'sm' === size) {
		input.class += ' sui-input--sm';
	}

	// Input is disabled.
	input.disabled =
		!isUndefined(disabled) && isBoolean(disabled) ? disabled : false;

	if (input.disabled) {
		input.class += ' sui-input--disabled';
	}

	// Input error.
	if (!isEmpty(input.error)) {
		input.class += ' sui-input--error';
	}

	// if input is filled with value.
	if (!isEmpty(inputValue)) {
		input.class += ' sui-input--filled';
	}

	// if input has icon.
	if (hasIcon) {
		input.class += ' sui-input__icon';
		input.class +=
			'trail' === input.icon.position
				? ' sui-input__icon--right'
				: ' sui-input__icon--left';
	}

	return (
		<div className={input.class}>
			<div className="sui-input__wrapper">
				{hasIcon && <Icon icon={input.icon.name} />}
				<input
					value={inputValue}
					type={input.type}
					className="sui-input__field"
					{...(!isEmpty(input.placeholder) && {
						placeholder: input.placeholder,
					})}
					{...(!isEmpty(input.id) && { id: input.id })}
					{...(!isEmpty(input.labelId) && {
						'aria-labelledby': input.labelId,
					})}
					{...((!isEmpty(input.descriptionId) ||
						!isEmpty(input.descriptionId)) && {
						'aria-describedby':
							input.descriptionId + ' ' + input.errorId,
					})}
					{...(!isEmpty(input.disabled) && {
						disabled: input.disabled,
					})}
					onChange={handleInputChange}
					{...inputprops}
				/>
				{!isEmpty(input.label) && (
					<label
						className="sui-input__label"
						{...(!isEmpty(input.id) && { htmlFor: input.id })}
						{...(!isEmpty(input.labelId) && { id: input.labelId })}
					>
						{input.label}
					</label>
				)}
			</div>

			{!isEmpty(input.error) && (
				<span
					{...(!isEmpty(input.errorId) && { id: input.errorId })}
					className="sui-input__error-message"
					role="alert"
				>
					{input.error}
				</span>
			)}

			{!isEmpty(input.description) && (
				<span
					{...(!isEmpty(input.descriptionId) && {
						id: input.descriptionId,
					})}
					className="sui-input__description"
				>
					{input.description}
				</span>
			)}
		</div>
	);
};

// Publish required component.
export { Input };
