var cityInput = document.getElementById('city');
var forecast = document.getElementById('forecast-container');
var citySearch = document.getElementById('city-search-term');
var search_btn = document.getElementById('search');
var previousTitle = document.getElementById('previous');
var previousBtn = document.getElementsByClassName('previous_btn');
var long;
var lat;
var previousCity;

var searchHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();
    localStorage.setItem("city",city);
if (city) {
    getCityname(city);
    //displayPrevious(city)

    forecast.textContent = '';
    cityInput.value = '';
} else {
    alert('Please enter a valid city name');
}
};

var getCityname = function (city) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=c5a5ec0037fb9829d9254f1a67b4d869';

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data){
                console.log(data);
                long = data[0].lon;
                lat = data[0].lat;
                getForecast(lat,long);
            });
        }
    })
};



var getForecast = function(lat,long) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=c5a5ec0037fb9829d9254f1a67b4d869';
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data){
                console.log(data);
                displayForecast(data.list);
            });
        } else {
            alert('Error: ' + response.statusText);
        }

    });
};

var displayForecast = function (list) {

    for (var i = 0; i < list.length; i=i+8) {
        var date = dayjs(list[i].dt_txt).format('MM/DD/YYYY');
        var temp = Math.round(((list[i].main.temp) - 273.15) * 9/5 + 32);
        var humidity = list[i].main.humidity + '%';
        var descrip = list[i].weather[0].description;

        
        var forecastContainer = document.createElement('div');
        forecastContainer.classList = 'card';
        forecastContainer.style = "width: 18rem";

        var dateEl = document.createElement('div');
        dateEl.classList = 'card-header'
        dateEl.textContent = date;

        forecastContainer.appendChild(dateEl);

        var listEl = document.createElement('ul');
        listEl.classList = 'list-group list-group-flush';
        
        dateEl.appendChild(listEl);

        var tempEl = document.createElement('li');
        tempEl.classList = 'list-group-item';
        tempEl.textContent = 'Temperature:' + temp;

        listEl.appendChild(tempEl);

        var humidityEl = document.createElement('li');
        humidityEl.classList = 'list-group-item';
        humidityEl.textContent = 'Humidity' + humidity;

        listEl.appendChild(humidityEl);

        var descripEl = document.createElement('li');
        descripEl.classList = 'list-group-item';
        descripEl.textContent = descrip;

        listEl.appendChild(descripEl);

        forecast.appendChild(forecastContainer);

    }
}; 

/*var displayPrevious = function(city) {
    previousCity = localStorage.getItem("city");

    var previous = document.createElement('button');
    previous.classList = 'previous_btn'
    previous.textContent = previousCity;

    previousTitle.appendChild(previous);
    previousBtn.addEventListener('click', previousClicked);
}*/

search_btn.addEventListener('click', searchHandler);