import * as discord from "discord.js";
import {Events} from "./events/events";

const client = new discord.Client();

Events.startAllDiscordEvents(client);

// TODO: Make use of a monad on the below
client.login(process.env.FFK_DISCORD_PANEL_BOT_TOKEN!);
