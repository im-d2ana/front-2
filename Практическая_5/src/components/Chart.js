import { useState, useEffect } from "react";
import ChartDraw from "./ChartDraw";
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState('Тип');
    const [oy, setOy] = useState([true, false]);
    const [graphType, setGraphType] = useState('dot');
    const [error, setError] = useState(false);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (props.data && props.data.length > 0) {
            const newData = createArrGraph(props.data, ox);
            setChartData(newData);
        } else {
            setChartData([]);
        }
    }, [props.data, ox]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const showMax = event.target['oy'][0].checked;
        const showMin = event.target['oy'][1].checked;
        if (!showMax && !showMin) {
            setError(true);
            return;
        }

        const newOx = event.target['ox'].value;
        setOx(newOx);
        setOy([showMax, showMin]);

        setError(false);
        setGraphType(event.target['graph_type'].value);
    }

    const handleCheckbox = (index) => {
        const newOy = [...oy];
        newOy[index] = !newOy[index];
        setOy(newOy);
        setError(false);
    }

    const createArrGraph = (data, key) => {
        if (!data || data.length === 0) return [];

        const groupObj = d3.group(data, d => d[key]);

        let arrGraph = [];
        for (let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Макс. скорость']));
            arrGraph.push({labelX : entry[0], values : minMax});
        }

        if (key === 'Год первого полета') {
            arrGraph.sort((a,b) => Number(a.labelX) - Number(b.labelX));
        }
        else {
            arrGraph.sort((a, b) => String(a.labelX).localeCompare(String(b.labelX)));
        }

        return arrGraph;
    }

    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p>Значение по оси ОХ: </p>
                <div>
                    <input type="radio" name="ox" value='Тип' defaultChecked={ox === 'Тип'} />
                    Тип <br/>
                    <input type="radio" name="ox" value='Год первого полета' />
                    Год первого полета
                </div>

                <p>Значение по оси ОУ: </p>
                <div style={{color : error ? 'red' : 'black'}}>
                    <input type="checkbox" name="oy" checked={oy[0] === true} onChange={() => handleCheckbox(0)} />
                    Максимальная скорость <br/>
                    <input type="checkbox" name="oy" onChange={() => handleCheckbox(1)} />
                    Минимальная скорость 
                </div>

                <p>Тип диаграммы:</p>
                <div>
                    <select name='graph_type' value={graphType} onChange={(event) => setGraphType(event.target.value)}>
                        <option value='dot'>Точечная диаграмма</option>
                        <option value='histogram'>Гистограмма</option>
                    </select>
                </div>

                <p>
                    <button type="submit">Построить</button>
                </p>
            </form>

            <ChartDraw data={chartData} 
                       showMax={oy[0]}
                       showMin={oy[1]}
                       graphType={graphType}
            />
        </>
    );
}

export default Chart;