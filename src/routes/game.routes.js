import { Router } from "express";
import {
    createGame,
    deleteGameById,
    getGameById,
    getGames,
    updateGame,
} from "../controllers/game.controller.js";
import { upload } from "../config/config.js";

const router = Router();
// prettier-ignore
router.post("/create", upload.fields([{name: 'image', maxCount: 1}]) ,createGame);

router.get("/", getGames);
router.get("/:slug", getGameById);
router.post("/deleteGameById", deleteGameById);
// prettier-ignore
router.patch("/updateGame/:id",upload.fields([{name: 'image', maxCount: 1}]), updateGame)

export default router;
