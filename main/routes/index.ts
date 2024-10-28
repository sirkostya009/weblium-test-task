import { Router } from "express";
import car from "../models/car.ts";
import category, { type Category } from "../models/category.ts";

const router = Router();

function findParentCategory(category: Category, categories: Category[]) {
	category.path = ["/category-" + category._id];
	let cat = categories.find((p) => p._id === category.parentCategoryId);
	category.parents = [cat];
	while (cat?.parentCategoryId) {
		category.path.unshift("/category-" + cat?._id);
		const parent = categories.find((p) => p._id === cat?.parentCategoryId);
		category.parents.push(parent);
		cat = parent;
	}
	category.path.unshift("/category-" + cat?._id);
	category.path = category.path.join("");
}

router.get("/", async (req, res) => {
	try {
		const categories = await category.find().toArray();

		for (const category of categories) {
			if (category.parentCategoryId) {
				findParentCategory(category, categories);
			}

			category.cars = await car
				.find({ categoryId: category._id })
				.toArray();
		}

		res.render("index", { title: "index", categories });
	} catch (error) {
		console.error("Error fetching data", error);
		res.status(500).send("Internal Server Error");
	}
});

export default router;
