import React, { useState, useEffect } from 'react';
import AriaModal from './elements/react-aria-modal';
import { isNumber } from '@wpmudev/react-utils';

export const AlertDialog = ({ modalContent, triggerTimer, triggerContent, ...props }) => {
	const is = {};
	const set = {};

	// Dialog states
	[is.open, set.open] = useState(false);
	[is.closing, set.closing] = useState(false);

	// Slider states
	[is.current, set.current] = useState(props.firstSlide);
	[is.direction, set.direction] = useState(null);

	// Run functions on load
	useEffect(() => {
		if (!props.dialogId) {
			throw new Error('SUI Modal instances should have a `dialogId`');
		}

		// Load dialog when timer runs out
		if ( isNumber(triggerTimer) && triggerTimer > 0 ) {
			setTimeout( () => set.open(true), triggerTimer );
		}
	}, [props.dialogId]);

	const isSlider = 'object' === typeof modalContent && null !== modalContent;

	const openModal = () => set.open(true);

	const closeModal = () => {
		// Close the modal with the exit animation and reset the slider.
		set.closing(true);

		setTimeout(() => {
			set.open(false);
			set.closing(false);

			if (isSlider) {
				set.direction(null);
				set.current(props.firstSlide);
			}
		}, 300);
	};

	const slideTo = (slide, direction = 'left') => {
		set.current(slide);
		set.direction(direction);
	};

	const { getApplicationNode = () => document.getElementsByClassName('sui-wrap')[0] } = props;

	let dialogClass = `sui-alertdialog__content sui-content-${is.closing ? 'fade-out' : 'fade-in'} ${
		props.dialogClass || ''
	}`;

	let renderContent, modalSize, initialFocus;

	if (!isSlider) {
		// Not a slider, we can just render the content.
		renderContent = modalContent;
		modalSize = props.size;
		initialFocus = props.initialFocus || false;
	} else {
		// Render the content from the given slides.
		renderContent = modalContent[is.current].render;
		initialFocus = modalContent[is.current].focus || false;
		modalSize = modalContent[is.current].size;

		// Add the slide direction class when provided and we're not closing the modal.
		if (is.direction && !is.closing) {
			dialogClass += `sui-alertdialog--slide sui-alertdialog--active sui-animation--fadein-${is.direction}`;
		}
	}

	// Use 'is.open' as an alias of 'mounted' if not defined.
	if ('undefined' === typeof props.mounted) {
		props.mounted = is.open;
	}

	const wrapper = !props.renderToNode ? '.sui-wrap' : props.renderToNode;

	const AltModal = wrapper ? AriaModal.renderTo(wrapper) : AriaModal;

	return (
		<React.Fragment>
			<AltModal
				getApplicationNode={getApplicationNode}
				dialogClass={dialogClass}
				underlayClass={`sui-alertdialog sui-alertdialog--${modalSize || 'md'} sui-alertdialog--active ${
					props.underlayClass || ''
				}`}
				includeDefaultStyle={false}
				initialFocus={initialFocus}
				{...props}
			>
				{renderContent({ closeModal, slideTo })}
			</AltModal>
			{triggerContent && triggerContent({ openModal })}
		</React.Fragment>
	);
};
