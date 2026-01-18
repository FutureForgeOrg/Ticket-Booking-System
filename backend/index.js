import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import cinemaRoutes from "./routes/cinemaRoutes.js";
import showRoutes from "./routes/showRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import movieLikeRoutes from "./routes/movieLikeRoutes.js";
import paymentRoutes from './routes/paymentRoutes.js'
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    // origin: process.env.FRONTEND_URL || "http://localhost:5173" ,
     origin:["http://localhost:5173", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS",],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// connect to db
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/cinemas", cinemaRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/movieLikes", movieLikeRoutes);
app.use("/api/payment",paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
