import React from'react';
import'./App.css';
import './styles/global.css';
import MapView from './MapView'; 
import{
    BrowserRouter as Router,Routes,
    Route}from'react-router-dom';

import Navbar from'./Navbar'
import Hero from './Hero';
import Cards from    './Cards';
import Footer from './Footer';
import Listings from './Listings';
import LendForm from './LendForm';

const App=()=>{
return(
<div className="App">
<Router>
<Navbar/>
<Routes>
<Route path="/"element={<>
<Hero/>
<Cards/>
<Footer/>
</>}/>
<Route path="/lend" element={<LendForm/>}/>
<Route path="/rent" element={<Listings />} />
<Route path="/map" element={<MapView />} />
</Routes>
</Router>
</div>)
}

export default App