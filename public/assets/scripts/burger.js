$(document).ready(function(){

// set event listeners
 $("#nameSubmit").on("click", customerFormSubmit);
 $("#burgerSubmit").on("click", burgerFormSubmit);

// build customer list
buildCustomerList();

// show all burgers
showAllBurgers();

// get any existing customers and populate the dropdown menu
function buildCustomerList() {
    $.get("/api/customers", function(data) {
        // empty existing list; the whole thing gets rewritten
        $("#customerList").empty();
        for (var i=0;i<data.length;i++){
            $("#customerList").append("<li data-id=\""+data[i].id+"\">"+data[i].name+"</li>");
        };
        $("#customerList > li").on("click", function(){
            showCustomerBurgers($(this).attr("data-id"))
        })
    })
};


// handle new customer name submission

function customerFormSubmit(event){
    event.preventDefault();
    var custName = $("#nameInput").val().trim();
    console.log('form submitted with name ',custName);
    // return if name field is empty
   if (custName=="") {
      $("#errorModal").toggle();
      return
    }
  // else add customer to db here
    else {
    $.post("/new/customer", {name:custName});
    $("#nameInput").val("");
    buildCustomerList();
    $("#burgerForm").css("display:block");
  }
}

// handle new burger submission 
function burgerFormSubmit(event){
    event.preventDefault();

    // if there is no customer selected, do nothing 
    if (!$("#customerName").attr("data-id"))
        return false;
    
    var burgerData = {
        name: $("#burgerInput").val().trim(),
        CustomerId: $("#customerName").attr("data-id")
    };
    $.post("/burgers", burgerData).then(function(){
         console.log('burger form submitted with data',burgerData);
         $("#burgerInput").val("");
         showCustomerBurgers(burgerData.CustomerId)
    });
}
function showAllBurgers() {
    $.get("/burgers/all");
}

function showCustomerBurgers(id){
    console.log('Getting burgers for customer',id);
    
    // first get customer name and update screen
    $.get("/customer/"+id)
    .then(function(response){
        console.log(response[0].name);
        $("#customerName").html(response[0].name+"'s Burgers").attr("data-id",response[0].id);
        
        // then, render burgers for this id
        $.get("/burgers/"+id)
    })
}


}); // end doc ready