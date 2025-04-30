// index.js
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


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const { date } = req.params;

  const isDate = /^\d{4}-\d{2}-\d{2}$/.test(date);

  if (isDate) {
    const dateFormat = new Date(date);

    // get utc to format
    const dateUtcFormat = dateFormat.toUTCString();

    // get unix time
    const unixTime = dateFormat.getTime();

    // responses
    res.json({
      unix: unixTime,
      utc: dateUtcFormat,
    })
  } else {
    // get unix to utc
    const newDate = new Date(Number(date));
    const dateUtc = newDate.toUTCString();
  
    // responses
    res.json({
      unix: date,
      utc: dateUtc,
    })
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
