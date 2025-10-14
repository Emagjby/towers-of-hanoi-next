import type { NextApiRequest, NextApiResponse } from "next";
import { HanoiController } from "@/controllers/HanoiController";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { diskCount, from, to } = req.query;

  if (!diskCount || !from || !to) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const controller = new HanoiController();
  const overseer = controller.initializeHanoi(
    Number(diskCount),
    Number(from),
    Number(to)
  );

  return res.status(200).json({
    snapshots: overseer.snapshots,
  });
}
