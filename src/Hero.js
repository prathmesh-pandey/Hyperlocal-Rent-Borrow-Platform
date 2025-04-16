import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
const Hero = () => {
  const navigate = useNavigate();
  return(
  <section className="hero">
    <h1>Borrow Smarter. Rent Local.</h1>
    <p>Skip buying. Lend and rent from your neighborhood!</p>
    <div className="button-container">
    <button className="cta-button" onClick={() => navigate('/rent')}>
  <span className="cta-main">Rent</span><br />
  <span className="cta-sub"><i>an item</i></span>
</button>
<button className="cta-button" onClick={() => navigate('/lend')}>
  <span className="cta-main">Lend</span><br />
  <span className="cta-sub"><i>an item</i></span>
</button>
</div>
  </section>
);
};
export default Hero;
