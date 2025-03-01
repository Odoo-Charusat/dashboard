// // const express = require("express");
// // const cors = require("cors");
// // const mqtt = require("mqtt");
// // require("dotenv").config();

// // const app = express();
// // const PORT = 5000;

// // app.use(cors());
// // app.use(express.json());

// // // MQTT Connection to AWS IoT
// // const mqttBroker = "mqtt://your-aws-endpoint";  // Replace with your AWS IoT broker URL
// // const topic = "esp32/mpu6050"; // MQTT topic for sensor data

// // const client = mqtt.connect(mqttBroker);

// // client.on("connect", () => {
// //   console.log("Connected to AWS IoT Core");
// //   client.subscribe(topic, (err) => {
// //     if (!err) {
// //       console.log(`Subscribed to topic: ${topic}`);
// //     }
// //   });
// // });

// // let latestSensorData = {}; // Store latest sensor data

// // client.on("message", (topic, message) => {
// //   latestSensorData = JSON.parse(message.toString());
// //   console.log(`Received message on ${topic}:`, latestSensorData);
// // });

// // // API Endpoint to send data to frontend
// // app.get("/api/sensor-data", (req, res) => {
// //   res.json(latestSensorData);
// // });

// // // Start Express Server
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });


// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // Dummy sensor data
// const sensorData = [
//   { af: 9.4, iif: 2.8, data_from: "esp32 Threat A" },
//   { af: 8.2, iif: 3.1, data_from: "esp32 Threat B" },
//   { af: 7.5, iif: 2.5, data_from: "esp32 Threat C" },
// ];

// // API endpoint to fetch sensor data
// app.get("/api/sensors", (req, res) => {
//   res.json(sensorData);
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// const express = require("express");
// const dotenv = require("dotenv");
// const { S3Client, GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Initialize S3 Client
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// const BUCKET_NAME = process.env.AWS_S3_BUCKET;

// // Function to Fetch Latest File from S3
// async function fetchLatestFile() {
//   try {
//     // List files in the bucket
//     const listParams = { Bucket: BUCKET_NAME };
//     const fileList = await s3.send(new ListObjectsV2Command(listParams));

//     if (!fileList.Contents || fileList.Contents.length === 0) {
//       console.log("No files found in the S3 bucket.");
//       return;
//     }

//     // Get the latest file
//     const latestFile = fileList.Contents.sort((a, b) => b.LastModified - a.LastModified)[0].Key;

//     console.log("Fetching latest file:", latestFile);

//     // Fetch file content
//     const getParams = { Bucket: BUCKET_NAME, Key: latestFile };
//     const response = await s3.send(new GetObjectCommand(getParams));

//     console.log("File fetched successfully!");

//   } catch (error) {
//     console.error("Error fetching file:", error);
//   }
// }

// // API Route
// app.get("/api/data", (req, res) => {
//   res.send("Welcome to the Earthquake Sensor Dashboard API!");
// });

// // Fetch S3 file on server start
// fetchLatestFile();

// // Start Express Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const { S3Client, GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
// const streamToString = require("stream-to-string"); // Helper function

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors()); // Allow frontend requests

// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// const BUCKET_NAME = process.env.AWS_S3_BUCKET;

// let latestData = null; // Store latest fetched data

// // Function to Fetch Latest File from S3
// async function fetchLatestFile() {
//   try {
//     const listParams = { Bucket: BUCKET_NAME };
//     const fileList = await s3.send(new ListObjectsV2Command(listParams));

//     if (!fileList.Contents || fileList.Contents.length === 0) {
//       console.log("No files found in the S3 bucket.");
//       latestData = { error: "No files found" };
//       return;
//     }

//     const latestFile = fileList.Contents.sort((a, b) => b.LastModified - a.LastModified)[0].Key;
//     console.log("Fetching latest file:", latestFile);

//     const getParams = { Bucket: BUCKET_NAME, Key: latestFile };
//     const response = await s3.send(new GetObjectCommand(getParams));

//     if (!response.Body) {
//       console.error("Empty file response from S3");
//       latestData = { error: "Empty file" };
//       return;
//     }

//     // Convert S3 stream to string
//     const fileContent = await streamToString(response.Body);
//     latestData = JSON.parse(fileContent); // Store JSON data
//     console.log("File fetched successfully!", latestData);
//   } catch (error) {
//     console.error("Error fetching file:", error);
//     latestData = { error: "Error fetching data" };
//   }
// }

// // Route for Frontend to Fetch Data
// app.get("/api/data", (req, res) => {
//   if (!latestData) {
//     return res.status(500).json({ error: "No data available yet" });
//   }
//   res.json(latestData);
// });

// // Fetch Data Every 10s
// setInterval(fetchLatestFile, 10000);

