import { Router } from "express";
import { ActorController } from "../controllers/actor.controller";

const router = Router();

router.get("/get-all", ActorController.getAll);

export default router;
