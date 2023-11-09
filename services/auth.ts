import User from "../models/User";

export async function findUserByEmail(email: string) {
  return User.findOne({ email });
}

export async function findByEmail(email: string) {
  return User.findOne({ email }).select("+password");
}
