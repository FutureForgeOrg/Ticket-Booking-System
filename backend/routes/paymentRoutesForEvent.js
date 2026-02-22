import express from "express";
import {
  createEventOrder,
  verifyEventPayment,
} from "../controllers/paymentControllerForEvent.js";
import { authenticateToken } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/create-order-for-event", authenticateToken, createEventOrder);
router.post("/verify-payment-for-event", authenticateToken, verifyEventPayment);

export default router;