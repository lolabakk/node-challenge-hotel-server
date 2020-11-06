const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");
const { response } = require("express");

app.get("/", function (request, response) {
  response.json("Hotel booking server.  Ask for /bookings, etc.");
});


// TODO add your routes and helper functions here
//To get all route 
app.get("/booking", function(request, response){
  response.json( "Hotel booking server. Ask for /booking, etc.") 
});


//display all bookings
app.get("/bookings", function(request, response){
  response.json(bookings);
});

// //create new bookings
app.post("/bookings", function(request, response){
  const createNewBooking = request.body;
  createNewBooking.id = bookings.length + 1;
  bookings.push(createNewBooking);
  response.json({success:true});
});

//read a booking
app.get("bookings/:id", function(req, res){
  const bookingIdNo = req.params.id;
  const findBooking = bookings.find((booking) => booking.if == bookingIdNo);
  response.json(findBooking);
  if(!findBooking){
    response.status(404).send("Booking Id does not exist!")
  }
  response.status(findBooking)
});

// //delete a booking
app.delete("/bookings/:id", function(request, response){
  const bookingIdNo = request.params.id;
const indexOfId = bookings.findIndex((booking)=>booking.id == bookingIdNo) 
    if(indexOfId == -1){          
      response.send("the Id cannot be found")         
      }else{     
     bookings.splice(indexOfId, 1)
    response.json({success:true})
 }
});
const listener = app.listen(process.env.PORT||3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});


