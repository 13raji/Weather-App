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


function search(city) {
  let apiKey = "03ac878f5cd649f0cfd00e677d2c2dcc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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



console.log(city);
function showTemperature(response) {
  console.log(response.data);
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
}

function displayTemperatureCurrent(response) {
  console.log(response.data.main.temp);
  let searchTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${searchTemp}°C `;
  console.log(response.data.name);
  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = `${response.data.name}, (nearest weather station)`;
  celciusTemperature=Math.round(response.data.main.temp);
}

function navigate() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", navigate);
function showPosition(position) {
  let lat = Math.round(position.coords.latitude);
  let long = Math.round(position.coords.longitude);
  let currentCoords = `lat=${lat}&lon=${long}`;
  console.log(currentCoords);
  let apiKey = "03ac878f5cd649f0cfd00e677d2c2dcc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${currentCoords}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureCurrent);
  celciusTemperature=Math.round(showTemperatureCurrent.data.main.temp);
}

