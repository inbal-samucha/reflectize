import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import "express-async-errors";
import { errorHandler } from './errors/errorMiddleware';
import mongoose, { ConnectOptions } from 'mongoose';
import { domainRoutes } from './routes/domainRoutes';
import { scheduleCronJobs } from './services/cronService';

const app = express();
const port = 3000;

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@cluster0.h9gabes.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
const mongoUrl = process.env.MONGO_URI as string;
// const mongoUrl = `mongodb://reflectiz-mongodb:27017/${process.env.MONGO_DB_NAME}`;
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
