import React, { useEffect, useState } from 'react';
import './Listings.css';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // 🔍 Add this line

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
      <input
        type="text"
        className="search-bar"
        placeholder="Search for items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

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