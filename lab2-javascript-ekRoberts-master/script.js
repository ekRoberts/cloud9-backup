document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=3dddebf0b02c633f9e2cbc6be325f862";
  /*global fetch*/ fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<h2>Current Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	results += '<h3>' + json.weather[i].description + '</h3>'
	if (i !== json.weather.length - 1)
	  results += ", "
      }
      results += "</p>"
      results += 'H: ' + Math.ceil(json.main.temp_max) + '\u00B0F' + " L: " + Math.ceil(json.main.temp_min) + '\u00B0F' 
      results += "</p>"
      results += 'Feels Like: ' + Math.ceil(json.main.feels_like) + '\u00B0F';
      results += "</p>"
      results += 'Humidity: ' + json.main.humidity + '%';
	  results += "</p>"
      results += "Wind Speed: " + json.wind.speed 
      document.getElementById("weatherResults").innerHTML = results;
      return json;
    });
    
      const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=3dddebf0b02c633f9e2cbc6be325f862";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)
      document.getElementById("head").innerHTML = "<h2>  Five Day / Three Hour Forecast for " + value + "</h2>";
      for (let i=0; i < json.list.length; i++) {
        let forecastElement = "";
    	forecastElement += "<h2>" + /*global moment*/moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>"
    	forecastElement += '<img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
    	forecastElement += '<h2>' + json.list[i].main.temp + '\u00B0F' + '</h2>'
    	forecastElement += "<p>"
    	forecastElement +=  'H: ' + Math.ceil(json.list[i].main.temp_max) + '\u00B0F'
    	forecastElement += "<p>"
    	forecastElement += "L: " + Math.ceil(json.list[i].main.temp_min) + '\u00B0F';
    	forecastElement += "<p>"
    	forecastElement += 'Feels Like: ' + Math.ceil(json.list[i].main.feels_like) + '\u00B0F';
    	forecastElement += "<p>"
    	forecastElement += 'Humidity: ' + json.list[i].main.humidity + '%';
    	forecastElement += "<p>"
    	forecastElement += "Wind Speed: " + json.list[i].wind.speed 
    	let element = "E" + String(i+1);
    	document.getElementById(element).innerHTML = forecastElement;
}
      
    });
    
});

