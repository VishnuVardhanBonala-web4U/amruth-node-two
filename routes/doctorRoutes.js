import express from "express";
import { createDoctor, getDoctors } from "../controllers/DoctorController.js";

const router = express.Router();

// POST route to create a doctor
router.post("/create-doctors", createDoctor);

// GET route to fetch all doctors (optional for admin purposes)
router.get("/all-doctors", getDoctors);

export default router;
