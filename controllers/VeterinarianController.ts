import { Router } from "express";
const express = require("express");
const router: Router = express.Router();
import AUTHMiddleware from "../middlewares/AUTHMiddleware";
const requiredFields = require("../middlewares/requiredFieldsMiddleware");
const { createMedic } = require("../services/VeterinariansService");

router.post(
  "/create-medic",
  AUTHMiddleware("clinic"),
  requiredFields([
    "firstName",
    "lastName",
    "estimatedPrice",
    "specializationId",
  ]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const newMedic = await createMedic(userId, req.body);
      res.status(200).json(newMedic);
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
