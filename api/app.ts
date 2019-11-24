import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {Database} from "./database/db";
import {AllEndpoints} from "./routes/all-endpoints";

const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;
const db = new Database();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use("/", router);

AllEndpoints.initialiseEndpoints(db, router);

router.get("/", (req, res) => res.send("Welcome to the FFK Voting Server!"));

app.listen(port, () => console.log(`Listening on port ${port}`));
