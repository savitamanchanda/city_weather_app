var cityInput = document.getElementById('city');
var forecastContainer = document.getElementById('forecast-container');
var citySearch = document.getElementById('city-search-term');

var searchHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();
if (city) {
    getCityWeather(city);

    forecastContainer.textContent = '';
    cityInput.value = '';
} else {
    alert('Please enter a valid city name');
}
};

var long;
var lat;

var getCityname = function (city) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=c5a5ec0037fb9829d9254f1a67b4d869';

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data){
                console.log(data);
                long = data.lon;
                lat = data.lat;
            });
        }
    })
};

getCityname();

var getForecast = function(lat,long) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=c5a5ec0037fb9829d9254f1a67b4d869';
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data){
                console.log(data);
                displayForecast();
            });
        } else {
            alert('Error: ' + response.statusText);
        }

    });
};

var displayForecast = function (weather, searchTerm) {
    citySearch.textContent = searchTerm;

    for (var i = 0; i < list.length; i++) {
        
    }
}