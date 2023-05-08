import jwt from "jsonwebtoken";
const dotenv = require("dotenv").config();
const db = require("../models");
import { Request, Response, NextFunction } from "express";

const AUTHMiddleware = (role?: "client" | "clinic") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.sendStatus(401);
    } else {
      try {
        const JWTDecoded = jwt.verify(
          auth.replace("Bearer ", ""),
          process.env.JWT_SECRET
        );
        const userId = JWTDecoded.id;
        const user = userId
          ? await db.User.findOne({
              where: { id: userId },
              include: { model: db.Role, as: "role" },
            })
          : null;

        if (role && user?.role?.name !== role) {
          return res.sendStatus(401);
        }

        if (user) {
          req.locals.user = user.dataValues;
          next();
        } else {
          return res.sendStatus(401);
        }
      } catch (error) {
        console.error("Authorization error:", error);
        return res.status(401).send("Unauthorized: Invalid token");
      }
    }
  };
};

export default AUTHMiddleware;
