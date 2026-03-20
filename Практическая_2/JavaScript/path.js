function createPath() {
    const svg = d3.select('svg');
    const width = svg.attr('width');
    const height = svg.attr('height');

    let data = [];
    
    const houseWidth = 200;
    const houseHeight = 200;
    
    const padding = 50;
    
    const minX = houseWidth / 2 + padding;
    const maxX = width - houseWidth / 2 - padding;
    const minY = houseHeight / 2 + padding;
    const maxY = height - houseHeight / 2 - padding;
    
    const segmentWidth = (maxX - minX) / 3;
    
    const x1 = minX;
    const x2 = minX + segmentWidth;
    const x3 = minX + segmentWidth * 2;
    
    const yTop = minY;
    const yBottom = maxY;
    
    const step = 5;
    
    // вниз
    for (let y = yTop; y <= yBottom; y += step) {
        data.push({x: x1, y: Math.min(y, yBottom)});
    }
    
    // вправо
    for (let x = x1; x <= x2; x += step) {
        data.push({x: Math.min(x, x2), y: yBottom});
    }
    
    // вверх
    for (let y = yBottom; y >= yTop; y -= step) {
        data.push({x: x2, y: Math.max(y, yTop)});
    }
    
    // вправо
    for (let x = x2; x <= x3; x += step) {
        data.push({x: Math.min(x, x3), y: yTop});
    }
    
    // вниз
    for (let y = yTop; y <= yBottom; y += step) {
        data.push({x: x3, y: Math.min(y, yBottom)});
    }
    
    return data;
}

const drawPath = () => {
    const dataPoints = createPath();
    const line = d3.line()
                   .x((d) => d.x)
                   .y((d) => d.y);

    const svg = d3.select('svg');
    const path = svg.append('path')
                    .attr('d', line(dataPoints))
                    .attr('stroke', 'none')
                    .attr('fill', 'none');

    return path;
}

function translateAlongSimple(path, x_size, x_size_end, y_size, y_size_end, ang, ang_end) {
    const length = path.getTotalLength();

    return function(t) {
        const point = path.getPointAtLength(t * length);
        
        const x = x_size + (x_size_end - x_size) * t;
        const y = y_size + (y_size_end - y_size) * t;
        const cur_ang = ang + (ang_end - ang) * t;

        return `translate(${point.x}, ${point.y}) 
                scale(${x}, ${y}) 
                rotate(${cur_ang})`;
    }
}