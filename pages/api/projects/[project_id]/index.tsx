import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../src/database/mongodb/config";
import { Project } from "../../../../src/database/mongodb/Project";

const API_KEY = process.env.API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db();

  const { method, query, headers } = req;
  const { project_id } = query;

  if (method === "PUT") {
    const { body } = req;

    try {
      if (headers.authorization !== API_KEY) throw new Error("Unauthorized");

      const hasProject = await Project.findById(project_id);

      if (!hasProject) throw new Error("Project does not exist");

      const updatedProject = await Project.findByIdAndUpdate(project_id, body, {
        new: true,
      });

      return res.status(200).json({ updatedProject });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  if (method === "GET") {
    try {
      if (headers.authorization !== API_KEY) throw new Error("Unauthorized");

      const hasProject = await Project.findById(project_id);

      if (!hasProject) throw new Error("Project does not exist");

      return res.status(200).json({ hasProject });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  if (method === "DELETE") {
    try {
      if (headers.authorization !== API_KEY) throw new Error("Unauthorized");

      const hasProject = await Project.findByIdAndDelete(project_id);

      if (!hasProject) throw new Error("Project does not exist");

      return res.status(200).json({ hasProject });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}
