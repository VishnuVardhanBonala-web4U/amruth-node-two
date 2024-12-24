import PatientModel from "../models/UserModel.js";

// Create a new patient
const createPatient = async (req, res) => {
  const { name, email, walletBalance } = req.body;

  try {
    const existingPatient = await PatientModel.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const patient = new PatientModel({
      name,
      email,
      walletBalance,
    });

    await patient.save();

    res.status(201).json({
      message: "Patient created successfully.",
      patient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all patients (optional for admin purposes)
const getPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { createPatient, getPatients };
