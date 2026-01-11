import express from 'express';
import {
    bookSeats, cancelTicket, confirmTicket, adminCancelTicket,getAllTickets
} from '../controllers/TicketController.js';

const router = express.Router();

router.post('/book-seats', bookSeats);
router.post('/cancel-ticket', cancelTicket);
router.post('/confirm-ticket/:ticketId', confirmTicket);
router.post('/admin/cancel-ticket', adminCancelTicket)
router.get('/admin/fetchTickets',getAllTickets)
export default router;