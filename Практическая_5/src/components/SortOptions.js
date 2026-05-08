const SortOptions = (props) => {
    const keys = Object.keys(props.data[0]);

    let availableKeys = keys;
    if (props.excludeFields && props.excludeFields.length > 0) {
        availableKeys = keys.filter(key => !props.excludeFields.includes(key));
    }

    return (
        <select value={props.value || ''} onChange={event => props.onChange(event.target.value)} disabled={props.disabled}>
            <option value=''>Нет</option>
            {availableKeys.map((key, index) => {
                return <option key={index} value={key}>{key}</option>
            })}
        </select>
    );
}

export default SortOptions;