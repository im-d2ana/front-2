import * as d3 from "d3";
import { useRef, useMemo, useEffect, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    });

    const margin = {
        top : 10, bottom : 100,
        left : 40, right : 10
    };

    const boundWidth = width - margin.left - margin.right;
    const boundHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.append('rect')
           .attr('x', margin.left)
           .attr('y', margin.top)
           .attr('width', boundWidth)
           .attr('height', boundHeight)
           .style('fill', 'lightgrey');
    });

    let min, max;
    if (props.showMax && props.showMin) {
        const allValues = [];
        props.data.forEach(d => {allValues.push(d.values[0]); allValues.push(d.values[1])});
        [min, max] = d3.extent(allValues);
    }
    else if (props.showMax) {
        [min, max] = d3.extent(props.data.map(d => d.values[1]));
    }
    else if (props.showMin) {
        [min, max] = d3.extent(props.data.map(d => d.values[0]));
    }

    const scaleX = useMemo(() => {
        return d3.scaleBand()
                 .domain(props.data.map(d => d.labelX))
                 .range([0, boundWidth])
    }, [props.data, boundHeight]); 

    const scaleY = useMemo(() => {
        return d3.scaleLinear()
                 .domain([min * 0.85, max * 1.1])
                 .range([boundHeight, 0])
    }, [boundHeight, min, max]); 

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const xAxis = d3.axisBottom(scaleX);
        svg.append('g')
           .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
           .call(xAxis)
           .selectAll('text')
           .style('text-anchor', 'end')
           .attr('dx', '-.8em')
           .attr('dy', '.15em')
           .attr('transform', d => 'rotate(-30)');

        const yAxis = d3.axisLeft(scaleY);
        svg.append('g')
           .attr('transform', `translate(${margin.left}, ${margin.top})`)
           .call(yAxis);

        if (props.graphType === 'dot') {
            const bothSelected = props.showMax && props.showMin;
            if (props.showMax) {
                svg.selectAll('.dot-max')
                    .data(props.data)
                    .enter()
                    .append('circle')
                    .attr('class', 'dot-max')
                    .attr('r', 5)
                    .attr('cx', d => {
                        let x = scaleX(d.labelX) + scaleX.bandwidth() / 2;
                        if (bothSelected && d.values[0] == d.values[1]) {
                            return x + 2.5;
                        }
                        return x;
                    })
                    .attr('cy', d => scaleY(d.values[1]))
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
                    .style('fill', 'red');
            }

            if (props.showMin) {
                svg.selectAll('.dot-min')
                    .data(props.data)
                    .enter()
                    .append('circle')
                    .attr('class', 'dot-min')
                    .attr('r', 5)
                    .attr('cx', d => {
                        let x = scaleX(d.labelX) + scaleX.bandwidth() / 2;
                        if (bothSelected && d.values[0] == d.values[1]) {
                            return x - 2.5;
                        }
                        return x;
                    })
                    .attr('cy', d => scaleY(d.values[0]))
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
                    .style('fill', 'blue');
            }
        }
        else if (props.graphType === 'histogram') {
            const bothSelected = props.showMax && props.showMin;
            let barWidth = scaleX.bandwidth();

            if (bothSelected) {
                barWidth = scaleX.bandwidth() / 2;
            }

            if (props.showMax) {
                svg.selectAll('.bar-max')
                   .data(props.data)
                   .enter()
                   .append('rect')
                   .attr('class', 'bar-max')
                   .attr('x', d => scaleX(d.labelX))
                   .attr('y', d => scaleY(d.values[1]))
                   .attr('width', barWidth)
                   .attr('height', d => boundHeight - scaleY(d.values[1]))
                   .attr('transform', `translate(${margin.left}, ${margin.top})`)
                   .attr('fill', 'red');
            }
            if (props.showMin) {
                const xOffset = bothSelected ? barWidth : 0;
                svg.selectAll('.bar-min')
                   .data(props.data)
                   .enter()
                   .append('rect')
                   .attr('class', 'bar-min')
                   .attr('x', d => scaleX(d.labelX) + xOffset)
                   .attr('y', d => scaleY(d.values[0]))
                   .attr('width', barWidth - 2)
                   .attr('height', d => boundHeight - scaleY(d.values[0]))
                   .attr('transform', `translate(${margin.left}, ${margin.top})`)
                   .attr('fill', 'blue');
            }
        }
        
    }, [scaleX, scaleY, props.data, props.showMax, props.showMin, props.graphType]);

    return (
        <svg ref={chartRef}></svg>
    );
}

export default ChartDraw;