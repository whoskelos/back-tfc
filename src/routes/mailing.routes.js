import { Router } from "express";
import { sendEmail } from "../controllers/mailing.controller.js";
const router = Router();

router.post("/mail", sendEmail)

export default router;
