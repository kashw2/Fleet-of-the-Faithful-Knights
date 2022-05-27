import express, {NextFunction, Request, Response} from "express";
import {AllEndpoints} from "./endpoints/all-endpoints";
import {EitherUtils} from "@kashw2/lib-util";
import {Option} from "funfix-core";

const app = express();
const router = express.Router();

app.use("/", router);

router.use(express.json());

/**
 * We want to be initialising the endpoints with the same Router, as such we create an immutable variable for it,
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

AllEndpoints.initialiseEndpoints(router);

app.listen(process.env.PORT || 3002, () => {

  EitherUtils.liftEither(process.env.FFK_DISCORD_CLIENT_SECRET, `Missing environment variables FFK_DISCORD_CLIENT_SECRET`)
    .filterOrElse((_: string | undefined) => Option.of(process.env.FFK_DISCORD_REDIRECT).nonEmpty(), () => `Missing environment variable FFK_DISCORD_REDIRECT`)
    .filterOrElse((_: string | undefined) => Option.of(process.env.FFK_DISCORD_BOT_TOKEN).nonEmpty(), () => `Missing environment variable FFK_DISCORD_BOT_TOKEN`)
    .filterOrElse((_: string | undefined) => Option.of(process.env.FFK_API_SERVER).nonEmpty(), () => `Missing environment variable FFK_API_SERVER`)
    .fold(
      (error: string) => {
        throw error;
      },
      () => console.log(`Listening on port 3002`)
    );

});
