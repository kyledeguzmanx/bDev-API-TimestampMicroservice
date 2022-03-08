var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

//use stylesheet in public folder
app.use(express.static('public'));

//display html file in views director
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//no date endpoint
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

//test API endpoint
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//given date endpoint
app.get("/api/:date?", function (request, response) {
  let dateArray = request.params.date.split("-");
  let date_string = [dateArray[0], dateArray[1], dateArray[2]].join(" ");
  
  let date = new Date(date_string);

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
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
