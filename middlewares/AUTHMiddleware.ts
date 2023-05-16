import jwt from "jsonwebtoken";
const dotenv = require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const AUTHMiddleware = (role: "client" | "clinic") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    const roleID = role === "client" ? 0 : 1;

    if (!auth) {
      return res.sendStatus(401);
    } else {
      try {
        const JWTDecoded = jwt.verify(
          auth.replace("Bearer ", ""),
          process.env.JWT_SECRET
        );

        const userId = JWTDecoded.userId;
        const roleId = JWTDecoded.roleId;

        const user = userId
          ? await User.findOne({
              where: { id: userId, roleId: roleId },
            })
          : null;

        if (roleID && user?.roleId !== roleID) {
          return res.sendStatus(403);
        }

        if (user) {
          req.user = user.dataValues;
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
