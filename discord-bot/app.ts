import * as discord from "discord.js";
import {List} from "immutable";
import {Events} from "./events/events";

const clientToken = List(process.argv)
    .filter(x => x.includes("FFK_DISCORD_BOT_SECRET"))
    .map(x => x.substring(23))
    .join();
const client = new discord.Client();

Events.startAllDiscordEvents(client);

client.login(clientToken);
