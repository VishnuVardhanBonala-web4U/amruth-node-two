import express from "express";
import {
  createPatient,
  getPatients,
} from "../controllers/patientController.js";

const router = express.Router();

// POST route to create a patient
router.post("/create-patient", createPatient);

// GET route to fetch all patients (admin only)
router.get("/all-patients", getPatients);

export default router;
