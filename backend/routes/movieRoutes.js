import express from "express";

import upload from "../middlewares/multer.js";
import {
  getAllMovies,
  getMovieById,
  getMoviesByGenre,
  getMoviesByYear,
  createMovie,
 
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.get("/genre/:genre", getMoviesByGenre);
router.get("/year/:year", getMoviesByYear);

// Protected route to create a new movie
router.post("/",upload.single("poster"), createMovie);
export default router;
