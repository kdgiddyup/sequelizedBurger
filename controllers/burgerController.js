// dependencies
var express = require("express");
var router = express.Router();

// get our burger model
var db = require("../models");

// Create our routes
// index route
router.get("/", function(req, res) {
  // changed to sequelize findAll method
  db.Burger.findAll({}).then(function(data){
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
    });
});

// route hit when new burger is added to db
router.post("/", function(req, res) {
  // send burgers.create method the columns, values and callback function it requires 
  // changed to sequelized create method
  console.log(req.body);
  db.Burger.create(req.body).then(function() {
      res.redirect("/");
    });
});

// this is the route hit when <Devour it!> button is clicked
router.put("/:id", function(req,res){
  // use incoming ID in our sequelize condition (WHERE id=<id>)
  // req.body is already an object model so we pass it directly to our sequelize handler as the first argument
  db.Burger.update(
    req.body, 
    {
      where: {
        id: req.params.id
      }
    }).then(function(){
      res.redirect("/");
  });
});
    

// Export routes for server.js to use.
module.exports = router;
