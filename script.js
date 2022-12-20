var cityInput = document.getElementById('city');
var forecast = document.getElementById('forecast-container');
var citySearch = document.getElementById('city-search-term');
var search_btn = document.getElementById('search');
var previousButtonsEl = document.querySelector('#previous-buttons');
var title = document.getElementById('title');
var previousBtn = document.getElementById('previous-buttons');
c_weather = document.getElementById('current_weather');
currentContainer = document.getElementById('c-container');
var cSearch = document.getElementById('c-search-term');

var long;
var lat;
var previousCity;

var searchHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();
    localStorage.setItem("city", city);
if (city) {
    getCityname(city);
    displayPrevious();

    forecast.textContent = '';
    cityInput.value = '';
    citySearch.textContent = "- " + city;
    cSearch.textContent = '- ' + city;
} else {
    alert('Please enter a valid city name');
}
};

var displayPrevious = function(){
    previousCity = localStorage.getItem("city");
    var previous = document.createElement('button');
    previous.dataset.city = previousCity;
    previous.classList = "p-Btns";
    previous.textContent = previousCity;

    previousBtn.appendChild(previous);
}

var buttonHandler = function(event) {
    var p_clicked = event.target.getAttribute('data-city');

    if(previous) {
        getCityname(p_clicked);

        forecast.textContent = '';
        citySearch.textContent = '- ' + event.target.innerHTML;
    }
};

var getCityname = function (city) {
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=c5a5ec0037fb9829d9254f1a67b4d869';

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data){
                console.log(data);
                long = data[0].lon;
                lat = data[0].lat;
                getCurrentWeather(lat,long);
                getForecast(lat,long);
            });
        }
    })
};

var getCurrentWeather = function(lat,long) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=imperial&appid=c5a5ec0037fb9829d9254f1a67b4d869';
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data){
                console.log(data);
                displayCurrent(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }

    });
};

var displayCurrent = function(data) {
    c_weather.classList.remove('hide');

    var c_date = dayjs(data.dt_txt).format('MM/DD/YYYY');
    var c_temp = data.main.temp;
    var c_humidity = data.main.humidity + '%';
    var c_descrip = data.weather[0].description;
    var c_wind = data.wind.speed;

    var c_Container = document.createElement('div');
    c_Container.classList = 'c_current';

    var c_dateEl = document.createElement('div');
    c_dateEl.classList = 'card-header'
    c_dateEl.textContent = c_date;

    c_Container.appendChild(c_dateEl);

    var c_listEl = document.createElement('ul');
    c_listEl.classList = 'list-group list-group-flush';
    
    c_dateEl.appendChild(c_listEl);

    var c_image = document.createElement('li');
    c_image.classList = 'list-group-item';
    if (data.clouds.all < 10) {
        c_image.innerHTML = '  <img src="./assets:images/sun.png" alt="sunny" width="222" height="222">';
    } else if (data.clouds.all < 50 && data.clouds.all > 10) {
        c_image.innerHTML = '<img src="./assets:images/cloudy.png" alt="little cloudy" width="222" height="222">';
    } else {
        c_image.innerHTML = '  <img src="./assets:images/cloud.png" alt="cloudy" width="222" height="222">';
    }

    c_listEl.appendChild(c_image);

    var c_tempEl = document.createElement('li');
    c_tempEl.classList = 'list-group-item';
    c_tempEl.textContent = 'Temperature: ' + Math.round(c_temp) + 'F';

    c_listEl.appendChild(c_tempEl);

    var c_humidityEl = document.createElement('li');
    c_humidityEl.classList = 'list-group-item';
    c_humidityEl.textContent = 'Humidity: ' + c_humidity;

    c_listEl.appendChild(c_humidityEl);

    var c_windEl = document.createElement('li');
    c_windEl.classList = 'list-group-item';
    c_windEl.textContent = 'Wind: ' + c_wind + 'MPH';

    c_listEl.appendChild(c_windEl);

    var c_descripEl = document.createElement('li');
    c_descripEl.classList = 'list-group-item';
    c_descripEl.textContent = c_descrip;

    c_listEl.appendChild(c_descripEl);

    currentContainer.appendChild(c_Container);

    $("div.c_current").prev().addClass('hide');


};


var getForecast = function(lat,long) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&units=imperial&appid=c5a5ec0037fb9829d9254f1a67b4d869';
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
    title.classList.remove('hide');

    for (var i = 1; i < list.length; i=i+8) {
        var date = dayjs(list[i].dt_txt).format('MM/DD/YYYY');
        var temp = list[i].main.temp;
        var humidity = list[i].main.humidity + '%';
        var descrip = list[i].weather[0].description;
        var wind = list[i].wind.speed;

        
        var forecastContainer = document.createElement('div');
        forecastContainer.classList = 'card';

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

        var windEl = document.createElement('li');
        windEl.classList = 'list-group-item';
        windEl.textContent = 'Wind: ' + wind + 'MPH';

        listEl.appendChild(windEl);

        var descripEl = document.createElement('li');
        descripEl.classList = 'list-group-item';
        descripEl.textContent = descrip;

        listEl.appendChild(descripEl);

        forecast.appendChild(forecastContainer);

    }
};  


search_btn.addEventListener('click', searchHandler);
previousButtonsEl.addEventListener('click', buttonHandler);