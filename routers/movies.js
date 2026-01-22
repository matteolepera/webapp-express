import express from "express";
import movieController from "../controllers/movieController.js"

const router = express.Router();

//INDEX
router.get("/", movieController.index)
//SHOW
router.get("/:id", movieController.show)
//STORE
router.post("/:id/reviews", movieController.storeReview)

export default router;