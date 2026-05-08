import './CSS/App.css';
import aircrafts from './data.js'
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';

const App = (props) => {
  const [filteredData, setFilteredData] = useState(props.data || []);
  const handleFilter = (newData) => {
    setFilteredData(newData || []);
  }

  return (
    <div className='App'>
      <h3>Легенды авиации</h3>
      <Chart data={filteredData} />
      <Table data={props.data || []} amountRows='10' showPag={true} onFilterChange={handleFilter} />
    </div>
  );
}

export default App;