import express from "express";
import {Database} from "./db";

const app = express();
const port = process.env.PORT || 8008;

const db = new Database();

app.listen(port, () => console.log(`Listening on port ${port}`));
