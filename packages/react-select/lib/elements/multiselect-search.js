const Search = ({ id, onChange, ...props }) => {
	const handleInputChange = (event) => {
		onChange(event);
	};

	return (
		<input
			id={id}
			type="text"
			className="sui-select__search--input"
			onChange={handleInputChange}
			autoComplete="off"
			{...props}
		/>
	);
};

export { Search };