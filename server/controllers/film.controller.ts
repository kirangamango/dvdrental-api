import { Prisma } from "@prisma/client";
import { prisma } from "../configs";
import { RequestHandler } from "express";

export const FilmController: {
  getAll: RequestHandler;
  getAllFilmsCategory: RequestHandler;
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

      const countQuery = `select count(*) from (select f1.film_id,title,fa1.actor_id,first_name, last_name  from film f1 
        right join film_actor fa1 on f1.film_id = fa1.film_id 
        left join actor a1 on a1.actor_id = fa1.actor_id) ${queryStr}`;

      console.log({ isActorNull, queryStr });
      const films: any = await prisma.$queryRaw`${Prisma.raw(baseQuery)}`;
      const filmsTotal: any = await prisma.$queryRaw`${Prisma.raw(countQuery)}`;
      const totalCount = Number(filmsTotal[0]["count"]);
      console.log({ filmsTotal });
      res.json({
        success: true,
        data: films,
        pagination: {
          total: totalCount,
          page: Number(page),
          limit: Number(limit),
        },
      });
    } catch (err) {
      console.error({ err });
      throw new Error("Failed to get films");
    }
  },
  async getAllFilmsCategory(req, res, next) {
    try {
      const filmsCategory: any =
        await prisma.$queryRaw`select name,count(f1.film_id) as filmCount from film f1, 
        (select name, c1.category_id, film_id from film_category fc1, category c1 where fc1.category_id = c1.category_id) as r1 
        where r1.film_id = f1.film_id group by name`;

      filmsCategory.forEach((item: any) => {
        item.filmcount = Number(item.filmcount);
      });

      console.log("fillms category", filmsCategory);

      res.json({
        success: true,
        data: filmsCategory,
        total: filmsCategory.length,
      });
    } catch (err) {
      console.log({ err });
      throw new Error("Failed to fetch all films category");
    }
  },
};
