// // import React from "react";
// // // import SummaryBox from "../components/SummaryBox";
// // import DroneActivityChart from "../components/DroneActivityChart";
// // import LiveMap from "../components/LiveMap";
// // import "./Dashboard.css";

// // const Dashboard: React.FC = () => {
// //   return (
// //     <div className="dashboard">
// //       <h1>Dashboard</h1>
// //       <div className="dashboard-content">
// //         <LiveMap />
// //         {/* <SummaryBox /> */}
// //         <DroneActivityChart />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React from "react";
// // import SummaryBox from "../components/SummaryBox";
// import DroneActivityChart from "../components/DroneActivityChart";
// import LiveMap from "../components/LiveMap";
// import "./Dashboard.css";

// const Dashboard: React.FC = () => {
//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <div className="dashboard-content">
//         <LiveMap />
//         {/* <SummaryBox /> */}
//         <DroneActivityChart />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import DroneActivityChart from "../components/DroneActivityChart";
// import LiveMap from "../components/LiveMap";
// import "./Dashboard.css";

// const Dashboard: React.FC = () => {
//   const [sensorData, setSensorData] = useState<{ af: number; iif: number; data_from: string }[]>([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/sensors")
//       .then((res) => res.json())
//       .then((data) => setSensorData(data))
//       .catch((err) => console.error("Error fetching sensor data:", err));
//   }, []);

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <div className="dashboard-content">
//         <LiveMap />
//         <DroneActivityChart />
//       </div>
//       <div className="sensor-data">
//         <h2>Sensor Data</h2>
//         <ul>
//           {sensorData.map((item, index) => (
//             <li key={index}>
//               <strong>Acceleration Factor:</strong> {item.af} <br />
//               <strong>Impact Intensity Factor:</strong> {item.iif} <br />
//               <strong>Source:</strong> {item.data_from}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DroneActivityChart from "../components/DroneActivityChart";
// import LiveMap from "../components/LiveMap";
// import "./Dashboard.css";

// const Dashboard: React.FC = () => {
//   const [sensorData, setSensorData] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/data");
//         setSensorData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData(); // Fetch initially
//     const interval = setInterval(fetchData, 10000); // Fetch every 5 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <div className="dashboard-content">
//         <LiveMap />
//         <DroneActivityChart />
//         <div className="sensor-data">
//           <h2>Latest Sensor Data</h2>
//           {sensorData ? (
//             <pre>{JSON.stringify(sensorData, null, 2)}</pre>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


//the below code is correctly showing the fetched data, but raw data

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DroneActivityChart from "../components/DroneActivityChart";
// import LiveMap from "../components/LiveMap";
// import "./Dashboard.css";

// const Dashboard: React.FC = () => {
//   const [sensorData, setSensorData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/data");
//         setSensorData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData(); // Fetch initially

//     const interval = setInterval(fetchData, 10000); // Fetch every 10 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <div className="dashboard-content">
//         <LiveMap data={sensorData} />
//         <DroneActivityChart data={sensorData} />
//         <div className="sensor-data">
//           <h2>Latest Sensor Data</h2>
//           {loading ? (
//             <p>Loading...</p>
//           ) : sensorData ? (
//             <pre>{JSON.stringify(sensorData, null, 2)}</pre>
//           ) : (
//             <p>No data available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import axios from "axios";
import DroneActivityChart from "../components/DroneActivityChart";
import LiveMap from "../components/LiveMap";
import Alerts from "./Alerts";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        setSensorData(response.data);
        setLoading(false);
        setError(null); // Reset error on successful fetch
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError("Failed to load data. Please try again.");
      }
    };

    fetchData(); // Fetch initially

    const interval = setInterval(fetchData, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="dashboard">
      <h1> Sensor Dashboard</h1>
      <div className="dashboard-content">
        <LiveMap data={sensorData} />
        <DroneActivityChart data={sensorData} />

        <div className="sensor-data">
          <h2>Latest Sensor Data</h2>
          {loading ? (
            <p className="loading"> Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : sensorData ? (
            <div className="sensor-card">
              <p><strong> Location:</strong> {sensorData.location || "Unknown"}</p>
              <p><strong>Acceleration Factor (AF):</strong> {sensorData.af ? sensorData.af.toFixed(3) : "N/A"}</p>
              <p><strong>Intensity Function (IIF):</strong> {sensorData.iif ? sensorData.iif.toFixed(3) : "N/A"}</p>
              <p><strong>Richter Scale Value:</strong> {sensorData.richter ? sensorData.richter.toFixed(3) : "N/A"}</p>
            </div>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
