import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
// import "./DroneActivityChart.css";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const DroneActivityChart: React.FC = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Drone Activity",
        data: [10, 15, 8, 12, 18, 10],
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Drone Activity</h3>
      <Line data={data} />
    </div>
  );
};

export default DroneActivityChart;
