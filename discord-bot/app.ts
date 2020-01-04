import * as discord from "discord.js";
import {Events} from "./events/events";

const client = new discord.Client();

Events.startAllDiscordEvents(client);

client.login(process.env.FFK_DISCORD_BOT_SECRET);
