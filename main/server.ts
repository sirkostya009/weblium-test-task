import express from "express";
import { engine } from "express-handlebars";
import path from "node:path";
import category from "./routes/category.ts";
import car from "./routes/car.ts";
import index from "./routes/index.ts";

const app = express();
const port = process.env.PORT || 3000;

app.engine(
	"handlebars",
	engine({
		defaultLayout: "main",
		layoutsDir: path.join(import.meta.dirname, "views/layouts"),
		partialsDir: path.join(import.meta.dirname, "views/partials"),
	})
);

app.set("view engine", "handlebars");
app.set("views", path.join(import.meta.dirname, "views"));

app.use(car);
app.use(index);
app.use(category);

app.listen(port, async () => {
	console.clear();
	if (process.env.MIGRATE === "true") {
		console.log("Running migrations...");
		const { migrate } = await import("./migrations/index.ts");
		await migrate();
	}
	console.log(`Server is listening on ` + port);
});
