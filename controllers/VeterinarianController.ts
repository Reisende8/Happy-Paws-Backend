import { Router } from "express";
const express = require("express");
const router: Router = express.Router();
import AUTHMiddleware from "../middlewares/AUTHMiddleware";
const requiredFields = require("../middlewares/requiredFieldsMiddleware");
const {
  createMedic,
  editMedic,
  deleteMedic,
  getMedics,
} = require("../services/VeterinariansService");

router.post(
  "/create-medic",
  AUTHMiddleware("clinic"),
  requiredFields([
    "firstName",
    "lastName",
    "estimatedPrice",
    "specializationId",
    "animalIds",
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

router.put(
  "/medics/:medicId",
  AUTHMiddleware("clinic"),
  requiredFields(["firstName", "lastName", "estimatedPrice", "animalIds"]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const medicId = req.params.medicId;

      const updatedMedic = await editMedic(userId, medicId, req.body);
      res.status(200).json(updatedMedic);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.delete(
  "/delete-medic/:medicId",
  AUTHMiddleware("clinic"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const medicId = req.params.medicId;

      const medicToDeleteResult = await deleteMedic(userId, medicId);
      res.status(200).json(medicToDeleteResult);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.post("/get-medics", AUTHMiddleware(), async (req, res) => {
  try {
    const medics = await getMedics(req.body);
    res.status(200).json(medics);
  } catch (err) {
    console.error(err);
    res.status(err.status ?? 400).json({
      error: err.error ?? "Error!",
      message: err.message ?? "Something went wrong!",
    });
  }
});

module.exports = router;
