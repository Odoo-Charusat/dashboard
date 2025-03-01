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


import React, { useEffect, useState } from "react";
import "./Alerts.css";

const Alerts: React.FC = () => {
  const [iifFactor, setIifFactor] = useState<number | null>(null);

  useEffect(() => {
    const fetchIifFactor = async () => {
      try {
        const response = await fetch("https://your-s3-bucket-url/path/to/iif-factor.json");
        if (!response.ok) throw new Error("Failed to fetch IIF factor");
        
        const data = await response.json();
        setIifFactor(data.iifFactor); // Assuming JSON structure { "iifFactor": 5 }
      } catch (error) {
        console.error("Error fetching IIF factor:", error);
      }
    };

    fetchIifFactor();
  }, []);

  return (
    <div className="alerts">
      <h1>Alerts</h1>
      <div className="alerts-content">
        <div>
          <h2>Recent Alerts</h2>
          {iifFactor !== null ? (
            iifFactor > 1.5? (
              <p className="alert-warning">High IIF Factor Detected: {iifFactor}</p>
            ) : (
              <p>No new alerts at the moment.</p>
            )
          ) : (
            <p>Loading....</p>
          )}
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
