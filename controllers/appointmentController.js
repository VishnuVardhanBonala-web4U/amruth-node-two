
import AppointmentModel from "../models/AppointmentModel.js";
import DoctorModel from "../models/DoctorModel.js";
import PatientModel from "../models/UserModel.js";

export const createAppointment = async (req, res) => {
  const { patientId, doctorId, date } = req.body;

  try {
    // Validate the patient and doctor
    const patient = await PatientModel.findById(patientId);
    const doctor = await DoctorModel.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(404).json({ message: "Patient or Doctor not found" });
    }

    // Check if the patient has already used the discount with the doctor
    const existingAppointment = await AppointmentModel.findOne({
      patient: patientId,
      doctor: doctorId,
    });
    if (existingAppointment && existingAppointment.discounted) {
      return res
        .status(400)
        .json({
          message: "Discount already used for this doctor-patient pair.",
        });
    }

    // Calculate discount for first-time consultation (assuming 20% discount)
    const discountAmount =
      patient.walletBalance >= 100 ? 100 : patient.walletBalance;

    // Deduct from wallet
    patient.walletBalance -= discountAmount;
    await patient.save();

    // Create new appointment
    const appointment = new AppointmentModel({
      patient: patientId,
      doctor: doctorId,
      date,
      discounted: true,
      discountAmount,
      transactionDetails: { paymentStatus: "Success" },
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully.",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


