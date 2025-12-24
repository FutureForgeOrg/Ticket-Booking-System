import express from "express"
import { toggleLikeMovie, getLikeStatus } from "../controllers/movieLikeController.js"


const router = express.Router()

router.post("/like/:movieId", toggleLikeMovie)
router.get("/like-status/:movieId", getLikeStatus)

export default router;