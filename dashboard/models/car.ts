import { ObjectId } from "mongodb";
import { db } from "./db.ts";

export interface Car {
	_id?: ObjectId;
	name: string;
	price: number;
	color: string;
	description: string;
	categoryId: number;
	image: string;
}

export default db.collection<Car>("cars");
