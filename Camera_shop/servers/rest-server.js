const express = require("express");
const path = require("path");
const cors = require("cors");
const rest_routes = require("../routes/rest-routes.js");
const { sequelize } = require("../models");

const app = express();

app.use("/api", rest_routes);

app.use(cors({origin: '*'}));

app.listen({port: 8000}, async () =>{
    await sequelize.authenticate();
    console.log("Running rest-server on port 8000.");
});