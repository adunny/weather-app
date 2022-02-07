var currentWeatherEl = $("#weather-display");
function getLocation() {
    var city = "San Diego"
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=f322e7b22806ceea9cd077e18e4087da"
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                var lat = data[0].lat
                var lon = data[0].lon
                getWeather(lat, lon);
            })
        }
    })

}

function getWeather(lat, lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=f322e7b22806ceea9cd077e18e4087da"
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayWeather(data.current)
                console.log(data);
            })
        }
    })
};

function displayWeather(weather){
    currentWeatherEl.text(weather.temp)

}
// getWeather();
getLocation();