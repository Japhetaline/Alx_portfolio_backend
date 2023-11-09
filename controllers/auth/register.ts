import { Request, Response } from "express";
import User from "../../models/User";

export default async function register(req: Request, res: Response) {
  try {
    const { email, firstName, lastName, username, password } = req.body;

    await User.create({
      email,
      firstName,
      lastName,
      username,
      password,
    });
    res.status(200).json({ message: "User created successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
