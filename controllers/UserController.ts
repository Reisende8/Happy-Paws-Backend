import { Router } from "express";
const requiredFields = require("../middlewares/requiredFieldsMiddleware");
const express = require("express");
const router: Router = express.Router();
const {
  registerClient,
  registerClinic,
  activateEmail,
  logIn,
} = require("../services/UsersService");

router.post(
  "/register-client",
  requiredFields([
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "password",
    "repeatPassword",
  ]),
  async (req, res) => {
    try {
      const newClient = await registerClient(req.body);
      res.status(200).json(newClient);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.post(
  "/register-clinic",
  requiredFields([
    "name",
    "address",
    "phoneNumber",
    "email",
    "password",
    "repeatPassword",
  ]),
  async (req, res) => {
    try {
      const newClinic = await registerClinic(req.body);
      res.status(200).json(newClinic);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.get("/validate-email/:email/:token", async (req, res) => {
  try {
    const token = await activateEmail(req.params.email, req.params.token);

    res.status(200).json(token);
  } catch (err) {
    console.error("Error while validating email: ", err);
    res.status(400).json({
      error: "Error!",
      message: " Could not validate this email!",
    });
  }
});

router.post(
  "/login",
  requiredFields(["email", "password"]),
  async (req, res) => {
    try {
      const token = await logIn(req.body);
      res.status(200).json(token);
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
