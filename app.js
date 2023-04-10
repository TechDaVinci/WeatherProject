const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const cityname = req.body.cityName;
  const apikey = "8944d08dd59aa3e86d55b10cb4ddd67c";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&appid=" +
    apikey +
    "&units=" +
    units;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data); //to convert a JSON string
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      res.write(
        "<h1> The temerature of " +
          cityname +
          " is " +
          temp +
          " Degree Celcius</h1>"
      );
      res.write("<h1> Weather condition " + weatherDescription + "</h1>");
      res.write(
        '<br><img src= "http://openweathermap.org/img/wn/' + icon + '@2x.png"> '
      );
      res.send();
    });
  });
});

app.listen(5000);
