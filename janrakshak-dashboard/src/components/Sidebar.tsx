import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Janrakshak</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/alerts">Alerts</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;