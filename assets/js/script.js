var currentWeatherEl = $("#weather-display");
var inputEl = $("#city-search");
var buttonEl = $("#search-btn");

buttonEl.click(function(){
    city = inputEl.val();
    getLocation(city)
    console.log(city)
})

function getLocation() {
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
                city = inputEl.val()
                displayCurrentWeather(data.current, city)
                displayForecast(data.daily)
                console.log(data);
            })
        }
    })
};

function displayCurrentWeather(weather, city){
    // $(`<h2>${weather.temp}<h2>`).appendTo(currentWeatherEl)
    var currentDate = moment().format("L")
    $("#city-name").text(`${city} ${currentDate}`)
    $("#temp").text(`Temp: ${weather.temp}°F`)
    $("#wind").text(`Wind: ${weather.wind_speed} MPH`)
    $("#humidity").text(`Humidity: ${weather.humidity}%`)
    // if statements for background color of uv index
    $("#uv-index").text(`UV Index: ${weather.uvi}`)


}

function displayForecast(forecast){
    $("#day-one").html(`<p>Temp: ${forecast[1].temp.day}</p>
    <p>Wind: ${forecast[1].wind_speed}</p>
    <p>Humidity: ${forecast[1].humidity}%</p>`)
    // for (var i=0; i<5; i++) {
    //     var div = document.createElement("div")
    //     div.insertAdjacentHTML("afterbegin", `<p>Temp: ${forecast[1].temp.day}</p>`) 
    //     $("#weather-forecast").append(div)
    //     console.log(div[3])
    // }

}

// getWeather();
// getLocation();