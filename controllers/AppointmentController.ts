import { Router } from "express";
import AUTHMiddleware from "../middlewares/AUTHMiddleware";
const express = require("express");
const router: Router = express.Router();
const { createAppointment } = require("../services/AppointmentsService");
const requiredFields = require("../middlewares/requiredFieldsMiddleware");

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

module.exports = router;
