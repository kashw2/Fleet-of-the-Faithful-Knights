import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {AppModule} from "./app/app.module";
import {environment} from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

// TODO: See if we can do the same the the FFK Api
// This solves the issue of a frontend angular application not being able to access actual process env variables
process.env.FFK_API_ADDRESS = environment.FFK_API_ADDRESS;
process.env.FFK_DISCORD_PANEL_BOT_TOKEN = environment.FFK_DISCORD_PANEL_BOT_TOKEN;

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
