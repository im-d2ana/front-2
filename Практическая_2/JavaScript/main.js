document.addEventListener('DOMContentLoaded', function() {
    const svg = d3.select('svg')
                  .attr('width', 1000)
                  .attr('height', 600);

    d3.select('input[value="Очистить"]').on('click', function() {
        svg.selectAll('*').remove();

        const form = d3.select('#setting').node();
        form.reset();
    });

    d3.select('input[value="Анимировать"]').on('click', function() {
        let form = d3.select('#setting').node();
        runAnimation(form);
    });
});

const runAnimation = (dataForm) => {
    const svg = d3.select('svg');
    svg.selectAll('*').remove();

    let pict = drawImg(svg);
    let path = drawPath();

    const point = path.node().getPointAtLength(0);
    pict.attr('transform', `translate(${point.x}, ${point.y})`);

    const speed = 6000 / parseFloat(dataForm.spd.value);

    pict.transition()
        .duration(speed)
        .ease(d3.easeLinear)
        .attrTween('transform', function() {
            return translateAlongSimple(
                        path.node(),
                        parseFloat(dataForm.x_size.value), 
                        parseFloat(dataForm.x_size_end.value),
                        parseFloat(dataForm.y_size.value), 
                        parseFloat(dataForm.y_size_end.value),
                        parseFloat(dataForm.ang.value), 
                        parseFloat(dataForm.ang_end.value)
            );
        });
}