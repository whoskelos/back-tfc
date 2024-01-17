import { Router } from "express";
import {
    createOrder,
    captureOrder,
    cancelPayment,
} from "../controllers/paypal.controller.js";

const router = Router();

router.post("/create-order", createOrder);
router.post("/capture-order", captureOrder);
router.get("/cancel-order", cancelPayment);

export default router;
