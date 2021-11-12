import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../src/database/mongodb/config";
import { User } from "../../../../src/database/mongodb/User";

const API_KEY = process.env.API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db();

  const { method } = req;

  if (method === "GET") {
    const { query, headers } = req;

    const { user_id } = query;

    try {
      if (headers.authorization !== API_KEY) throw new Error("Unauthorized");

      const user = await User.findById(user_id);

      if (!user) throw new Error("User does not exist");

      return res.status(200).json({ user });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}
