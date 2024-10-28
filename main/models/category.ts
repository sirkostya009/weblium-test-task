import { db } from "./db.ts";

export interface Category {
	_id?: number;
	name: string;
	description: string;
	image: string;
	parentCategoryId: number;
}

export default db.collection<Category>("categories");
