const express = require("express");
const path = require("path");
const cors = require("cors");
const application_routes = require("../routes/application-routes.js");

const app = express();

app.use(express.static(path.join(__dirname, "../static")));
app.use(express.static(path.join(__dirname, "../static/authentification")));
app.use(express.static(path.join(__dirname, "../static/camera_shop")));
app.use(express.static(path.join(__dirname, "../static/cameras")));
app.use(express.static(path.join(__dirname, "../static/employees")));
app.use(express.static(path.join(__dirname, "../static/filters")));
app.use(express.static(path.join(__dirname, "../static/lenses")));
app.use(express.static(path.join(__dirname, "../static/microphones")));
app.use(express.static(path.join(__dirname, "../static/purchase")));
app.use(express.static(path.join(__dirname, "../static/shopping_cart")));
app.use(express.static(path.join(__dirname, "../static/suppliers")));
app.use(express.static(path.join(__dirname, "../static/tripods")));
app.use(express.static(path.join(__dirname, "../static/users")));

app.use("/admin", application_routes);

app.use(cors());

app.listen({port: 9000}, async () => {
    console.log("Running application-server on port 9000.");
});