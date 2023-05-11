import { Router } from "express";
const express = require("express");
const router: Router = express.Router();
const {
  getVeterinarianSpecializations,
} = require("../services/VeterinarianSpecializationsService");

router.get("/get-all", async (req, res) => {
  try {
    const vetSpecializations = await getVeterinarianSpecializations();
    res.status(200).json(vetSpecializations);
  } catch (err) {
    console.error(err);
    res.status(err.status ?? 400).json({
      error: err.error ?? "Error!",
      message: err.message ?? "Something went wrong!",
    });
  }
});

module.exports = router;
