import React, { useEffect, useState } from 'react';
import './Listings.css';
const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/listings')
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error('Fetch exploded:', err));
  }, []);

  return (
    <div className="listings-container">
      <h2>Rentable Items</h2>
      {listings.length === 0 ? (
        <div className="empty-message">
        🫥 Nothing to rent, bro. Go touch some grass.
        </div>
      ) : (
        <ul className="listing-grid">
  {listings.map((item, index) => (
    <li key={index} className="listing-card">
      <h3>{item.productName}</h3>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Availability:</strong> {item.availability}</p>
      <p><strong>Price:</strong> ₹{item.price}</p>
      <p><strong>Details:</strong> {item.specifications}</p>
    </li>
  ))}
</ul>       
      )}    
    </div>
    
  );
};

export default Listings;