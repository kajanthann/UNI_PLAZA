import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoute.js';
import clubRouter from './routes/clubRoute.js';
import cookieParser from 'cookie-parser';
import cleanupUnverifiedUsers from './cron/cleanup.js';

// app config
const app = express();
const port = process.env.PORT || 5000;

connectDB();
// connectCloudinary();
cleanupUnverifiedUsers(); 

// middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5174", 
  credentials: true, 
}));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/club', clubRouter);

// listener
app.listen(port, () => console.log(`Server Listening on localhost:${port}`));
