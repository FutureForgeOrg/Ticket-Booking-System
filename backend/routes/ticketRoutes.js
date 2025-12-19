import express from 'express';
import {
    bookSeats,cancelTicket,confirmTicket} from '../controllers/bookSeatsAndTicketController.js';

const router = express.Router();

router.post('/book-seats', bookSeats);
router.post('/cancel-ticket',cancelTicket);
router.post('/confirm-ticket/:ticketId',confirmTicket);
export default router;