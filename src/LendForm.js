import React, { useState } from 'react';
import './LendForm.css';

const LendForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    availability: '',
    price: '',
    specifications: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
  
      const dataToSend = {
        ...formData,
        location: {
          coordinates: [longitude, latitude],
          type: 'Point'
        }
      };
  
      try {
        const response = await fetch('http://localhost:5000/submit-listing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
  
        const result = await response.text();
        console.log('✅ Success:', result);
        alert('Listing submitted! 🎉');
        setFormData({
          productName: '',
          category: '',
          availability: '',
          price: '',
          specifications: ''
        });
  
      } catch (error) {
        console.error('❌ Error:', error);
        alert('Failed to submit listing 😢');
      }
    }, (err) => {
      alert("Can't access your location. Please enable GPS.");
    });
  };

  return (
    <div className="form-wrapper">
      <h2>Lend an Item</h2>
      <form className="lend-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability"
          value={formData.availability}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="specifications"
          placeholder="Specifications"
          value={formData.specifications}
          onChange={handleChange}
          required
        ></textarea>
        <div className="button-wrapper">
        <button type="submit">Submit</button>
      </div>
      </form>
    </div>
    
  );
};

export default LendForm;