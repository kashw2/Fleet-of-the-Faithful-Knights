## Fleet of the Faithful Knights Discord Bot

This is the Discord Bot for the Fleet of the Faithful Knights (FFK) Star Citizen Organisation.

This project is for the most part all functional codebase wise. No imperative stuff here. As a functional codebase, expect to see Option, Either, List, Set and Map data structures everywhere. 

Pretty much just plug and play. Should work on any server it is added too. In the future I may split some of the functionality of this bot out into it's own repo and 'market' it as a template as it contains handlers for all the events available via discordjs

The client secret/token is passed through via an environment variable with the name/key of "FFK_DISCORD_BOT_SECRET".

In Windows this is set by editing your environment variables (duh) (there's a native tool for it)

In Linux the easiest and best way to do this is to add the variable to your /etc/environment file.

```echo FFK_DISCORD_BOT_SECRET (your secret without braces) >> /etc/environment```
