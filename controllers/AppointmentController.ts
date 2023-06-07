import { Router } from "express";
import AUTHMiddleware from "../middlewares/AUTHMiddleware";
const express = require("express");
const router: Router = express.Router();
const { createAppointment } = require("../services/AppointmentsService");
const { getAppointments } = require("../services/AppointmentsService");
const { getAppointmentsByMedicId } = require("../services/AppointmentsService");
const requiredFields = require("../middlewares/requiredFieldsMiddleware");
const { cancelAppointment } = require("../services/AppointmentsService");
const { fulfillAppointment } = require("../services/AppointmentsService");
const { unfulfillAppointment } = require("../services/AppointmentsService");
router.post(
  "/create-appointment",
  AUTHMiddleware("client"),
  requiredFields([
    "animalId",
    "veterinarianId",
    "date",
    "slot",
    "description",
    "animalAge",
  ]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const appointment = await createAppointment(userId, req.body);

      res.status(200).json(appointment);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.get(
  "/appointments/:clientId",
  AUTHMiddleware("client"),
  async (req, res) => {
    try {
      const clientId = req.params.clientId;

      const appointments = await getAppointments(clientId);
      res.status(200).json(appointments);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.get(
  "/cancel-appointment/:appointmentId",
  AUTHMiddleware("client"),
  async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;
      const appointmentToCancel = await cancelAppointment(appointmentId);
      res.status(200).json(appointmentToCancel);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.get(
  "/medics-appointments/:medicId",
  AUTHMiddleware("clinic"),
  async (req, res) => {
    try {
      const medicId = req.params.medicId;
      const prevAppointments = await getAppointmentsByMedicId(medicId);
      res.status(200).json(prevAppointments);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.get(
  "/fulfill-appointment/:appointmentId",
  AUTHMiddleware("clinic"),
  async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;
      const appointmentToFullfillOrUnfulfill = await fulfillAppointment(
        appointmentId
      );
      res.status(200).json(appointmentToFullfillOrUnfulfill);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.get(
  "/unfulfill-appointment/:appointmentId",
  AUTHMiddleware("clinic"),
  async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;
      const appointmentToUnfullfillOrUnfulfill = await unfulfillAppointment(
        appointmentId
      );
      res.status(200).json(appointmentToUnfullfillOrUnfulfill);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

module.exports = router;
