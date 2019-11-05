## Fleet of the Faithful Knights Voting Panel

This is the voting panel for the Fleet of the Faithful Knights (FFK) Star Citizen organisation.

This project is for the most part all functional codebase wise. No imperative stuff here. As a functional codebase, expect to see Option, Either, List, Set and Map data structures everywhere. 

Pretty much just plug and play.

#### Dependencies:

Name                      | Version
------------------------- | -------
TypeScript                | 3.6.4
TypeScript Compiler (TSC) | 1.20150623.0
Concurrently              | 5.0.0
Nodemon                   | 1.19.4
Node                      | 11.x.x

One line install command:

```npm i -g typescript tsc concurrently nodemon```

The TypeScript compiler should come bundled with TypeScript however it doesn't hurt to be sure.

#### Windows

* navigate to the cloned directory
* run ```npm i``` to install all packages
* run ```npm run initialise-dev``` to both compile and run

#### Linux 

The following was tested on Ubuntu 18.04 but should work across the board.

* navigate to the cloned directory
* run ```npm i``` to install all packages
* run ```npm run initialise-dev``` to both compile and run

In some cases you may need to run ```sudo npm i``` to install the dependencies. This is an issue related to your npm installation or configuration and not the repository. If you want to fix this, there are many resources out there that can help you to do so.

#### FAQ

Q: Why is the console outputting Database connection reset errors?

A: Assuming nothing has changed internally to cause this issue it is most likely due to tedious and another dependency version conflict. At the time of writing (11/10/19) Node 12 users will have this issue and node-mssql does not yet support tedious 6 which adds support for Node 12.

Q: Why handlebars?

A: I'm more experienced with it and didn't want to have to learn Jade even though it wouldn't have been hard.
