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

function changeCity(event){
  event.preventDefault;
  

}

let cityDivert = document.querySelector("#city-divert-Cardiff");
cityDivert.addEventListener("click", changeCity);


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
  celciusTemperature=Math.round(response.data.main.temp);
}

function displayTemperatureCurrent(response) {
  console.log(response.data.main.temp);
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
  console.log(currentCoords);
  let apiKey = "03ac878f5cd649f0cfd00e677d2c2dcc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${currentCoords}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperatureCurrent);
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

