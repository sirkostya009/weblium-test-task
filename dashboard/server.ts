import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import path from "path";
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(index);

app.listen(port, () => {
	console.clear();
	console.log(`Server is listening on ` + port);
});
