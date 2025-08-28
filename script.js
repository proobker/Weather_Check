const API_KEY = '########################'; // Replace with your WeatherAPI key
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

async function fetchWeather() {
    const locationInput = document.getElementById('location').value;
    if (!locationInput.trim()) {
        alert('Please enter a location.');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${locationInput}&days=7`);
        if (!response.ok) {
            throw new Error('Location not found or invalid request.');
        }

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please check the location and try again.');
    }
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = ''; // Clear previous forecast

    const forecasts = data.forecast.forecastday;

    forecasts.forEach(day => {
        const date = day.date;
        const condition = day.day.condition.text;
        const icon = day.day.condition.icon;
        const maxTemp = day.day.maxtemp_c;
        const minTemp = day.day.mintemp_c;

        forecastDiv.innerHTML += `
            <div class="forecast-card">
                <h2>${date}</h2>
                <img src="https:${icon}" alt="${condition}">
                <p>${condition}</p>
                <p>Max: ${maxTemp}°C</p>
                <p>Min: ${minTemp}°C</p>
            </div>
        `;
    });
}
