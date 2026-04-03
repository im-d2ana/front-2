document.addEventListener('DOMContentLoaded', function() {
    showTable('list', aircrafts);

    d3.select('input[value="Скрыть таблицу"]').on('click', function() {
        const table = d3.select('#list');
        table.selectAll('tr')
             .remove()

        d3.select(this)
          .style('display', 'none');

        d3.select('input[value="Показать таблицу"]')
          .style('display', 'block');
    });

    d3.select('input[value="Показать таблицу"]').on('click', function() {
        showTable('list', aircrafts);
        
        d3.select(this)
          .style('display', 'none');

        d3.select('input[value="Скрыть таблицу"]')
          .style('display', 'block');
    });

    d3.selectAll('input[name="OY"]').on('change', function() {
        const showMax = d3.select('#max_speed').property('checked');
        const showMin = d3.select('#min_speed').property('checked');
        
        if (showMax || showMin) {
            d3.select('#max_speed').node().parentNode.classList.remove('error');
            d3.select('#min_speed').node().parentNode.classList.remove('error');
        }
    });

    d3.select('input[value="Построить"]').on('click', function() {
        let dataForm = d3.select('#setting');
        let svg = dataForm.select('svg')
                          .style('display', 'block');
    
        const showMax = dataForm.select('#max_speed').property('checked');
        const showMin = dataForm.select('#min_speed').property('checked');
        
        if (!showMax && !showMin) {
            d3.select('#max_speed').node().parentNode.classList.add('error');
            d3.select('#min_speed').node().parentNode.classList.add('error');
            d3.select('svg').selectAll('*').remove();
            return;
        }

        drawGraph(aircrafts, dataForm);
    });
});