const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');

    for (const item of sortSelects) {
        const keySort = item.value;
        if (keySort == 0) {
            break;
        }

        const desc = document.getElementById(item.id + 'Desc').checked;
        sortArr.push(
            {column: keySort - 1,
             direction: desc}
        );
    }
    return sortArr;
}

const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);

    if (sortArr.length === 0) {
        createTable(aircrafts, idTable);
        return false;
    }

    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    const headerRow = rowData.shift();

    rowData.sort((first, second) => {
        for (let {column, direction} of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;

            const firstNum = parseFloat(firstCell);
            const secondNum = parseFloat(secondCell);
            const isNumeric = !isNaN(firstNum) && !isNaN(secondNum);

            let comparison;
            if (isNumeric) {
                comparison = firstNum - secondNum;
            }
            else {
                comparison = firstCell.localeCompare(secondCell);
            }

            if (comparison !== 0) {
                return (direction ? -comparison : comparison);
            }
        }
        return 0;
    });

    table.append(headerRow);
    let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
    table.append(tbody);
}

document.querySelector('input[value="Сортировать"]').onclick = function() {
    let form = document.getElementById('sort');
    sortTable('list', form);
}

const clearSort = () => {
    const form = document.getElementById('sort');
    const selects = form.getElementsByTagName('select');

    for (let select of selects) {
        select.value = '0';
    }
    for (let i = 1; i < selects.length; i++) {
        selects[i].disabled = true;
    }

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
    }

    clearTable('list');
    createTable(currentData, 'list');
}

document.querySelector('input[value="Сбросить сортировку"]').onclick = function() {
    clearSort();
}