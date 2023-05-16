import { Request, Response, NextFunction } from "express";

module.exports = (inputs: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const missingInput = inputs.some((input) => {
      const inputValue = body[input];

      if (Array.isArray(inputValue) && inputValue.length === 0) {
        return true;
      }

      return inputValue === undefined || inputValue === "";
    });

    if (missingInput) {
      return res.status(400).json({
        error: "Error! Inputs are required!",
        message: `The following inputs are required: ${inputs.join(", ")}`,
      });
    }

    next();
  };
};
