import React, { useEffect, useState } from 'react';

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
        <p>🫥 Nothing to rent, bro. Go touch some grass.</p>
      ) : (
        <ul>
          {listings.map((item, index) => (
            <li key={index}>
              <h3>{item.productName}</h3>
              <p>Category: {item.category}</p>
              <p>Availability: {item.availability}</p>
              <p>Price: ₹{item.price}</p>
              <p>Details: {item.specifications}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Listings;