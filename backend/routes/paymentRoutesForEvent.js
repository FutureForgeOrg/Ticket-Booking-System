import express from "express";
import {
  createEventOrder,
  verifyEventPayment,
  refundEventPayment,
  getAllEventPayments
} from "../controllers/paymentControllerForEvent.js";
import { authenticateToken } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/create-order-for-event", authenticateToken, createEventOrder);
router.post("/verify-payment-for-event", authenticateToken, verifyEventPayment);
router.post("/refund-payment-for-event", authenticateToken, refundEventPayment);
router.get("/all-event-payments", getAllEventPayments);

export default router;