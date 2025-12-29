import express from "express";

import {
    createCinema,
    addScreenToCinema,
    getAllCinemas,
    getCinemaById,
    deleteCinema,
   
} from "../controllers/cinemaController.js"

const router=express.Router();


//admin
router.post("/",createCinema)
router.post("/:cinemaId/screens",addScreenToCinema)
router.delete("/:id",deleteCinema)

//public
router.get("/",getAllCinemas)
router.get("/:id",getCinemaById)


export default router;