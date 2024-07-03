import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import "express-async-errors";
import { errorHandler } from './errors/errorMiddleware';
import mongoose from 'mongoose';
import { domainRoutes } from './routes/domainRoutes';
import { scheduleCronJobs } from './services/cronService';

const app = express();
const port = 3000;

const mongoUrl = process.env.MONGO_URI as string;
mongoose.connect(mongoUrl)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api', domainRoutes);

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  scheduleCronJobs();
});
