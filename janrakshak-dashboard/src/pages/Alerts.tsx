import React from "react";
import "./Alerts.css";

const Alerts: React.FC = () => {
  return (
    <div className="alerts">
      <h1>Alerts</h1>
      <div className="alerts-content">
        <div>
          <h2>Recent Alerts</h2>
          <p>No new alerts at the moment.</p>
        </div>
        <div>
          <h2>Alert History</h2>
          <p>View past alerts and their resolutions.</p>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
