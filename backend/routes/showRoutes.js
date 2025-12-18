import express from "express"
import {createShow}  from "../controllers/createShowController.js"
const router=express.Router();

router.post("/",createShow)

export default router