import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css"; // Import the CSS

const MapView: React.FC = () => {
  return (
    <div className="map-view"> {/* Apply CSS class */}
      <h1>Live Map</h1>
      <div className="map-container"> 
        <MapContainer center={[28.6139, 77.2090]} zoom={10} className="leaflet-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[28.6139, 77.2090]}>
            <Popup>New Delhi</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
