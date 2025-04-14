import React from 'react';
import './Cards.css';

const Cards = () => {
    return (
        <section id="features" className="cards-section">
            <div className="card">
                <h3>Rent Locally</h3>
                <p>Find everything you need, just around the corner.</p>
            </div>
            <div className="card">
                <h3>Borrow Smarter</h3>
                <p>Save money by borrowing instead of buying.</p>
            </div>
            <div className="card">
                <h3>Eco-Friendly</h3>
                <p>Reduce waste by sharing what you have.</p>
            </div>
        </section>
    );
}

export default Cards;
