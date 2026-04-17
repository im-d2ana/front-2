import './CSS/App.css';
import aircrafts from './data.js'
import Table from './components/Table.js';

function App() {
  return (
    <div className='App'>
      <h3>Легенды авиации</h3>
      <Table data={aircrafts} amountRows='10' showPag={true} />
    </div>
  );
}

export default App;