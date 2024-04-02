import { Prisma } from "@prisma/client";
import { prisma } from "../configs";
import { RequestHandler } from "express";

export const FilmController: {
  getAll: RequestHandler;
} = {
  async getAll(req, res, next) {
    try {
      let { page = "0", limit = "20", isActorNull } = req?.query;

      const pageNo = Number(page);
      const skip = pageNo ? (pageNo - 1) * Number(limit) : Number(limit);

      console.log({ page, limit, pageNo, skip });

      let paginationStr = `offset ${skip} limit ${Number(limit)}`;

      const queryStr =
        isActorNull === "true" ? "where actor_id is null" : undefined;

      const baseQuery = `select * from (select f1.film_id,title,fa1.actor_id,first_name, last_name  from film f1 
        right join film_actor fa1 on f1.film_id = fa1.film_id 
        left join actor a1 on a1.actor_id = fa1.actor_id) ${queryStr} ${paginationStr}`;

      console.log({ isActorNull, queryStr });
      const films: any = await prisma.$queryRaw`${Prisma.raw(baseQuery)}`;

      res.json({
        success: true,
        data: films,
        total: films.length,
      });
    } catch (err) {
      console.error({ err });
      throw new Error("Failed to get films");
    }
  },
};
