import express, {Request, Response} from "express";
import {Endpoints} from "./endpoints/endpoints";
import cors from "cors";
import passport from "passport"
import {HeaderAPIKeyStrategy} from "passport-headerapikey";
import {User} from "@ffk/lib-ts";

const app = express();
const router = express.Router();

/**
 * We want to be initialising the routes with the same Router, as such we create an immutable variable for it
 * and we just pass it around to all endpoints for usage this way we aren't creating multiple instances of endpoints
 * each with their own router.
 */

const fleetOfTheFaithfulKnightsStrategy = new HeaderAPIKeyStrategy(
    {header: 'X-Api-Key', prefix: ''},
    false,
    ((apiKey, done, req) => {
        // TODO: Implement a DB call to get the user yada yada yada
        return done(null, new User());
    })
)

passport.use(fleetOfTheFaithfulKnightsStrategy);
app.use(passport.initialize());

/**
 * Allow Cors across all origins
 */
// TODO: When we have DNS setup, specify correct origins
app.use(cors());
app.use('/', router);

router.get('/', (req: Request, res: Response) => res.json({response: 'Welcome to the Fleet of the Faithful Knights API Server'}));

// Mount Routes
Endpoints.mountEndpoints(router);

const port = 3000;

app.listen(port, () => console.info(`App Started on port ${port}`))
