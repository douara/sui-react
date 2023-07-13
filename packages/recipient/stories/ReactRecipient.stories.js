import React from 'react';

// Import required component
import { Recipient as SuiRecipient } from '../lib/react-recipient';

// Import documentation main page
import docs from './ReactRecipient.mdx';

// Import required assets
import image from './images/unreal-person.jpg';

// Configure default options.
export default {
	title: 'SUI/Components/Compound Elements/Recipient',
	component: SuiRecipient,
	parameters: {
		layout: 'fullscreen',
		docs: {
			page: docs,
		},
	},
};

// Build "Recipient" story.
const Recipient = ({ userAvatar, ...props }) => {
	const set = {};

	set.box = {
		margin: 0,
		padding: '10px',
		border: 'white' === props.color ? '1px solid #E6E6E6' : 0,
		borderRadius: '4px',
		background: 'white' === props.color ? '#333' : '#fff',
	};

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<div style={set.box}>
					<SuiRecipient {...props} />
				</div>
			</div>
		</div>
	);
};

// Set story arguments.
Recipient.args = {
	appearance: 'primary',
	userName: 'Recipient Name',
	userEmail: 'example@email.com',
	userAvatar: 'icon',
	userConfirmed: true,
	userImage: {
		alt: 'Unreal Person avatar image',
		src: image,
	},
	isInvited: false,
};

// Set controls for story arguments.
Recipient.argTypes = {
	userName: {
		name: 'Recipient name',
	},
	userEmail: {
		name: 'Recipient email',
	},
	userAvatar: {
		name: 'Recipient avatar',
		control: {
			type: 'inline-radio',
			options: {
				Icon: 'icon',
				Image: 'image',
			},
		},
	},
	userImage: {
		name: 'Recipient image',
		control: {
			type: 'object'
		},
		if: {
			arg: 'userAvatar',
			eq: 'image',
		},
	},
	userConfirmed: {
		name: 'Recipient confirmed',
		control: {
			type: 'boolean'
		}
	},
	isInvited: {
		name: 'Recipient invited',
		control: {
			type: 'boolean'
		}
	},
	appearance: {
		name: 'Appearance',
		options: ['primary', 'secondary'],
		control: {
			type: 'select',
			labels: {
				primary: 'Primary',
				secondary: 'Secondary'
			},
		},
	},
};

// Publish required stories.
export { Recipient };