import express from "express";
import { newEvents, AllNewEvents, AllOldEvents, All_ATZ_Events, All_ZTA_Events, searchEvents } from "../controllers/eventController.js";

const homePageRoute = express.Router();

homePageRoute.get('/newest-events', newEvents);
homePageRoute.get('/all-new-events', AllNewEvents);
homePageRoute.get('/all-old-events', AllOldEvents);
homePageRoute.get('/all-ATZ-events', All_ATZ_Events);
homePageRoute.get('/all-ZTA-events', All_ZTA_Events);
homePageRoute.get('/search', searchEvents);

export default homePageRoute;