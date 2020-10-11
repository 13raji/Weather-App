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

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  let cityEntered = document.querySelector("#city");
  cityEntered.innerHTML = searchInput.value;
  console.log(searchInput.value);
  let city = searchInput.value;
  let apiKey = "03ac878f5cd649f0cfd00e677d2c2dcc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", search);

console.log(city);
function showTemperature(response) {
  console.log(response.data.main.temp);
  let searchTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${searchTemp}°C `;
}

function showTemperatureCurrent(response) {
  console.log(response.data.main.temp);
  let searchTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${searchTemp}°C `;
  console.log(response.data.name);
  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = `${response.data.name}, (nearest weather station)`;
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
}
function changeToFarenheit() {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "72°F 🌤";
}

let selectFarenheit = document.querySelector("#farenheit");
selectFarenheit.addEventListener("click", changeToFarenheit);

function changeToCelcius() {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "22°C 🌤";
}

let selectCelcius = document.querySelector("#celcius");
selectCelcius.addEventListener("click", changeToCelcius);
