import {Request, Response} from "express";
const cors = require('cors');
const express = require('express');
const app = express();
const router = express.Router();

/**
 * We want to be initialising the routes with the same Router, as such we create an immutable variable for it
 * and we just pass it around to all endpoints for usage this way we aren't creating multiple instances of endpoints
 * each with their own router.
 */

/**
 * Allow Cors across all origins
 */
// TODO: When we have DNS setup, specify correct origins
app.use(cors());

app.use('/', router);

router.get('/', (req: Request, res: Response) => res.json({response: 'Welcome to the Fleet of the Faithful Knights API Server'}));

const port = 3000;

app.listen(port, () => {
    console.info(`App Started on port ${port}`);
    // Mount Routes
})
