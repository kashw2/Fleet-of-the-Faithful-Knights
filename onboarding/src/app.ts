import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";

const app = express();
const router = express.Router();

app.use("/", router);

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/**
 * We want to be initialising the endpoints with the same Router, as such we create an immutable variable for it
 * and we just pass it around to all endpoints for usage this way we aren't creating multiple instances of endpoints
 * each with their own router.
 */

// TODO: When we have DNS setup, specify correct origins
router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method.includes('OPTIONS')) {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.route)
        res.status(404);
    res.json({message: 'Welcome to the Fleet of the Faithful Knights Onboarding Server'});
    next();
});

app.listen(process.env.PORT || 3002, () => console.log(`Listening on port 3002`));
