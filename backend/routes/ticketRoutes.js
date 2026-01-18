import express from 'express';
import {
    bookSeats, cancelTicket, confirmTicket, adminCancelTicket,getAllTickets
} from '../controllers/TicketController.js';

import {authenticateToken} from "../middlewares/authmiddleware.js"
const router = express.Router();

router.post('/book-seats',authenticateToken, bookSeats);
router.post('/cancel-ticket',authenticateToken, cancelTicket);
router.post('/confirm-ticket/:ticketId',authenticateToken, confirmTicket);
router.post('/admin/cancel-ticket', adminCancelTicket)
router.get('/admin/fetchTickets',getAllTickets)
export default router;