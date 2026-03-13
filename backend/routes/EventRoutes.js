import express from 'express';
import { createEvent, updateEvent, getAllEvents, getTrendingEvents, getSingleEvent, getEventBookingById, cancelEventBooking, bookEventSeats, confirmEventBooking, getMyEventBookings } from '../controllers/eventController.js';
import upload from '../middlewares/multer.js';
import { authenticateToken } from '../middlewares/authmiddleware.js';
const router = express.Router();

router.post("/", upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "banner", maxCount: 1 }
]), createEvent);

router.put("/:id", upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "banner", maxCount: 1 }
]), updateEvent);

router.get("/", getAllEvents);
router.get("/trending", getTrendingEvents);
router.get("/my-bookings", authenticateToken, getMyEventBookings);
router.get("/bookings/:id", authenticateToken, getEventBookingById);
router.get("/:id", getSingleEvent);
router.post("/book", authenticateToken, bookEventSeats);
router.post("/confirm/:bookingId", authenticateToken, confirmEventBooking);
router.put("/cancel/:id", cancelEventBooking);
router.get("/my-bookings", authenticateToken, getMyEventBookings);

export default router;