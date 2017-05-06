var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));


// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
app.use("/", require("./controllers/burgerController"));

// Syncing our sequelize models and then starting our express app

// Requiring our models for syncing
var db = require("./models");

// REMOVE force:true for DEPLOYMENT!!!!

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

