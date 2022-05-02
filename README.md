# Fleet of the Faithful Knights

[![codecov](https://codecov.io/gh/kashw2/Fleet-of-the-Faithful-Knights/branch/main/graph/badge.svg?token=LQ5NNKW5WX)](https://codecov.io/gh/kashw2/Fleet-of-the-Faithful-Knights)

[![Terraform](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/terraform.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/terraform.yml)

[![api.faithfulknights.com](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/api.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/api.yml)
[![onboarding.faithfulknights.com](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/onboarding.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/onboarding.yml)
[![panel.faithfulknights.com](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/panel.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/panel.yml)

[![Externals Library](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-external.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-external.yml)
[![Utility Library](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-util.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-util.yml)
[![Server Library](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-server.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-server.yml)
[![TypeScript Library](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-ts.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-ts.yml)

Fleet of the Faithful Knights (FFK) is a Star Citizen organisation that seeks to be a beacon of light in a dark
universe.

This is the monorepo for the current codebase that is used within the administrative reigns of the org. As of now this
consists of a working read and write API, Voting Panel, Onboarding service and in the future will also consist of a
Discord Bot.

Almost all the projects inside the repo will be written in/using a functional paradigm and as such you'll see usage of
Option, Either, List, Set and Map data structures littered throughout the codebase.

I want to say that most of this stuff will just be plug and play but who knows, I might mess something up and break a
thing or two.

#### Dependencies:

Name                                                 | Version
---------------------------------------------------- | -------
TypeScript                                           | 4.x.x
Node                                                 | 14.x.x
Lerna                                                | 4.0.0
Webpack                                              | 5.x.x
[Terraform](https://www.terraform.io/downloads.html) | 1.0.0
Docker                                               | 20.x.x

This ensures that you will be able to compile, build, run and deploy all projects in the repo.

Here's a one line install for all node packages. Do note that it is a global install.

```npm i typescript lerna webpack -g```

These packages can be located at the default locations at either ```AppData/npm/node_modules``` on Windows machines
or ```usr/local/lib/node_modules``` on Linux.

Once you have installed the above, run ```lerna bootstrap``` from the root of the repository to 'bootstrap' or install
all dependencies for all projects in the repo.

An optional installation is eslint for linting. At the time of writing the version of so is
7.15.0. ```npm i -g eslint@7.15.0```

#### Environment Variables

For ease of use in terraform, also set up TF_VAR versions of these variables.

Variable                        | Description
--------------------------------|------
FFK_DATABASE_USERNAME           | The database login username.
FFK_DATABASE_PASSWORD           | The database login password.
FFK_DATABASE_NAME               | The name of the database.
FFK_DATABASE_SERVER             | The ip or dns that the database is stored on.
FFK_DATABASE_PORT               | The port used to connect via UDP or TCP.
FFK_API_SERVER                  | The url for the API
FFK_DISCORD_CLIENT_SECRET       | The discord bots client secret
FFK_DISCORD_BOT_TOKEN           | The discord bots token
FFK_DISCORD_REDIRECT            | A valid discord bot oauth2 redirect url

#### Debugging Workflows:

Debugging workflows can be a bit tedious if you don't know how to do it. Thankfully there are many open sourced tools
out there that facilitate easy testing of workflows/GitHub Actions with minuscule differences to what is seen when you
actually create a pull request with your code or have it pushed.

My personal favourite is https://github.com/nektos/act
