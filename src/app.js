const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Way to get the nodemon to work correctly nodemon src/app.js -e js,hbs

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const parialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(parialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Tuc Baldecchi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is some helpful text.",
    title: "Help",
  });
});

// app.com
//app.com/help
//app.com

app.get("/help/*", (req, res) => {
  res.render("error", {
    Message: "Help Page not Found",
    title: "Help 404",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    Message: "Page not Found",
    title: "404",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
