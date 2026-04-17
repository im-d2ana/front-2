import SortOptions from "./SortOptions";
import { useState } from "react";

const Sort = (props) => {

    const [firstField, setFirstField] = useState('');
    const [firstDesc, setFirstDesc] = useState(false);

    const [secondField, setSecondField] = useState('');
    const [secondDesc, setSecondDesc] = useState(false);
    const [secondDisabled, setSecondDisabled] = useState(true);

    const [thirdField, setThirdField] = useState('');
    const [thirdDesc, setThirdDesc] = useState(false);
    const [thirdDisabled, setThirdDisabled] = useState(true);

    const createSortArr = () => {
        const sortArr = [];

        if (firstField) {
            sortArr.push({column : firstField, direction : firstDesc});
        }
        else {
            return sortArr;
        }

        if (secondField) {
            sortArr.push({column : secondField, direction : secondDesc});
        }
        if (thirdField) {
            sortArr.push({column : thirdField, direction : thirdDesc});
        }

        return sortArr;
    }

    const sortData = () => {
        const sortArr = createSortArr();

        if (sortArr.length === 0) {
            props.onSort([...props.filteredDataUnsorted]);
            return;
        }

        let sortedData = [...props.filteredDataUnsorted];

        sortedData.sort((first, second) => {
            for (let {column, direction} of sortArr) {
                let firstCell = first[column];
                let secondCell = second[column];

                const firstNum = parseFloat(firstCell);
                const secondNum = parseFloat(secondCell);
                const isNum = !isNaN(firstNum) && !isNaN(secondNum);

                let comparison;
                if (isNum) {
                    comparison = firstNum - secondNum;
                }
                else {
                    firstCell = String(firstCell).toLowerCase();
                    secondCell = String(secondCell).toLowerCase();
                    comparison = firstCell.localeCompare(secondCell);
                }

                if (comparison !== 0) {
                    return direction ? -comparison : comparison;
                }
            }
            
            return 0;
        });

        props.onSort(sortedData);
    }

    const handleReset = () => {
        setFirstField('');
        setFirstDesc(false);
        
        setSecondField('');
        setSecondDesc(false);
        setSecondDisabled(true);

        setThirdField('');
        setThirdDesc(false);
        setThirdDisabled(true);

        props.onSort([...props.filteredDataUnsorted]);
    }

    const handleFirstChange = (value) => {
        setFirstField(value);

        setSecondField('');
        setSecondDesc(false);
        setSecondDisabled(!value);

        setThirdField('');
        setThirdDesc(false);
        setThirdDisabled(true);
    }

    const handleSecondChange = (value) => {
        setSecondField(value);

        if (!value) {
            setThirdDisabled(true);
            setThirdField('');
            setThirdDesc(false);
        }
        else {
            setThirdDisabled(false);
        }
    }

    return (
        <form>
            <p>
                <label>Первый уровень: </label>
                <SortOptions data={props.fullData}
                             value={firstField}
                             onChange={handleFirstChange}
                             disabled={false}
                             id='fieldFirst'
                />
                по убыванию ? <input type="checkbox" 
                                     id="fieldsFirstDesc"
                                     checked={firstDesc}
                                     onChange={event => setFirstDesc(event.target.checked)}
                                     disabled={!firstField}
                              />
            </p>
            <p>
                <label>Второй уровень: </label>
                <SortOptions data={props.fullData}
                             value={secondField}
                             onChange={handleSecondChange}
                             disabled={secondDisabled}
                             excludeFields={[firstField].filter(Boolean)}
                             id='fieldSecond'
                />
                по убыванию ? <input type="checkbox" 
                                     id="fieldsSecondDesc"
                                     checked={secondDesc}
                                     onChange={event => setSecondDesc(event.target.checked)}
                                     disabled={!secondField}
                              />
            </p>
            <p>
                <label>Третий уровень: </label>
                <SortOptions data={props.fullData}
                             value={thirdField}
                             onChange={setThirdField}
                             disabled={thirdDisabled}
                             excludeFields={[firstField, secondField].filter(Boolean)}
                             id='fieldThird'
                />
                по убыванию ? <input type="checkbox" 
                                     id="fieldsThirdDesc"
                                     checked={thirdDesc}
                                     onChange={event => setThirdDesc(event.target.checked)}
                                     disabled={!thirdField}
                              />
            </p>
            <p>
                <input type="button" value="Сортировать" onClick={sortData} />
                <input type="button" value="Сбросить сортировку" onClick={handleReset} />
            </p>
        </form>
    );
}

export default Sort;