// import React from "react";
// import "./Alerts.css";

// const Alerts: React.FC = () => {
//   return (
//     <div className="alerts">
//       <h1>Alerts</h1>
//       <div className="alerts-content">
//         <div>
//           <h2>Recent Alerts</h2>
//           <p>No new alerts at the moment.</p>
//         </div>
//         <div>
//           <h2>Alert History</h2>
//           <p>View past alerts and their resolutions.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Alerts;


//the below code is working good
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Alerts.css";

// const Alerts: React.FC = () => {
//   const [sensorData, setSensorData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/data");
//         setSensorData(response.data);
//         setLoading(false);
//         setError(null); // Reset error on successful fetch
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//         setError("Failed to load data. Please try again.");
//       }
//     };

//     fetchData(); // Fetch initially

//     const interval = setInterval(fetchData, 10000); // Fetch every 10 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="alerts">
//       <h1>Alerts</h1>
//       <div className="alerts-content">
//         <div>
//           <h2>Recent Alerts</h2>
//           {loading ? (
//             <p className="loading">Loading...</p>
//           ) : error ? (
//             <p className="error">{error}</p>
//           ) : sensorData && sensorData.iif > 2 ? (
//             <p className="alert-warning">
//               🚨 **Alert:** High Intensity Factor Detected! (IIF = {sensorData.iif.toFixed(3)})
//             </p>
//           ) : (
//             <p>No new alerts at the moment.</p>
//           )}
//         </div>

//         <div>
//           <h2>Alert History</h2>
//           <p>View past alerts and their resolutions.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Alerts;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Alerts.css";

interface SensorData {
  iif: number;
  location: string;
  timestamp?: string; // Optional timestamp
  smsSent?: boolean;  // 🔹 NEW: Track if SMS was sent
}

const Alerts: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [alertHistory, setAlertHistory] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 🔹 Load alert history from localStorage
    const storedAlerts = localStorage.getItem("alertHistory");
    if (storedAlerts) {
      setAlertHistory(JSON.parse(storedAlerts));
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        const newData: SensorData = {
          iif: response.data.iif,
          location: response.data.location || "Unknown",
          timestamp: new Date().toLocaleString(),
          smsSent: response.data.smsSent || false, // 🔹 Check if SMS was sent
        };

        setSensorData(newData);
        setLoading(false);
        setError(null);

        // 🚨 If IIF is high and not already in history, add it
        if (newData.iif > 2) {
          const lastAlert = alertHistory[0]; // Get most recent alert

          if (!lastAlert || lastAlert.iif !== newData.iif) {
            const updatedHistory = [newData, ...alertHistory].slice(0, 5); // Keep last 5 alerts
            setAlertHistory(updatedHistory);
            localStorage.setItem("alertHistory", JSON.stringify(updatedHistory));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError("Failed to load data. Please try again.");
      }
    };

    fetchData(); // Fetch initially
    const interval = setInterval(fetchData, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [alertHistory]);

  return (
    <div className="alerts">
      <h1>Alerts</h1>
      <div className="alerts-content">
        <div>
          <h2>Recent Alerts</h2>
          {loading ? (
            <p className="loading">Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : sensorData && sensorData.iif > 2 ? (
            <p className="alert-warning">
              🚨 <strong>Alert:</strong> High Intensity Factor Detected! <br />
              <strong>IIF:</strong> {sensorData.iif.toFixed(3)} <br />
              <strong>Location:</strong> {sensorData.location} <br />
              <strong>Time:</strong> {sensorData.timestamp} <br />
              {sensorData.smsSent ? <span className="sms-confirmation">📲 SMS Sent ✅</span> : null}
            </p>
          ) : (
            <p>No new alerts at the moment.</p>
          )}
        </div>

        <div>
          <h2>Alert History</h2>
          {alertHistory.length > 0 ? (
            <ul className="alert-history">
              {alertHistory.map((alert, index) => (
                <li key={index}>
                  🛑 <strong>{alert.timestamp}</strong> - IIF {alert.iif.toFixed(3)} at {alert.location}
                </li>
              ))}
            </ul>
          ) : (
            <p>No past alerts.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
