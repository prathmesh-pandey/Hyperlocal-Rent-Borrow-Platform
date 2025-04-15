import React from'react';
import'./App.css';
import Navbar from'./Navbar'
import Hero from './Hero'
import Cards from    './Cards';
import Footer from './Footer';
import{
BrowserRouter as Router,Routes,
Route}from'react-router-dom';
import LendForm from './LendForm'

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
</Routes>
</Router>
</div>)
}

export default App
