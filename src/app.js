import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import * as routes from './routes/index.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for your React app's origin
app.use(cors({ origin: 'http://localhost:3000' }));

// Establish the MongoDB database connection
connectDB();

// User APIs
app.use('/api/auth', routes.authRoutes);
app.use('/api/users', routes.userRoutes);
app.use('/api/events', routes.eventRoutes);
app.use('/api/tickets', routes.ticketRoutes);
app.use('/api', routes.bookingRoutes);

// Publisher APIs
app.use('/api/auth/publishers', routes.publisherAuthRoutes);
app.use('/api/publishers/events', routes.publisherEventRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express server is running on ${port}`);
});