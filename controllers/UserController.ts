import { Router } from "express";
const requiredFields = require("../middlewares/requiredFieldsMiddleware");
const express = require("express");
const router: Router = express.Router();
const { registerClient, registerClinic } = require("../services/UsersService");

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
module.exports = router;
