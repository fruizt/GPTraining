import express, { Express, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { run } from './service/connectionToDb';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectToDatabase() {
    const endpoint = process.env.COSMOS_ENDPOINT!;
    const mongo = new MongoClient(endpoint);
    await mongo.connect();
    await run(mongo);
}

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    connectToDatabase();
});