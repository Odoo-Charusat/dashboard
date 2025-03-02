import React from "react";
import "./LiveMap.css";
import MapView from "../pages/MapView";

const LiveMap: React.FC = () => {
  return (
    <div className="live-map">
      <h3>Live Monitoring</h3>
      
      <h4>Precautionary Measures</h4>
      <ul>
        <li>Stay indoors and find a safe spot away from windows and heavy objects.</li>
        <li>Keep an emergency kit ready with essentials like food, water, and first aid supplies.</li>
        <li>Be aware of evacuation routes in case of emergencies.</li>
      </ul>

      <p>Keep monitoring the live feed for any critical alerts or changes in seismic activity.</p>
      
      {/* <MapView /> */}
    </div>
  );
};

export default LiveMap;
