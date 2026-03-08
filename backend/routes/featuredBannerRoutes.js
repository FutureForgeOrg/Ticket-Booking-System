import express from "express";
import { getFeaturedBanners } from "../controllers/featuredBannerController.js";

const router = express.Router();

router.get("/", getFeaturedBanners);

export default router;
