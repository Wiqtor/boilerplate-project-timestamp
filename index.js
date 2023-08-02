// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  let now = new Date();
  res.json({ unix: now.valueOf(), utc: now.toUTCString() });
});

app.get("/api/:date?", (req, res) => {
  let param = req.params.date;
  let resDate;
  let isReadable = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/.test(
    param
  );
  console.log(isReadable);
  resDate = isReadable
    ? new Date(Date.parse(param))
    : new Date(parseInt(param));

  if (resDate.valueOf() > 0 && resDate.toUTCString() != "Invalid Date") {
    res.json({
      unix: resDate.valueOf(),
      utc: resDate.toUTCString(),
      // input: param,
      // resDate: resDate,
    });
  } else return res.json({ error: "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
