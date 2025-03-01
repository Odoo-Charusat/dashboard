import React from "react";
// import "./SummaryBox.css";

const SummaryBox: React.FC = () => {
  return (
    <div className="summary-box">
      <h3>Summary</h3>
      <p>Total Drones: 10</p>
      <p>Active Drones: 7</p>
      <p>Inactive Drones: 3</p>
    </div>
  );
};

export default SummaryBox;
