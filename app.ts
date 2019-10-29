import express from "express";

const app = express();
const port = process.env.PORT || 8008;

app.listen(port, () => console.log(`Listening on port ${port}`));
