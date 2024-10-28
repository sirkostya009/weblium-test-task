import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.MONGO_URL!);

try {
	await mongoClient.connect();
} catch (err) {
	console.error(err);
	throw new Error("failed to connect to mongo db");
}

export const db = mongoClient.db();

async function cleanup() {
	await mongoClient.close();
}

// !IMPORTANT! Running with watch mode on (`dev` script) will not trigger these cleanups!
process.on("SIGTERM", cleanup);
process.on("SIGKILL", cleanup);
