import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Establish the MongoDB database connection
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express server is running on ${port}`);
});