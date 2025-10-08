import express from "express";
import { registerClub } from "../controllers/clubController.js";
import upload from "../middleware/multer.js";

const clubRouter = express.Router();

clubRouter.post('/register', upload.single('image'), registerClub);

export default clubRouter;