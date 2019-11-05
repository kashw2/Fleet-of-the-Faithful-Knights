import express from "express";
import hbs from "express-handlebars";
import * as path from "path";
import {Database} from "./db";

const app = express();
const router = express.Router();
const port = process.env.PORT || 8008;
const db = new Database();

app.engine("hbs", hbs({extname: "hbs"}));
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`Listening on port ${port}`));