// // Fetch Data on Startup
// fetchLatestFile();

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const { S3Client, GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
// const streamToString = require("stream-to-string");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());

// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// const BUCKET_NAME = process.env.AWS_S3_BUCKET;
// let allFiles = [];
// let currentIndex = 0;
// let latestData = null;

// // 🔹 Function to List All Files in S3
// async function listAllFiles() {
//   try {
//     console.log("⏳ Fetching file list from S3...");
    
//     const fileList = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET_NAME }));

//     if (!fileList.Contents || fileList.Contents.length === 0) {
//       console.log("❌ No files found in the S3 bucket.");
//       latestData = "No files found.";
//       return;
//     }

//     allFiles = fileList.Contents.sort((a, b) => b.LastModified - a.LastModified).map(file => file.Key);
//     console.log(`📂 Found ${allFiles.length} files.`);
//   } catch (error) {
//     console.error("❌ Error listing files:", error);
//   }
// }

// // 🔹 Function to Fetch and Convert Data
// async function fetchNextFile() {
//   try {
//     if (allFiles.length === 0) {
//       console.log("⚠️ No files available to fetch.");
//       return;
//     }

//     const fileKey = allFiles[currentIndex];
//     console.log(`📂 Fetching file: ${fileKey}`);

//     const response = await s3.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: fileKey }));

//     if (!response.Body) {
//       console.error("⚠️ Empty file response from S3");
//       return;
//     }

//     // Convert JSON file to formatted text
//     const fileContent = await streamToString(response.Body);
//     const jsonData = JSON.parse(fileContent);

//     latestData = convertJsonToText(jsonData);

//     // Move to the next file (loop back if at the end)
//     currentIndex = (currentIndex + 1) % allFiles.length;

//     console.log("✅ File processed successfully!");
//   } catch (error) {
//     console.error("❌ Error fetching file:", error);
//   }
// }

// // 🔹 Convert JSON Data to Readable Format
// function convertJsonToText(jsonData) {
//   function formatObject(obj, indent = 0) {
//     let formattedText = "";
//     const spaces = "  ".repeat(indent);

//     for (const [key, value] of Object.entries(obj)) {
//       if (typeof value === "object" && value !== null) {
//         formattedText += `${spaces}${key}:\n${formatObject(value, indent + 1)}`;
//       } else {
//         formattedText += `${spaces}${key}: ${value}\n`;
//       }
//     }

//     return formattedText;
//   }

//   return formatObject(jsonData);
// }

// // 🔹 API Route for Frontend
// app.get("/api/data", (req, res) => {
//   if (!latestData) {
//     return res.status(503).send("Data not available yet, please wait...");
//   }
//   res.send(latestData);
// });

// // 🔹 Start Process
// (async () => {
//   await listAllFiles();
//   await fetchNextFile();

//   setInterval(fetchNextFile, 10000);
//   setInterval(listAllFiles, 300000);
// })();

// // 🔹 Start Express Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });






const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { S3Client, GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const streamToString = require("stream-to-string");
const { NodeHttpHandler } = require("@smithy/node-http-handler"); 
const https = require("https");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const agent = new https.Agent({
  rejectUnauthorized: false, // Ignore self-signed certificate errors
});

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  requestHandler: new NodeHttpHandler({ httpsAgent: agent }),
});

const BUCKET_NAME = "earthquake-sensor"; // Your S3 bucket name
const FOLDER_PREFIX = "data/"; // Folder inside the bucket

let fileList = []; // List of all files in S3
let latestData = null; // Latest fetched file content
let fileIndex = 0; // Tracks which file to fetch next

// Function to Fetch File List from 'data/' Folder
async function fetchFileList() {
  try {
    console.log("⏳ Fetching file list from S3...");
    const listParams = { Bucket: BUCKET_NAME, Prefix: FOLDER_PREFIX };
    const response = await s3.send(new ListObjectsV2Command(listParams));

    if (!response.Contents || response.Contents.length === 0) {
      console.log("❌ No files found in the S3 folder.");
      fileList = [];
      return;
    }

    fileList = response.Contents.map(file => file.Key);
    console.log(`📂 Found ${fileList.length} files.`);
  } catch (error) {
    console.error("❌ Error fetching file list:", error);
    fileList = [];
  }
}

// Function to Fetch Data from a Different File Every 10s
async function fetchNextFile() {
  try {
    if (fileList.length === 0) {
      console.log("⚠️ No files available to fetch.");
      return;
    }

    // Get the next file in sequence (loops back after last file)
    const fileToFetch = fileList[fileIndex];
    console.log("📂 Fetching file:", fileToFetch);

    const getParams = { Bucket: BUCKET_NAME, Key: fileToFetch };
    const response = await s3.send(new GetObjectCommand(getParams));

    if (!response.Body) {
      console.error("❌ Error: Empty file response from S3.");
      latestData = "Empty file";
      return;
    }

    latestData = await streamToString(response.Body);
    console.log(`✅ File ${fileIndex + 1}/${fileList.length} fetched successfully!`);

    // Move to next file, loop back after last file
    fileIndex = (fileIndex + 1) % fileList.length;
  } catch (error) {
    console.error("❌ Error fetching file:", error);
    latestData = `Error: ${error.message}`;
  }
}

// Route to Get File List from 'data/' Folder
app.get("/api/files", (req, res) => {
  res.json({ files: fileList });
});

// Route to Get Latest Fetched File Data
app.get("/api/data", (req, res) => {
  if (!latestData) {
    return res.status(500).send("No data available yet");
  }
  res.send(latestData);
});

// Fetch File List on Startup and Every 10s
fetchFileList().then(() => {
  fetchNextFile();
  setInterval(fetchFileList, 10000);
  setInterval(fetchNextFile, 10000);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
