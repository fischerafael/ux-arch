import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../src/database/mongodb/config";
import { User } from "../../../src/database/mongodb/User";

const API_KEY = process.env.API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db();

  const { method, headers } = req;

  if (method === "POST") {
    const { user_firebase, user_name, user_avatar, user_email } = req.body;

    try {
      if (headers.authorization !== API_KEY) throw new Error("Unauthorized");

      const hasFirebaseUser = await User.findOne({ user_firebase });

      if (hasFirebaseUser) throw new Error("Firebase user already exists");

      const hasEmail = await User.findOne({ user_email });

      if (hasEmail) throw new Error("Email already exists");

      const createdUser = await User.create({
        user_firebase,
        user_name,
        user_avatar,
        user_email,
      });

      return res.status(201).json({ createdUser });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  if (method === "GET") {
    try {
      if (headers.authorization !== API_KEY) throw new Error("Unauthorized");

      const users = await User.find();

      return res.status(200).json({ users });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}
