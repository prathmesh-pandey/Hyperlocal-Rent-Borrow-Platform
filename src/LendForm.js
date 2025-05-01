import React, { useState } from 'react';
import './LendForm.css';
import { useDropzone } from 'react-dropzone';

const LendForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    availability: '',
    price: '',
    specifications: '',
    dailyRate: '',
    weeklyRate: '',
    securityDeposit: '',
  });
  
  const [images, setImages] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: true,
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      setImages(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
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

    if (images.length === 0) {
      alert('Please upload at least one photo 📸');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const data = new FormData();
      data.append('productName', formData.productName);
      data.append('category', formData.category);
      data.append('availability', formData.availability);
      data.append('price', formData.price);
      data.append('specifications', formData.specifications);
      data.append('dailyRate', formData.dailyRate);
      data.append('weeklyRate', formData.weeklyRate);
      data.append('securityDeposit', formData.securityDeposit);

      // Append all selected images
      images.forEach((img) => data.append('photo', img));

      data.append('latitude', latitude);
      data.append('longitude', longitude);

      try {
        const response = await fetch('http://localhost:5000/submit-listing', {
          method: 'POST',
          body: data
        });

        const result = await response.text();
        console.log('✅ Success:', result);
        alert('Listing submitted! 🎉');

        // Reset everything
        setFormData({
          productName: '',
          category: '',
          availability: '',
          price: '',
          specifications: '',
          dailyRate: '',
          weeklyRate: '',
          securityDeposit: '',
        });
        setImages([]); // Clear previews
      } catch (error) {
        console.error('❌ Error:', error);
        alert('Failed to submit listing 😢');
      }
    }, () => {
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
          placeholder="What are you listing?"
          value={formData.productName}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Tools">Tools</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="availability"
          placeholder="Availability"
          value={formData.availability}
          onChange={handleChange}
          required
        />

        <label className="section-title">Photos</label>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className="upload-instructions">
            <span className="plus-icon">+</span>
            <p>Drag and drop photos here, or <span className="browse">browse</span></p>
            <p className="note">Upload up to 10 photos (Max 5MB each)</p>
          </div>
        </div>
        <div className="preview-thumbnails">
          {images.map((file, index) => (
            <img
              key={index}
              src={file.preview}
              alt={`preview ${index}`}
              className="thumbnail"
            />
          ))}
        </div>

        <div className="pricing-section">
          <h3>Pricing</h3>

          <label htmlFor="dailyRate">Daily Rate (₹)</label>
          <input
            type="number"
            id="dailyRate"
            name="dailyRate"
            value={formData.dailyRate}
            onChange={handleChange}
            placeholder="0"
          />

          <label htmlFor="weeklyRate">Weekly Rate (₹)</label>
          <input
            type="number"
            id="weeklyRate"
            name="weeklyRate"
            value={formData.weeklyRate}
            onChange={handleChange}
            placeholder="0"
          />

          <label htmlFor="securityDeposit">Security Deposit (₹)</label>
          <input
            type="number"
            id="securityDeposit"
            name="securityDeposit"
            value={formData.securityDeposit}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <textarea
          name="specifications"
          placeholder="Specifications"
          value={formData.specifications}
          onChange={handleChange}
          className="mt-6 w-full border rounded-lg p-3"
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
