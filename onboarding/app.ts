import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {Onboarding} from "./onboarding";

const app = express();
const router = express.Router();
const port = process.env.PORT || 8008;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use("/", router);

// Onboarding initialisation
Onboarding.onboard();

app.listen(port, () => console.log(`Listening on port ${port}`));
