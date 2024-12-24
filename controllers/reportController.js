// controllers/reportController.js
import Appointment from "../models/Appointment.js";

export const getDiscountReport = async (req, res) => {
  try {
    const report = await Appointment.find({ discounted: true })
      .populate("patient", "name email")
      .populate("doctor", "name specialization");

    res.status(200).json({ report });
  } catch (error) {
    res.status(500).json({ message: "Error generating report.", error });
  }
};
