function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function search(event) {
  event.preventDefault();
  let cityName = document.getElementById("search-box").value;
  searchCity(cityName);
}

function searchCity(city) {
  let apiKey = "d9ccdc0fd101c3c5f401e42fd3575089";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let weatherDetails = document.querySelector("#weather-details");
  weatherDetails.innerHTML =
    "City: " +
    response.data.name +
    "<br>" +
    "Temperature: " +
    response.data.main.temp +
    "°C" +
    "<br>" +
    "Current time: " +
    new Date(response.data.dt * 1000).toLocaleString();
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function getCurrentPositionWeather(position) {
  let apiKey = "d9ccdc0fd101c3c5f401e42fd3575089";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPositionWeather);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);
