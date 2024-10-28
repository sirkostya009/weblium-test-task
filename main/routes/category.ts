import { Router } from "express";
import cars from "../models/car.ts";
import categories from "../models/category.ts";
import { createSegments } from "./utils.ts";

const router = Router();

router.get("*/category-:id", async (req, res) => {
	try {
		const categoryId = +req.params.id;

		const category = await categories.findOne({
			_id: categoryId,
		});
		const categoryCars = await cars.find({ categoryId }).toArray();

		res.render("category", {
			category,
			cars: categoryCars,
			segments: createSegments(req.path),
			path: req.path,
		});
	} catch (error) {
		console.error("Error fetching data", error);
		res.status(500).send("Internal Server Error");
	}
});

export default router;
