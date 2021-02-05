const express = require('express');
const envs = require('dotenv').config().parsed;
const ENV_PORT = envs['ENV_PORT'] || 4040;
const app = express();

app.use(express.json());

app.listen(ENV_PORT, () => {
    console.log(`Listening at --> ${ENV_PORT}`);
});
