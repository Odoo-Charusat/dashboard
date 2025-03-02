import React from "react";
import "./Analytics.css";
import Footer from "../components/Footer";


const Analytics: React.FC = () => {
  return (
    <div className="analytics">
      <h1>Analytics Page</h1>
      <div className="analytics-content">
        {/* Add analytics-related components here */}
        <ul>
        <li>Stay indoors and find a safe spot away from windows and heavy objects.</li>
        <li>Keep an emergency kit ready with essentials like food, water, and first aid supplies.</li>
        <li>Be aware of evacuation routes in case of emergencies.</li>
        <p>Keep monitoring the live feed for any critical alerts or changes in seismic activity.</p>
      </ul>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Analytics;
