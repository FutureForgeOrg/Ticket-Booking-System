import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import cinemaRoutes from './routes/cinemaRoutes.js'
import showRoutes from './routes/showRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import movieLikeRoutes from './routes/movieLikeRoutes.js'
import connectDB from './config/db.js';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());


app.use(express.json());

// connect to db
connectDB();

//seed cinema data
// const seedCinemas = async () => {
//     try {
//         const count = await Cinema.countDocuments();
//         if (count === 0) {
//             await Cinema.insertMany(cinemaData);
//             console.log("Cinema data seeded");
//         }

//     } catch (error) {
//         console.log("Error seeding cinema data:", error.message);
//     }
// };

// seedCinemas();




app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/cinemas', cinemaRoutes);
app.use('/api/shows', showRoutes)
app.use('/api/tickets', ticketRoutes)
app.use('/api/movieLikes', movieLikeRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
