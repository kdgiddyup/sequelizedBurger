// get our customer model
var db = require("../models");

// Create our routes
// index route
module.exports = function(app){
    
    app.get("/", function(req,res){
    // no db operations here; just render index screen
    res.render("index");
});

// get customer list route
app.get("/api/customers", function(req, res) {
  // changed to sequelize findAll method
  db.Customer.findAll({
      include: [ db.Burger ] 
  }).then(function(data){
   res.json(data);
    });
});

// add customer to db
app.post("/new/customer", function(req, res){
    console.log('Hit post route with ',req.body);
    db.Customer.create(req.body).then(function() {
       
        res.redirect("/");
    });
});

 // get certain customer name and burgers
  app.get("/customer/:id", function(req, res) {
  // changed to sequelize findAll method
  db.Customer.findAll({
    where: {
      id: req.params.id
    },
    include: [db.Burger]
  }).then(function(data){
   
  //send customer's name back
    res.json(data);

    });
  });

}

