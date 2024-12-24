import express from "express";
import { createAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

// POST route to create an appointment
router.post("/create", createAppointment);

export default router;
