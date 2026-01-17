import express from "express"
import { createShow, getAllShows, getShowById, getAllShowsAdmin, updateShow, cancelShow ,getShowsByMovieAndDate} from "../controllers/showController.js"
const router = express.Router();

router.post("/", createShow);
router.get("/admin/all", getAllShowsAdmin);
router.get("/", getAllShows);
router.get("/:id", getShowById);
router.put("/:id", updateShow);
router.put("/cancel/:id", cancelShow);
router.get("/movie/:movieId", getShowsByMovieAndDate);



export default router