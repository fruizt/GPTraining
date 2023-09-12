import { Request, Response } from "express";
import { AzureBlobManager } from "../azure/ConnectToBlob";
import { MongoClient } from "mongodb";

export async function syncBlob(req: Request, res: Response, client: MongoClient, blobManager: AzureBlobManager) {
    try {
        const database = client.db("Documentation");
        const collection = database.collection("Documentation");
        const result = await collection.find({}, { projection: { _id: 0 } }).toArray();
        await blobManager.uploadToAzure(result);
        res.status(200).json({ message: "Good request", result });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad request" });
    }
}
