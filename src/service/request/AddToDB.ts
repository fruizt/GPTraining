import { Request, Response } from "express";
import { MongoClient } from "mongodb";

export async function addToDB(req: Request, res: Response, client: MongoClient) {
    try {
        const { tag, subTag, resource } = req.body;
        const database = client.db("Documentation");
        const collection = database.collection("Documentation");
        const result = await collection.insertOne({ tag: tag.toUpperCase(), subTag, resource });
        res.status(200).json({ message: "Good request", result });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Bad request" });
    }
}