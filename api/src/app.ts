import express, {NextFunction, Request, Response} from "express";
import {Database} from "./db/database";
import {AllEndpoints} from "./endpoints/all-endpoints";
import bodyParser from "body-parser";
import {UserJsonSerializer} from "@kashw2/lib-ts";
import {Option} from "funfix-core";

const app = express();
const router = express.Router();

app.use("/", router);

const db = new Database();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.use((req: Request, res: Response, next: NextFunction) => {
    const discordId = Option.of(req.header('Discord-Id'));
    discordId.map(id => {
        db.procedures.read.readUserByDiscordId(id)
            .then(u => {
                u.isLeft() ? req.user = undefined : req.user = UserJsonSerializer.instance.toJsonImpl(u.get())
                next();
            })
            .catch(e => {
                req.user = undefined
                next();
            });
    });
    if (discordId.isEmpty()) {
        next();
    }
})

/**
 * We want to be initialising the endpoints with the same Router, as such we create an immutable variable for it
 * and we just pass it around to all endpoints for usage this way we aren't creating multiple instances of endpoints
 * each with their own router.
 */

// TODO: When we have DNS setup, specify correct origins
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method.includes('OPTIONS')) {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    if (!db.cache?.isReady()) {
        res.json({error: 'API Server Starting'});
    } else {
        res.json({message: 'Welcome to the Fleet of the Faithful Knights API Server'});
    }
    next();
});

// Initialise all the endpoints
AllEndpoints.initialiseEndpoints(router, db);

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port 3000`));
