var express = require('express');
var app = express();

var TokShow = {
  state: "pending",
  startTime: null
};

app.use(express.bodyParser());

app.get("/state", function(req, res) {
  res.send(200, TokShow);
});

app.post("/state", function(req, res) {
  if (req.body.state) {
    TokShow.state = req.body.state;
  }

  if (req.body.startTime) {
    TokShow.startTime = req.body.startTime;
  }

  res.send(200, TokShow);
});

app.use(express.static(__dirname + '/public'));

app.listen(3000);