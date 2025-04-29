import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Listings.css';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation(); 

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('search') || '';
    setSearchQuery(query); 
  }, [location.search]);

  useEffect(() => {
    fetch('http://localhost:5000/listings')
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error('Fetch exploded:', err));
  }, []);

  const filteredListings = listings.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="listings-container">
      <h2>Rentable Items</h2>
  
      {filteredListings.length === 0 ? (
        <div className="empty-message">
          🫥 Nothing to rent, bro. Go touch some grass.
        </div>
      ) : (
        <ul className="listing-grid">
          {filteredListings.map((item, index) => (
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