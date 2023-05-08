import { Request, Response, NextFunction } from "express";

module.exports = (inputs: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const missingInput = inputs.some(
      (input) => body[input] === undefined || body[input] === ""
    );

    if (missingInput) {
      return res
        .status(400)
        .send(`Error! The following inputs are required: ${inputs.join(", ")}`);
    }

    next();
  };
};
