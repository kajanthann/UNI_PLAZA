import cron from "node-cron";
import userModel from "../models/userModel.js";

// Run cleanup every day at midnight
const cleanupUnverifiedUsers = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const result = await userModel.deleteMany({
        isVerified: false,
        createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } // older than 24h
      });

      if (result.deletedCount > 0) {
        console.log(`Cleaned up ${result.deletedCount} unverified users`);
      }
    } catch (error) {
      console.error("Error cleaning unverified users:", error.message);
    }
  });
};

export default cleanupUnverifiedUsers;
