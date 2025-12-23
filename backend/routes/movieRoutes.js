import express from "express";

import upload from "../middlewares/multer.js";
import {
  getAllMovies,
  getMovieById,
  getMoviesByGenre,
  getMoviesByYear,
  createMovie,
  updateMovie,
  deleteMovie,

} from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.get("/genre/:genre", getMoviesByGenre);
router.get("/year/:year", getMoviesByYear);

// Protected route to create a new movie
router.post("/", upload.fields([
  { name: "poster", maxCount: 1 },
  { name: "banner", maxCount: 1 }
]), createMovie);

router.put("/:id", upload.fields([
  { name: "poster", maxCount: 1 },
  { name: "banner", maxCount: 1 }
]), updateMovie);
router.delete("/:id", deleteMovie);
export default router;
