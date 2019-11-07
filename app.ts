import express from "express";
import {Database} from "./db";
import {AllEndpoints} from "./routes/all-endpoints";

const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;
const db = new Database();

app.use("/", router);

AllEndpoints.initialiseEndpoints(db, router);

router.get("/", (req, res) => res.send("Welcome to the FFK Voting Server!"));

app.listen(port, () => console.log(`Listening on port ${port}`));
