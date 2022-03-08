var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (request, response) {
  let dateArray = request.params.date.split("-");
  let date = new Date(dateArray[0], dateArray[1]-1, dateArray[2]);
  //date = new Date(2015, 12, 10);
  dateArray.length = 0;
  dateArray = date.toString().split("+");
  dateArray = dateArray[0].split(" ");
  console.log(dateArray);
  console.log(`${dateArray[0]}, ${dateArray[2]} ${dateArray[1]} ${dateArray[3]} ${dateArray[4]} ${dateArray[5]}`)
  
  response.json({
    "unix" : date.getTime(),
    "utc" : `${dateArray[0]}, ${dateArray[2]} ${dateArray[1]} ${dateArray[3]} ${dateArray[4]} ${dateArray[5]}`
  })
  
});
