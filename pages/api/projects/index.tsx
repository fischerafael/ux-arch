import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../src/database/mongodb/config";
import { Project } from "../../../src/database/mongodb/Project";

const API_KEY = process.env.API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db();

  const { method, query, headers } = req;

  if (method === "POST") {
    const { body } = req;
    // const { user_firebase, user_name, user_avatar, user_email } = req.body;

    try {
      if (headers.authorization !== API_KEY) throw new Error("Unauthorized");

      const createdProject = await Project.create(body);

      return res.status(201).json({ createdProject });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  if (method === "GET") {
    const { user_id, project_type } = query;

    try {
      if (headers.authorization !== API_KEY) throw new Error("Unauthorized");

      if (!user_id && !project_type) {
        const projects = await Project.find();

        return res.status(200).json({ projects });
      }

      if (!project_type) {
        const projectsOfAUser = await Project.find({ user_id });

        return res.status(200).json({ projectsOfAUser });
      }

      const projectsOfAUserByType = await Project.find({ user_id }).where({
        project_type,
      });

      return res.status(200).json({ projectsOfAUserByType });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}
