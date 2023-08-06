// Storing the API-key of the weather application ('https://openweathermap.org')
const apiKey = 'c3de739f550fa36cde39cc673defbe6e';

// DOM (input - City Search)
let search = document.querySelector('.search-box');

// DOM referencing for certain parameters of a weather report
let city = document.querySelector('.city');
let date = document.querySelector('.date');
let temp = document.querySelector('.temp');
let weather = document.querySelector('.weather');
let highLow = document.querySelector('.hi-low');

// displaying weather-report for a default-location 
getResults('Jamshedpur');

// listening to keypress-event
search.addEventListener("keypress", setQuery);

function setQuery(event) {

  if (event.keyCode === 13)
    getResults(search.value);
}

// Calling the weather-API (query-creation)
function getResults(query) {

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`)
    .then(weather => weather.json())
    .then(response => displayResults(response));
}

function displayResults(weather) {

  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  date.innerText = getCalendar(now);

  temp.innerText = `${Math.round(weather.main.temp)} °C`;
  weather.innerText = `${weather.weather[0].main}`;
  highLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

// Formatting the Date-Object
function getCalendar(currDate) {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let year = currDate.getFullYear();
  let day = currDate.getDay();
  let currentDate = currDate.getDate();
  let month = currDate.getMonth();
  return `${days[day]}, ${currentDate} ${months[month]} ${year}`;
}


