import { Router } from "express";
import { FilmController } from "../controllers/film.controller";

const router = Router();

router.get("/get-all", FilmController.getAll);
router.get("/get-all-films-category", FilmController.getAllFilmsCategory);

export default router;
