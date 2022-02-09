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
    var currentDate = moment().format("L")
    currentWeatherEl.addClass("border border-dark")
    $("#city-name").text(`${city} ${currentDate}`)
    $("#temp").text(`Temp: ${weather.temp}°F`)
    $("#wind").text(`Wind: ${weather.wind_speed} MPH`)
    $("#humidity").text(`Humidity: ${weather.humidity}%`)
    // if statements for background color of uv index
    $("#uv-index").text(`UV Index: ${weather.uvi}`)


}

function displayForecast(forecast){
    var dayOne = moment().add(1, "d").format("L")
    var dayTwo = moment().add(2, "d").format("L")
    var dayThree = moment().add(3, "d").format("L")
    var dayFour = moment().add(4, "d").format("L")
    var dayFive = moment().add(5, "d").format("L")
    // day 1 forecast
    $("#day-one").html(`<h3>${dayOne}</h3>
    <img src="http://openweathermap.org/img/wn/${forecast[1].weather[0].icon}.png" alt="image of weather condition">
    <p>Temp: ${forecast[1].temp.day}</p>
    <p>Wind: ${forecast[1].wind_speed}</p>
    <p>Humidity: ${forecast[1].humidity}%</p>`)
    // day 2 forecast
    $("#day-two").html(`<h3>${dayTwo}</h3>
    <img src="http://openweathermap.org/img/wn/${forecast[2].weather[0].icon}.png" alt="image of weather condition">
    <p>Temp: ${forecast[2].temp.day}</p>
    <p>Wind: ${forecast[2].wind_speed}</p>
    <p>Humidity: ${forecast[2].humidity}%</p>`)
    // day 3 forecast
    $("#day-three").html(`<h3>${dayThree}</h3>
    <img src="http://openweathermap.org/img/wn/${forecast[3].weather[0].icon}.png" alt="image of weather condition">
    <p>Temp: ${forecast[3].temp.day}</p>
    <p>Wind: ${forecast[3].wind_speed}</p>
    <p>Humidity: ${forecast[3].humidity}%</p>`)
    // day 4 forecast
    $("#day-four").html(`<h3>${dayFour}</h3>
    <img src="http://openweathermap.org/img/wn/${forecast[4].weather[0].icon}.png" alt="image of weather condition">
    <p>Temp: ${forecast[4].temp.day}</p>
    <p>Wind: ${forecast[4].wind_speed}</p>
    <p>Humidity: ${forecast[4].humidity}%</p>`)
    // day 5 forecast
    $("#day-five").html(`<h3>${dayFive}</h3>
    <img src="http://openweathermap.org/img/wn/${forecast[5].weather[0].icon}.png" alt="image of weather condition">
    <p>Temp: ${forecast[5].temp.day}</p>
    <p>Wind: ${forecast[5].wind_speed}</p>
    <p>Humidity: ${forecast[5].humidity}%</p>`)
    

}

