import { Router } from "express";
import cars from "../models/car.ts";
import { createSegments } from "./utils.ts";
import { ObjectId } from "mongodb";

const router = Router().get("/");

router.get("*/car-:id", async (req, res) => {
	try {
		const { id } = req.params;

		const car = await cars.findOne({ _id: new ObjectId(id) });

		res.render("car", { car, segments: createSegments(req.path) });
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

export default router;
