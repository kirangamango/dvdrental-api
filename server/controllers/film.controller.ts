import { prisma } from "../configs";
import { RequestHandler } from "express";

export const FilmController: {
  getAll: RequestHandler;
} = {
  async getAll(req, res, next) {
    try {
      const films =
        await prisma.$queryRaw`select film_id, title, description, release_year, language_id, rental_duration, rental_rate, rating, length, replacement_cost, special_features, last_update from film`;

      res.json({
        success: true,
        data: films,
      });
    } catch (err) {
      console.error({ err });
      throw new Error("Failed to get films");
    }
  },
};
