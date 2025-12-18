import express from 'express';
import {
    bookSeats} from '../controllers/bookSeatsAndTicketController.js';

const router = express.Router();

router.post('/book-seats', bookSeats);
export default router;