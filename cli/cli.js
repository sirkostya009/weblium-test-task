import { MongoClient } from "mongodb";
import fs from "node:fs";

const args = process.argv.slice(2);

if (args.indexOf("-f") === -1) {
	console.error("-f option is missing");
	process.exit(-1);
}

if (args.indexOf("-db") === -1) {
	console.error("-db option is missing");
	process.exit(-1);
}

const params = {
	file: args[args.indexOf("-f") + 1],
	url: args[args.indexOf("-db") + 1],
};

let client;
try {
	client = await new MongoClient(params.url).connect();
} catch (err) {
	console.error(`Failed to connect to database ${params.url}`, err);
	process.exit(-1);
}

let data;
try {
	data = JSON.parse(fs.readFileSync(params.file));
} catch (err) {
	console.error(`Failed to read file ${params.file}`, err);
	process.exit(-1);
}

if (Array.isArray(data)) {
	console.error(`${params.file} must be a object, not an array`);
	process.exit(-1);
}

for (const collection in data) {
	const records = data[collection];
	if (!Array.isArray(records)) {
		console.error(
			`${params.file} only array values are permitted for insertion`
		);
		process.exit(-1);
	}

	const array = records.find((r) => Array.isArray(r));
	if (array) {
		console.error(`${array} is not a valid Mongo object`);
		process.exit(-1);
	}

	try {
		await client.db().collection(collection).insertMany(records);
	} catch (err) {
		console.error(`Failed to insert into ${collection}`, err);
		process.exit(-1);
	}
}

await client.close();
