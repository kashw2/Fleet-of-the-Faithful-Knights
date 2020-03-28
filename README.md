# Fleet of the Faithful Knights

Fleet of the Faithful Knights (FFK) is a Star Citizen organisation that seeks to be a beacon of light in a dark universe.

This is the monorepo for the entire codebase that is mine. Thus far this consists of just an API. 
This will be expanded sometime in the future to include a voting panel and Discord bot.

Almost all of the projects inside the repo will be written in/using a functional paradigm and as such you'll see usage of Option, Either, List, Set and Map data structures littered throughout the codebase.

I want to say that most of this stuff will just be plug and play but who knows, I might mess something up and break a thing or two.

#### Dependencies:

Name                      | Version
------------------------- | -------
TypeScript                | 3.7.2
Concurrently              | 5.0.0
Nodemon                   | 1.19.4
Node                      | 11.x.x
Lerna                     | 3.18.4

Having all these ensures that you will be able to compile, build and run all projects in the repo.

Here's a one line install. Do note that it is a global install. 
 
```npm i typescript concurrently nodemon node lerna -g```

These packages can be located at either ```AppData/npm/node_modules``` on Windows machines or ```usr/local/lib/node_modules``` on Linux.

Once you have installed the above, run ```lerna bootstrap``` from the root of the repository to 'bootstrap' or install all dependencies for all projects in the repo.

#### Environment Variables

Variable                    | Description
----------------------------|------
FFK_DB_USER                 | The database login username.
FFK_DB_PASSWORD             | The database login password.
FFK_DB_NAME                 | The name of the database.
FFK_DB_SERVER               | The ip or dns that the database is stored on.
FFK_PANEL_ADDRESS           | The host/address of the panel including the prefix.
FFK_DISCORD_BOT_SECRET      | The secret/token of the bot provided on [Discords Developer Portal](https://discordapp.com/developers/).
FFK_DISCORD_BOT_MODE        | The method to run the bot in, either dev or live. 
FFK_DISOCRD_PANEL_CLIENT_ID | The respective Id of the application, this is made available via the [Discords Developer Portal](https://discordapp.com/developers/).
