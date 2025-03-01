import React from "react";
// import SummaryBox from "../components/SummaryBox";
import DroneActivityChart from "../components/DroneActivityChart";
import LiveMap from "../components/LiveMap";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <LiveMap />
        {/* <SummaryBox /> */}
        <DroneActivityChart />
      </div>
    </div>
  );
};

export default Dashboard;
