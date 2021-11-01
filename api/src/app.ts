import express, {NextFunction, Request, Response} from "express";
import {Database} from "./db/database";
import {AllEndpoints} from "./endpoints/all-endpoints";
import bodyParser from "body-parser";
import {UserJsonSerializer} from "@kashw2/lib-ts";
import {Option} from "funfix-core";
import {EitherUtils} from "@kashw2/lib-util";

const app = express();
const router = express.Router();

app.use("/", router);

const db = new Database();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json({limit: '100mb'}));

/**
 * We want to be initialising the endpoints with the same Router, as such we create an immutable variable for it
 * and we just pass it around to all endpoints for usage this way we aren't creating multiple instances of endpoints
 * each with their own router.
 */

router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method.includes('OPTIONS')) {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        res.header('Access-Control-Allow-Origin', '*');
        return res.status(200).json({});
    }
    next();
});

router.use((req: Request, res: Response, next: NextFunction) => {
    const discordId = Option.of(req.header('Discord-Id'));
    discordId.map(id => {
        db.procedures.read.readUserByDiscordId(id)
            .then(u => {
                u.isLeft() ? req.user = undefined : req.user = UserJsonSerializer.instance.toJsonImpl(u.get());
                next();
            })
            .catch(e => {
                req.user = undefined;
                next();
            });
    });
    if (discordId.isEmpty()) {
        next();
    }
});

app.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.route)
        res.status(404);
    if (!db.cache.isReady()) {
        res.json({error: 'API Server Starting'});
    } else {
        res.json({message: 'Welcome to the Fleet of the Faithful Knights API Server'});
    }
    next();
});

// Initialise all the endpoints
AllEndpoints.initialiseEndpoints(router, db);

app.listen(process.env.PORT || 3000, () => {

    EitherUtils.liftEither(process.env.FFK_DATABASE_SERVER, `Missing environment variables FFK_DATABASE_SERVER`)
        .filterOrElse(_ => Option.of(process.env.FFK_DATABASE_PORT).nonEmpty(), () =>`Missing environment variable FFK_DATABASE_PORT`)
        .filterOrElse(_ => Option.of(process.env.FFK_DATABASE_NAME).nonEmpty(), () => `Missing environment variable FFK_DATABASE_NAME`)
        .filterOrElse(_ => Option.of(process.env.FFK_DATABASE_USERNAME).nonEmpty(), () => `Missing environment variable FFK_DATABASE_USERNAME`)
        .filterOrElse(_ => Option.of(process.env.FFK_DATABASE_PASSWORD).nonEmpty(), () => `Missing environment variable FFK_DATABASE_PASSWORD`)
        .filterOrElse(_ => Option.of(process.env.FFK_DISCORD_CLIENT_SECRET).nonEmpty(), () => `Missing environment variable FFK_DISCORD_CLIENT_SECRET`)
        .filterOrElse(_ => Option.of(process.env.FFK_DISCORD_REDIRECT).nonEmpty(), () => `Missing environment variable FFK_DISCORD_REDIRECT`)
        .filterOrElse(_ => Option.of(process.env.FFK_DISCORD_BOT_TOKEN).nonEmpty(), () => `Missing environment variable FFK_DISCORD_BOT_TOKEN`)
        .fold(
            (error) => {
                throw error;
            },
            () => console.log(`Listening on port 3000`)
        );
});
