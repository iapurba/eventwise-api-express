import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import * as routes from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());

// Establish the MongoDB database connection
connectDB();

app.use("/api/auth", routes.authRoutes);
app.use("/api/users", routes.userRoutes);
app.use("/api/events", routes.eventRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express server is running on ${port}`);
});