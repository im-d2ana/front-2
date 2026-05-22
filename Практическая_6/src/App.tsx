import React, { useState } from 'react';
import logo from './images/logo.svg';
import './styles/App.css';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  const [interval, setInterval] = useState(1000);
  return (
    <div>
      <Navbar active='1'/>
      <Gallery />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
