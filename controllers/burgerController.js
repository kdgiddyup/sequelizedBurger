// get our burger model
var db = require("../models");

// Create our routes
// show burgers 
module.exports = function(app){
  // show all burgers
  app.get("/burgers/all", function(req, res) {
  // changed to sequelize findAll method
  db.Burger.findAll({
     //include: [db.Customer]
}).then(function(data){
    var dataArray = [];
    for (var i=0;i<data.length;i++){
      dataArray.push(data[i].dataValues)
    };
    console.log(dataArray);
    res.render("burgers", {burgers:dataArray});
    });
  });

 // render burgers for certain customer
 app.get("/burgers/:id",function(req,res){
  db.Burger.findAll({
    where:{
      // limit results to passed in customer id
      CustomerId:req.params.id
    },
    include: [db.Customer]
  }).then(function(data){
    // render these burgers 
    var dataArray = [];
    for (var i=0;i<data.length;i++){
      dataArray.push(data[i].dataValues)
    };
    res.render("burgers", {burgers:dataArray});
  });
 });

 // route hit when new burger is added to db
  app.post("/burgers", function(req, res) {
    
    // changed to sequelized create method and added customer id
    db.Burger.create(req.body).then(function() {
        res.redirect("/");
      });
  });

// this is the route hit when <Devour it!> button is clicked
app.put("/:id", function(req,res){
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
} 