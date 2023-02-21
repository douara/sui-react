import React, { createElement, useState, Fragment, Children } from "react";
import { isUndefined, isEmpty, isBoolean, isObject } from "@wpmudev/react-utils";

// Import required component(s).
import { Label } from "../elements/button-label";
import { Icon } from "../elements/button-icon";
import { Loader } from "../elements/button-loader";

// Build "Default Button" component.
const Button = ({
	href,
	htmlFor,
	theme,
	color,
	size,
	className,
	loading,
	disabled,
	children,
	...props
}) => {
	const is = {};
	const has = {};
	const set = {};

	// Define button states.
	[is.hover, set.hover] = useState(false);
	[is.focus, set.focus] = useState(false);

	// Define button defaults.
	set.loading = loading || false;
	set.disabled = disabled || false;

	// Parameter(s) validation.
	is.link = !isUndefined(href) && !isEmpty(href) ? true : false;
	is.label = !isUndefined(htmlFor) && !isEmpty(htmlFor) ? true : false;

	has.class = !isUndefined(className) && !isEmpty(className) ? true : false;
	has.loading = !isUndefined(loading) ? true : false;
	has.disabled = !isUndefined(disabled) && isBoolean(disabled) ? true : false;

	if ( !has.loading ) {
		throw new Error(
			`Incorrect parameter type. More details below:\n\n⬇️ ⬇️ ⬇️\n\n📦 Shared UI - Components: Button\n\nThe parameter "loading" is not a boolean type.\n\n`
		);
	}

	if ( !has.disabled ) {
		throw new Error(
			`Incorrect parameter type. More details below:\n\n⬇️ ⬇️ ⬇️\n\n📦 Shared UI - Components: Button\n\nThe parameter "disabled" is not a boolean type.\n\n`
		);
	}

	// Define button tag.
	set.tag = 'button';

	if ( is.link ) {
		set.tag = 'a';
	} else if ( is.label ) {
		set.tag = 'label';
	}

	// Define button class.
	set.class = 'sui-button';

	switch ( theme ) {
		case 'primary':
		case 'secondary':
		case 'tertiary':
			set.class += ' sui-button--' + theme;
			break;

		default:
			// Do nothing.
			break;
	}

	switch ( color ) {
		case 'blue':
		case 'black':
		case 'red':
		case 'navy':
		case 'white':
			set.class += ' sui-button--' + color;
			break;

		default:
			// Do nothing.
			break;
	}

	switch ( size ) {
		case 'sm':
			set.class += ' sui-button--' + size;
			break;

		default:
			// Do nothing.
			break;
	}

	if ( has.class ) {
		set.class += ' ' + className;
	}

	if ( is.hover ) {
		set.class += ' sui-button--hover';
	}

	if ( is.focus ) {
		set.class += ' sui-button--focus';
	}

	if ( set.loading ) {
		set.class += ' sui-button--loading';
	}

	if ( set.disabled ) {
		set.class += ' sui-button--disabled';
	}

	// Define button markup.
	set.markup = (
		<Fragment>
			{ Children.map( children, ( child, index ) => {
				return (
					<Fragment key={ index }>
						{ isObject( child )
							? isUndefined(child.props.slot)
								? child
								: (
									<Fragment>
										{ 'icon' === child.props.slot && <Icon name={ child.props.name } /> }
										{ 'label' === child.props.slot && <Label>{ child.props.children }</Label> }
									</Fragment>
								)
							: <Label>{ child }</Label>
						}
					</Fragment>
				);
			}) }
		</Fragment>
	);

	return createElement(
		set.tag,
		{
			... ( has.link && { href: href }),
			... ( has.label && { htmlFor: htmlFor }),
			className: set.class,
			... ( !isUndefined(loading) && isBoolean(loading) && { 'aria-live': 'polite' }),
			... ( !has.loading && { 'aria-busy': loading }),
			onMouseEnter: () => set.hover(true),
			onMouseLeave: () => set.hover(false),
			onFocus: () => set.focus(true),
			onBlur: () => set.focus(false),
			... ( !isUndefined(disabled) && { disabled: disabled }),
			...props
		},
		set.markup
	);
}

// Publish required component(s).
export { Button }
