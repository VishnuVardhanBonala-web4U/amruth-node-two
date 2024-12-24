import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import appointmentRoutes from "./routes/appointments.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import connectDB from "./config/Db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/patients", patientRoutes); // Patients route
app.use("/api/doctors", doctorRoutes); // Doctors route

// Connect to the Database
connectDB();

// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
