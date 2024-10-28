import { MongoClient } from "mongodb";

const migrations = ["./init.ts"];

export async function migrate() {
	const client = await new MongoClient(process.env.MONGO_URL!).connect();
	const db = client.db();

	const migrationsCollection = db.collection("migrations");

	for (const migration of migrations) {
		const exists = await migrationsCollection.findOne({ name: migration });

		if (exists) {
			console.log("Skipping ", migration);
			continue;
		}

		const { default: func } = await import(migration);

		await func(db);
		await migrationsCollection.insertOne({
			name: migration,
		});
	}

	await client.close();
}
