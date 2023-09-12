import express, { Express, Request, Response } from 'express';
import { AzureBlobManager } from './service/azure/ConnectToBlob';
import { MongoClient } from 'mongodb';
import { syncBlob } from './service/request/ReadFromDB';
import { addToDB } from './service/request/AddToDB';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var mongoClient: MongoClient;
var blobManager: AzureBlobManager;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectToDatabase() {
    const endpoint = process.env.COSMOS_ENDPOINT!;
    mongoClient = new MongoClient(endpoint);
    await mongoClient.connect();
}

async function connectToBlob() {
    const connectionString = process.env.AZURE_BLOB!;
    blobManager = new AzureBlobManager(connectionString);
}

app.get('/', (req: Request, res: Response) => {
    res.send('Server');
});

app.post('/add', async (req: Request, res: Response) => {
    addToDB(req, res, mongoClient);
});

app.post('/sync', async (req: Request, res: Response) => {
    syncBlob(req, res, mongoClient, blobManager);
});

app.listen(port, async () => {
    console.log(`⚡️⚡️⚡️[server]: Server is running at http://localhost:${port}`);
    await connectToDatabase();
    await connectToBlob();
});