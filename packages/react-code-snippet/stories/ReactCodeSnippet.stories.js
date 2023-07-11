import React from 'react';

// Import required component.
import { CodeSnippet as SuiCodeSnippet } from '../lib/react-code-snippet';

// Import documentation main page.
import docs from './ReactCodeSnippet.mdx';

// Configure default options.
export default {
	title: 'SUI/Components/Simple Elements/Code Snippet',
	component: SuiCodeSnippet,
	parameters: {
		layout: 'fullscreen',
		docs: {
			page: docs,
		},
	},
};

// Build "Tag" story.
const CodeSnippet = ({ language, copy, color }) => {
	const boxStyles = {
		padding: 20,
		borderRadius: 4,
		background: color !== 'white' ? '#fff' : '#333',
	};

	return (
		<div className="sui-layout sui-layout--horizontal sui-layout--vertical">
			<div className="sui-layout__content">
				<div style={boxStyles}>
					<SuiCodeSnippet language={language} copy={copy}>
						{`<!-- Code Starts -->
<div class=”className”>
	<a href=”#”> Link </a>
</div>`}
					</SuiCodeSnippet>
				</div>
			</div>
		</div>
	);
};

// Set story arguments.
CodeSnippet.args = {
	language: 'markup',
	copy: true,
};

// Set controls for story arguments.
CodeSnippet.argTypes = {
	language: {
		name: 'Code Language',
		options: ['markup', 'javascript', 'css'],
		control: {
			type: 'select',
			labels: {
				markup: 'Language: HTML',
				javascript: 'Language: Javascript',
				css: 'Language: CSS',
			},
		},
	},
	copy: {
		name: 'Copy Button',
		control: {
			type: 'boolean',
		},
	},
};

// Publish required stories.
export { CodeSnippet };