import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from "./Routes/financial-records";

const app: Express = express();
const port = process.env.PORT || 3003;

app.use(express.json());

const mongoURI: string = "mongodb+srv://saidvagap:yZfKWCjYdMVaE1Lh@trackerfinance.izstklk.mongodb.net/";

mongoose.connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB!"))
    .catch((err) => {
        console.error("Failed to Connect to MongoDB:", err);
        process.exit(1);  // Exit the process with failure
    });

// Add a simple route to check if the server is running
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

// Use the financial records router
app.use("/financial-records", financialRecordRouter);

// Add error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});

server.on('error', (err) => {
    console.error(`Failed to start server on port ${port}:`, err);
    process.exit(1);  // Exit the process with failure
});
