// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", function (request, response) {
  let date = new Date();
  dateArray = date.toString().split("+");
  dateArray = dateArray[0].split(" ");
  console.log(dateArray);
  
  response.json({
    "unix" : date.getTime(),
    "utc" : `${dateArray[0]}, ${dateArray[2]} ${dateArray[1]} ${dateArray[3]} ${dateArray[4]} ${dateArray[5]}`
  })
});
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date?", function (request, response) {
  let date_string;
  let date;
  let dateArray;
  if(!request.params.date.includes("-")){ //if its not a date
    date_string = parseInt(request.params.date);
    date = new Date(date_string);
    dateArray = date.toString().split("+");
  dateArray = dateArray[0].split(" ");

    response.json({
    "unix" : date_string,
    "utc" : `${dateArray[0]}, ${dateArray[2]} ${dateArray[1]} ${dateArray[3]} ${dateArray[4]} ${dateArray[5]}`
    }) 
  }
  else{ //its a date
    let dateArray = request.params.date.split("-");
    date_string = [dateArray[0], dateArray[1], dateArray[2]].join(" ");
    
    date = new Date(date_string);
  
    if(date ==  "Invalid Date"){
      response.json({
        error : "Invalid Date" 
      })
    }
    else{
      //date = new Date(2015, 12, 10);
      dateArray.length = 0;
      dateArray = date.toString().split("+");
      dateArray = dateArray[0].split(" ");
      //console.log(dateArray);
      //console.log(`${dateArray[0]}, ${dateArray[2]} ${dateArray[1]} ${dateArray[3]} ${dateArray[4]} ${dateArray[5]}`)
    
      response.json({
        "unix" : date.getTime(),
        "utc" : `${dateArray[0]}, ${dateArray[2]} ${dateArray[1]} ${dateArray[3]} ${dateArray[4]} ${dateArray[5]}`
      })
    } 
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
