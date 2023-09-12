import express, { Express, Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { run } from './service/connectionToDb';
import dotenv from 'dotenv';
import cors from 'cors';
import { addToDB } from './service/request/addToDB';
import { readFromDB } from './service/request/readFromDB';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var mongoClient: MongoClient;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectToDatabase() {
    const endpoint = process.env.COSMOS_ENDPOINT!;
    mongoClient = new MongoClient(endpoint);
    await mongoClient.connect();
}

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.post('/add', async (req: Request, res: Response) => {
    addToDB(req, res, mongoClient);
});

app.get('/read', async (req: Request, res: Response) => {
    readFromDB(req, res, mongoClient);
});

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    await connectToDatabase();
});