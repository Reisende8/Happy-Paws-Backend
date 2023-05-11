import { Router } from "express";
const express = require("express");
const router: Router = express.Router();
const { getAnimals } = require("../services/AnimalsService");

router.get("/get-all", async (req, res) => {
  try {
    const animals = await getAnimals();
    res.status(200).json(animals);
  } catch (err) {
    console.error(err);
    res.status(err.status ?? 400).json({
      error: err.error ?? "Error!",
      message: err.message ?? "Something went wrong!",
    });
  }
});

module.exports = router;
