import React from 'react';
import './LendForm.css';

const LendForm = () => {
  return (
    <div className="form-wrapper">
      <h2>Lend an Item</h2>
      <form className="lend-form">
        <input type="text" placeholder="Product Name" />
        <input type="text" placeholder="Category" />
        <input type="text" placeholder="Availability" />
        <input type="number" placeholder="Price" />
        <textarea placeholder="Specifications"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LendForm;