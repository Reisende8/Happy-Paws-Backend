import { Router } from "express";
import Appointment from "../models/Appointment";
const express = require("express");
const router: Router = express.Router();

router.post("/create-dummy-appointment", async (req, res) => {
  try {
    //////////////////////////move to appointments service
    const appointment = await Appointment.create({
      animalId: "0",
      clientId: "944c1494-0bf3-4340-a393-149560c1194e",
      veterinarianId: "0ecc16e4-7fcc-40e3-a869-e14c102dbb8c",
      date: new Date("2023-06-03"),
      slot: 2,
      description: "Some description",
      status: "pending",
      animalAge: 4,
    });

    ///////////////////////
    res.status(200).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(err.status ?? 400).json({
      error: err.error ?? "Error!",
      message: err.message ?? "Something went wrong!",
    });
  }
});

module.exports = router;
