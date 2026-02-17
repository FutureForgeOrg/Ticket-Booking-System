import express from "express";
import { createOrder, verifyPayment,refundPayment,getRevenueStats,getAllPayments,getPaymentDetails } from "../controllers/paymentController.js"

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/refund-payment", refundPayment);
router.get("/revenue-stats", getRevenueStats);
router.get("/all-payments", getAllPayments);
router.get("/payment-details/:paymentId", getPaymentDetails);


export default router;
