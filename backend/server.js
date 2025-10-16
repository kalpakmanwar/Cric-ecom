const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");
const cloudinary = require("cloudinary");

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Load Environment Variables First
dotenv.config({ path: "./config/config.env" });

// Connect With MongoDB
console.log("MONGO_URI from env:", process.env.MONGO_URI);  // Debugging
connectDB();

// Connect with Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => process.exit(1));
});
