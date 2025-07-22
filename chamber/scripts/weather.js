const myKey = "fc680655f0c6eb19e6985bcd5ab44708"
const myLat = "-24.722567028550277"
const myLong = "-53.740111384469564"

const currentWeatherURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;
const forecastURL = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch() {
  try {
    const currentResponse = await fetch(currentWeatherURL);
    if (currentResponse.ok) {
      const currentData = await currentResponse.json();
      displayCurrentWeather(currentData);
    }

    const forecastResponse = await fetch(forecastURL);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);
    }
  } catch (error) {
    console.log(error);
  }
}

function displayCurrentWeather(data) {
    const myTown = document.querySelector("#town");
    const myDescription = document.querySelector("#description");
    const myTemperature = document.querySelector("#temperature");
    const myGraphic = document.querySelector("#graphic");
    
    myTown.innerHTML = data.name; 
    myDescription.innerHTML = data.weather[0].description;
    myTemperature.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute("src", iconsrc);
    myGraphic.setAttribute("alt", data.weather[0].description);
}

function displayForecast(data) {
    const forecastContainer = document.querySelector("#forecast");
    if (!forecastContainer) return;

    const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);
    
    const forecastHTML = dailyForecasts.map(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        return `
            <div class="forecast-day">
                <p class="forecast-date">${dayName}</p>
                <p class="forecast-temp">${Math.round(forecast.main.temp)}&deg;F</p>
            </div>
        `;
    }).join('');
    
    forecastContainer.innerHTML = `<h3>3-Day Forecast</h3>${forecastHTML}`;
}

apiFetch();