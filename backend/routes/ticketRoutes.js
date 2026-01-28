import express from 'express';
import {
    bookSeats, cancelTicket, confirmTicket, adminCancelTicket,getAllTickets,getMyTickets
} from '../controllers/TicketController.js';

import {authenticateToken} from "../middlewares/authmiddleware.js"
const router = express.Router();

router.post('/book-seats',authenticateToken, bookSeats);
router.post('/cancel-ticket',authenticateToken, cancelTicket);
router.post('/confirm-ticket/:ticketId',authenticateToken, confirmTicket);
router.post('/admin/cancel-ticket', adminCancelTicket)
router.get('/admin/fetchTickets',getAllTickets)
router.get('/my-tickets',authenticateToken, getMyTickets)
export default router;