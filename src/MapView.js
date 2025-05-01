import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapView.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const [listings, setListings] = useState([]);
  const [position, setPosition] = useState([27.602945, 77.595008]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        const res = await fetch(`http://localhost:5000/nearby-listings?lat=${latitude}&lng=${longitude}`);
        const data = await res.json();
        setListings(data);
      },
      (err) => {
        console.warn('Location access denied. Using default location.');
        fetch('http://localhost:5000/listings')
          .then(res => res.json())
          .then(data => setListings(data));
      }
    );
  }, []);

  return (
    <div className="map-wrapper">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '90vh', width: '100%' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; OpenStreetMap contributors'
        />
        {listings.map((item, idx) => (
          <Marker key={idx} position={item.location.coordinates.reverse()}>
            <Popup>
              <strong>{item.productName}</strong><br />
              ₹{item.price} <br />
              {item.category}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
