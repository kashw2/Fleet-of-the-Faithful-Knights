import * as discord from "discord.js";
import {Option} from "funfix-core";

const clientSecret = Option.of(process.argv[2])
    .map(x => x.split("FFK_DISCORD_BOT_SECRET="))
    .map(x => x[1])
    .orElseL(() => {
        throw new Error("Empty FFK_DISCORD_BOT_SECRET");
    });

const client = new discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(clientSecret.get() as string);
