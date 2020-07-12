# Fleet of the Faithful Knights

Fleet of the Faithful Knights (FFK) is a Star Citizen organisation that seeks to be a beacon of light in a dark universe.

This is the monorepo for the current codebase that is used within the administrative reigns of the org. As of now this consists of a working read and write API, Voting Panel, Onboarding service and in the future will also consist of a Discord Bot.

Almost all the projects inside the repo will be written in/using a functional paradigm and as such you'll see usage of Option, Either, List, Set and Map data structures littered throughout the codebase.

I want to say that most of this stuff will just be plug and play but who knows, I might mess something up and break a thing or two.

#### Dependencies:

Name                      | Version
------------------------- | -------
TypeScript                | 3.8.5
Concurrently              | 5.2.0
Nodemon                   | 2.0.4
Node                      | 12.x.x
Lerna                     | 3.20.2

Having all these ensures that you will be able to compile, build and run all projects in the repo.

Here's a one line install. Do note that it is a global install. 
 
```npm i typescript concurrently nodemon node lerna -g```

These packages can be located at the default locations at either ```AppData/npm/node_modules``` on Windows machines or ```usr/local/lib/node_modules``` on Linux.

Once you have installed the above, run ```lerna bootstrap``` from the root of the repository to 'bootstrap' or install all dependencies for all projects in the repo.

#### Environment Variables

Variable                    | Description
----------------------------|------
FFK_DB_USER                 | The database login username.
FFK_DB_PASSWORD             | The database login password.
FFK_DB_NAME                 | The name of the database.
FFK_DB_SERVER               | The ip or dns that the database is stored on.
FFK_PANEL_ADDRESS           | The host/address of the panel including the protocol.
FFK_API_ADDRESS             | The host/address of the api including the protocol.
FFK_DISCORD_PANEL_SECRET    | The secret of the bot used to interact between the discord server and panel provided on [Discords Developer Portal](https://discordapp.com/developers/).
FFK_DISCORD_PANEL_BOT_TOKEN | The token of the bot used to interact between the discord server and panel provided on [Discords Developer Portal](https://discordapp.com/developers/).
FFK_DISOCRD_PANEL_CLIENT_ID | The respective Id of the application, this is made available via the [Discords Developer Portal](https://discordapp.com/developers/).
