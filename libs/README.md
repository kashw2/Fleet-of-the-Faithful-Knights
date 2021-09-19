# Libraries

[![Externals Library](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-external.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-external.yml)
[![Utility Library](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-util.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-util.yml)
[![Server Library](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-server.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-server.yml)
[![TypeScript Library](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-ts.yml/badge.svg)](https://github.com/kashw2/Fleet-of-the-Faithful-Knights/actions/workflows/lib-ts.yml)

All libraries that we develop belong in here.

Libraries currently included:
- External (lib-external)
- Server (lib-server)
- Typescript (lib-ts)
- Utility (lib-util)

## Tidbits

Certain libraries will require rebuild and publication of another version on the publication of another.
This is the case of lib-ts and lib-util. As lib-ts utilises lib-util for it's serialization upon build of lib-ts it will 
build serialization stuff included inside of models and stuff in lib-ts, so if lib-util changes serialization stuff could be affected
and inaccessible using the same type signature and method name that is needed for correct function.
