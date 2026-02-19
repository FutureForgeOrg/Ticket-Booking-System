import express from 'express';
import { createEvent, updateEvent, getAllEvents, getSingleEvent, bookEvent, cancelEventBooking } from '../controllers/eventController.js';
import upload from '../middlewares/multer.js';
import { authenticateToken } from '../middlewares/authmiddleware.js';
const router = express.Router();

router.post("/", upload.single("image"), createEvent);
router.put("/:id", upload.single("image"), updateEvent);
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);
router.post("/book", authenticateToken, bookEvent);
router.put("/cancel/:id", cancelEventBooking);

export default router;