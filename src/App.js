import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Hero from './Hero';
import Cards from './Cards';
import Footer from './Footer';

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <Cards />
            <Footer />
        </div>
    );
}

export default App;
