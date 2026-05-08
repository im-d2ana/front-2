const Filter = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            'Название' : event.target['structure'].value.toLowerCase(),
            'Тип' : event.target['type'].value.toLowerCase(),
            'Год первого полета' : [event.target['year_start'].value, event.target['year_end'].value],
            'Длина' : [event.target['length_start'].value, event.target['length_end'].value],
            'Размах крыла' : [event.target['wing_start'].value, event.target['wing_end'].value],
            'Макс. скорость' : [event.target['speed_start'].value, event.target['speed_end'].value],
        };

        let arr = props.fullData;
        for (const key in filterField) {
            const value = filterField[key];

            if (key === 'Год первого полета' || key === 'Длина' || key === 'Размах крыла' || key === 'Макс. скорость') {
                let [min, max] = value;
                if (min === '') {
                    min = -Infinity;
                }
                else {
                    min = Number(min);
                }

                if (max === '') {
                    max = Infinity;
                }
                else {
                    max = Number(max);
                }

                arr = arr.filter(item => {
                    return item[key] >= min && item[key] <= max;
                });
            }
            else if (value && value !== '') {
                arr = arr.filter(item => item[key].toLowerCase().includes(value));
            }
        }

        props.filtering(arr);
    }

    const handleReset = (event) => {
        event.target.reset();
        props.filtering([...props.fullData]);
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p>
                <label>Название: </label>
                <input name='structure' type="text" />
            </p>
            <p>
                <label>Тип: </label>
                <input name='type' type="text" />
            </p>
            <p>
                <label>Год от: </label>
                <input name='year_start' type="number" />
            </p>
            <p>
                <label>Год до: </label>
                <input name='year_end' type="number" />
            </p>
            <p>
                <label>Длина от: </label>
                <input name='length_start' type="number" />
            </p>
            <p>
                <label>Длина до: </label>
                <input name='length_end' type="number" />
            </p>
            <p>
                <label>Размах крыла от: </label>
                <input name='wing_start' type="number" />
            </p>
            <p>
                <label>Размах крыла до: </label>
                <input name='wing_end' type="number" />
            </p>
            <p>
                <label>Макс. скорость от: </label>
                <input name='speed_start' type="number" />
            </p>
            <p>
                <label>Макс. скорость до: </label>
                <input name='speed_end' type="number" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
    );
}

export default Filter;