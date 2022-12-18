var cityInput = document.getElementById('city');
var forecast = document.getElementById('forecast-container');
var citySearch = document.getElementById('city-search-term');
var search_btn = document.getElementById('search');
var previousButtonsEl = document.querySelector('#previous-buttons');

var long;
var lat;
var previousCity;

var searchHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();
if (city) {
    getCityname(city);

    forecast.textContent = '';
    cityInput.value = '';
    citySearch.textContent = "- " + city;
} else {
    alert('Please enter a valid city name');
}
};

var buttonHandler = function(event) {
    var previous = event.target.getAttribute('data-city');

    if(previous) {
        getCityname(previous);

        forecast.textContent = '';
        citySearch.textContent = '- ' + event.target.innerHTML;
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
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&units=imperial&appid=c5a5ec0037fb9829d9254f1a67b4d869';
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
        var temp = list[i].main.temp;
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

        var image = document.createElement('li');
        image.classList = 'list-group-item';
        if (list[i].clouds.all < 10) {
            image.innerHTML = '  <img src="./assets:images/sun.png" alt="sunny" width="222" height="222">';
        } else if (list[i].clouds.all < 50 && list[i].clouds.all > 10) {
            image.innerHTML = '<img src="./assets:images/cloudy.png" alt="little cloudy" width="222" height="222">';
        } else {
            image.innerHTML = '  <img src="./assets:images/cloud.png" alt="cloudy" width="222" height="222">';
        }

        listEl.appendChild(image);

        var tempEl = document.createElement('li');
        tempEl.classList = 'list-group-item';
        tempEl.textContent = 'Temperature: ' + Math.round(temp) + 'F';

        listEl.appendChild(tempEl);

        var humidityEl = document.createElement('li');
        humidityEl.classList = 'list-group-item';
        humidityEl.textContent = 'Humidity: ' + humidity;

        listEl.appendChild(humidityEl);

        var descripEl = document.createElement('li');
        descripEl.classList = 'list-group-item';
        descripEl.textContent = descrip;

        listEl.appendChild(descripEl);

        forecast.appendChild(forecastContainer);

    }
};  

search_btn.addEventListener('click', searchHandler);
previousButtonsEl.addEventListener('click', buttonHandler);