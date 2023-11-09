import { Request, Response } from "express";
import { findByEmail } from "../../services/auth";

export default async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(user);

    const token = user.getSignedJwtToken();
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
