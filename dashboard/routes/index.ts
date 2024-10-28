import { randomUUID } from "crypto";
import { Router } from "express";
import car from "../models/car.ts";
import { ObjectId } from "mongodb";

const router = Router();

const sessions = {};

function isAuthenticated(session: string) {
	return sessions[session]?.expires > new Date();
}

router.get("/", async (req, res) => {
	if (isAuthenticated(req.cookies.session)) {
		const cars = await car.find().toArray();

		res.render("cars", { title: "cars", cars });
	} else {
		res.render("index", { title: "home" });
	}
});

router.post("/", async (req, res) => {
	const { username, password } = req.body;

	if (username === "admin" && password === "password") {
		const uuid = randomUUID();
		const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
		sessions[uuid] = { expires };
		res.cookie("session", uuid, {
			expires,
			secure: true,
			httpOnly: true,
		});
	}

	res.redirect("/");
});

router.post("/:id", async (req, res) => {
	if (!isAuthenticated(req.cookies.session)) {
		res.status(401).send("Unauthenticated");
	}

	const { id, name, price, color, description, categoryId, image } = req.body;

	car.updateOne(
		{
			_id: new ObjectId(id as string),
		},
		{ $set: { name, price, color, description, categoryId, image } }
	);
	res.redirect("/");
});

export default router;
