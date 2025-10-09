import express from "express";
import { addEvent, clubLogin, registerClub, verifyOtp } from "../controllers/clubController.js";
import upload from "../middleware/multer.js";
import authClub from "../middleware/authClub.js";

const clubRouter = express.Router();

clubRouter.post('/register', upload.single('image'), registerClub);
clubRouter.post('/verify-otp',verifyOtp);
clubRouter.post('/login', clubLogin)

clubRouter.use('/add-event', authClub ,upload.single('image'), addEvent)
export default clubRouter;