import DoctorModel from "../models/DoctorModel.js";

// Create a new doctor
const createDoctor = async (req, res) => {
  const { name, specialization } = req.body;

  try {
    const doctor = new DoctorModel({
      name,
      specialization,
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor created successfully.",
      doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all doctors (optional for listing doctors)
const getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { createDoctor, getDoctors };
