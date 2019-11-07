## Fleet of the Faithful Knights Voting Panel

This is the voting panel for the Fleet of the Faithful Knights (FFK) Star Citizen organisation.

This project is for the most part all functional codebase wise. No imperative stuff here. As a functional codebase, expect to see Option, Either, List, Set and Map data structures everywhere. 

Pretty much just plug and play.

#### Dependencies:

Name                      | Version
------------------------- | -------
TypeScript                | 3.7.2
Concurrently              | 5.0.0
Nodemon                   | 1.19.4
Node                      | 11.x.x
Webpack                   | 4.41.2
ts-loader                 | 6.2.1

One line install command:

```npm i -g typescript tsc concurrently nodemon webpack webpack-cli && npm i -D ts-loader```

The TypeScript compiler should come bundled with TypeScript however it doesn't hurt to be sure. Webpack and Webpack CLI don't really have to be global installs and you could alternatively run webpack and webpack-cli as part of the local install script with ts-loader since ts-loader is only useful for Webpack but it doesn't hurt.

#### Windows

* navigate to the cloned directory
* run ```npm i``` to install all packages
* run ```npm run initialise-dev``` to compile the typescript, build the libraries and to run

#### Linux 

The following was tested on Ubuntu 18.04 but should work across the board.

* navigate to the cloned directory
* run ```npm i``` to install all packages
* run ```npm run initialise-dev``` to compile the typescript, build the libraries and to run

In some cases you may need to run ```sudo npm i``` to install the dependencies. This is an issue related to your npm installation or configuration and not the repository. If you want to fix this, there are many resources out there that can help you to do so.

#### FAQ

Q: Why is the console outputting Database connection reset errors?

~~A: Assuming nothing has changed internally to cause this issue it is most likely due to tedious and another dependency version conflict. At the time of writing (11/10/19) Node 12 users will have this issue and node-mssql does not yet support tedious 6 which adds support for Node 12.~~

A: The above was fixed with version 6 of node_mssql. Please check both your node_mssql version as well and make sure there is no dependency overlap with it's bundled version of tedious or another dependency. 

Q: Why does package-json contain typescript as a dev dependency?

A: Webpack requires that you have a version of typescript accessible from the projects node_modules. Maybe there's a way around this but I don't care enough to figure it out.

Q: How do I debug?

A: The easiest way to do this would be to ```npm run initialise-dev``` which will compile, build and run the code with node/nodemons --inspect flag enabled, from there you can connect to the specified port (usually 9229) with your debugger.
