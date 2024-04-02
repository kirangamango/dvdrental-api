import { prisma } from "../configs";
import { RequestHandler } from "express";

export const ActorController: {
  getAll: RequestHandler;
} = {
  async getAll(req, res, next) {
    try {
      const first_name = "Penelope";
      const actors =
        await prisma.$queryRaw`select * from actor where first_name = ${first_name} order by last_name`;

      res.json({
        success: true,
        data: actors,
      });
    } catch (err) {
      throw new Error("Failed to get actors");
    }
  },
};
