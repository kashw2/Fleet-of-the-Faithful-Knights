## Fleet of the Faithful Knights API

This is the Application Programming Interface (API) for the Fleet of the Faithful Knights (FFK) Star Citizen Organisation.

This project is for the most part all functional codebase wise. No imperative stuff here. As a functional codebase, expect to see Option, Either, List, Set and Map data structures everywhere. 

Pretty much just plug and play.

#### FAQ

Q: Why is the console outputting Database connection reset errors?

~~A: Assuming nothing has changed internally to cause this issue it is most likely due to tedious and another dependency version conflict. At the time of writing (11/10/19) Node 12 users will have this issue and node-mssql does not yet support tedious 6 which adds support for Node 12.~~

A: The above was fixed with version 6 of node_mssql. Please check both your node_mssql version as well and make sure there is no dependency overlap with it's bundled version of tedious or another dependency. 

Q: Why does package-json contain typescript as a dev dependency?

A: Webpack requires that you have a version of typescript accessible from the projects node_modules. Maybe there's a way around this but I don't care enough to figure it out.

Q: How do I debug?

A: The easiest way to do this would be to ```npm run build-dev-watch``` which will compile, build and run the code with node/nodemons --inspect flag enabled, from there you can connect to the specified port (usually 9229) with your debugger. Bear in mind, source maps must be enabled in your tsconfig

Q: How do I add a dependency to this project?

A: run ```lerna add yourDependencyHere --scope=@ffk/api```
