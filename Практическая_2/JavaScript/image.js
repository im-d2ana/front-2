function drawImg(svg) {
    const house = svg.append('g');

    // дом
    house.append('rect')
       .attr('x', 0)
       .attr('y', 0)
       .attr('width', 200)
       .attr('height', 150)
       .attr('fill', '#F4A460')
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 2);

    // крыша
    house.append('polygon')
       .attr('points', '-20,0 220,0 100,-80')
       .attr('fill', '#CD5C5C')
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 2);

    // окно 1
    house.append('circle')
       .attr('cx', 100)
       .attr('cy', -30)
       .attr('r', 20)
       .attr('fill', '#87CEEB')
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);

    // дверь
    house.append('rect')
       .attr('x', 60)
       .attr('y', 50)
       .attr('width', 40)
       .attr('height', 100)
       .attr('fill', '#8B4513')
       .attr('stroke', '#654321')
       .attr('stroke-width', 2);

    // ручка двери
    house.append('circle')
       .attr('cx', 70)
       .attr('cy', 100)
       .attr('r', 5)
       .attr('fill', '#FFD700')
       .attr('stroke', '#B8860B')
       .attr('stroke-width', 1);

    // окно 2
    house.append('rect')
       .attr('x', 130)
       .attr('y', 40)
       .attr('width', 50)
       .attr('height', 60)
       .attr('fill', '#ADD8E6')
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);

    house.append('line')
       .attr('x1', 130)
       .attr('y1', 70)
       .attr('x2', 180)
       .attr('y2', 70)
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);

    house.append('line')
       .attr('x1', 155)
       .attr('y1', 40)
       .attr('x2', 155)
       .attr('y2', 100)
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);
    
    return house;
}