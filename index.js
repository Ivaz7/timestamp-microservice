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

// handler empty params
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// handler date params api
app.get("/api/:date", function (req, res) {
  const { date: dateParams } = req.params;
  let dateRes;

  if (!dateParams) {
    // No date parameter, use current date
    dateRes = new Date();
  } else if (/^\d+$/.test(dateParams)) {
    // Unix timestamp in milliseconds
    dateRes = new Date(parseInt(dateParams))
  } else {
    // Date string
    dateRes = new Date(dateParams);
  }

  // Check for invalid date
  if (dateRes.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: dateRes.getTime(),
    utc: dateRes.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
