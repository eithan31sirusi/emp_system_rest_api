import express from "express"
import dotenv from "dotenv"
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './database/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js"

dotenv.config();
connectDB()
const app = express();
app.use(express.json())

// routes 
app.use('/api/employees', employeeRoutes)
app.use('/api/users', userRoutes)
app.use("/api/upload", uploadRoutes)

// catch errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));