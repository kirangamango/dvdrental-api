import { Router } from "express";
import { FilmController } from "../controllers/film.controller";

const router = Router();

router.get("/get-all", FilmController.getAll);

export default router;
