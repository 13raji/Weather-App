let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
let time = `${hour}:${minutes}`;

let timeDayStamp = document.querySelector("#date-time-stamp");
timeDayStamp.innerHTML = `${day} ${time}`;

function formatHours(timestamp){
   let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`
}

function displayForecast(response) {
  let forecastElement= document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast= null;
  for (let index= 0; index < 6; index++){
    forecast = response.data.list[index];
    forecastElement.innerHTML+= `
        <div class="col-2 hours-forecast">
           <h7>
           ${formatHours(forecast.dt * 1000)}
           </h7>
           <h6 id="forecast-temp">
           ${Math.round(forecast.main.temp)}°C
           </h6>
           <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" , alt="forecast.weather[0].description" class="icon"/>
          <h7>
          Feels like ${Math.round(forecast.main.feels_like)}°C
          </h7>
        </div>`
  }
  
}

function search(city) {
  let apiKey = "03ac878f5cd649f0cfd00e677d2c2dcc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  let apiUrlForecast=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", handleSubmit);

search("London");

function showTemperature(response) {
  let currentTempElement = document.querySelector("#current-temp");
  let currentCityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description")
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let searchTemp = Math.round(response.data.main.temp);
  let feelsLikeTemp= Math.round(response.data.main.feels_like);
  let windSpeedElement= Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  currentTempElement.innerHTML = `${searchTemp}°C `;
  currentCityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = `Feels like ${feelsLikeTemp}°C `;
  humidityElement.innerHTML = `Humidity = ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind speed = ${windSpeedElement}mps`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celciusTemperature=Math.round(response.data.main.temp);
}

function displayTemperatureCurrent(response) {
  let searchTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${searchTemp}°C `;
  console.log(response.data);
  let currentLocation = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description")
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLikeTemp= Math.round(response.data.main.feels_like);
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let windSpeedElement= Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  currentLocation.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = `Feels like ${feelsLikeTemp}°C `;
  humidityElement.innerHTML = `Humidity = ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind speed = ${windSpeedElement}mps`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celciusTemperature=Math.round(response.data.main.temp);
}
function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let long = Math.round(position.coords.longitude);
  let currentCoords = `lat=${lat}&lon=${long}`;
  let apiKey = "03ac878f5cd649f0cfd00e677d2c2dcc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${currentCoords}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperatureCurrent);

  let apiUrlForecast=`https://api.openweathermap.org/data/2.5/forecast?q=${currentCoords}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function navigate() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", navigate);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  let currentTempElement = Math.round(fahrenheitTemperature);
  temperatureElement.innerHTML = `${currentTempElement}°F`;
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let currentTempElement = Math.round(celciusTemperature);
  temperatureElement.innerHTML = `${currentTempElement}°C`;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}


let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", displayCelciusTemperature);

function cityDivert(event) {
  event.preventDefault;
  console.log(event.target.innerHTML);
  let cityDivertElement = event.target.innerHTML;
  search(`${cityDivertElement}`);
}

let cityLink = document.querySelector(".city-divert");
cityLink.addEventListener("click", cityDivert);
