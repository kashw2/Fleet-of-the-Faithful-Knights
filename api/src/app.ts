const cors = require('cors');
const express = require('express');
const app = express();

/**
 * Allow Cors across all origins
 */

// TODO: When we have DNS setup, specify correct origins
app.use(cors());

const port = 8080;

app.listen(port, () => console.info(`App Started on port ${port}`))
