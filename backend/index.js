import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import cinemaRoutes from './routes/cinemaRoutes.js'
import showRoutes from './routes/showRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import connectDB from './config/db.js';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());


app.use(express.json());

// connect to db
connectDB();



app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/cinemas', cinemaRoutes);
app.use('/api/shows',showRoutes)
app.use('/api/tickets',ticketRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
