import { MongoClient } from "mongodb";

export async function run(client: MongoClient) {
    try {
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");
        const query = { title: "Back to the Future" };
        const movie = await movies.findOne(query);
        console.log(movie);
    } catch (error) {
        console.log(error);
    }
}