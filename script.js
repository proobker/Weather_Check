const API_KEY = 'b660e54c3b3b40af96493619242612'; // Replace with your WeatherAPI key
        const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';
        const LOCATION = 'Kathmandu'; // Replace with your desired location

        async function fetchWeather() {
            try {
                const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${LOCATION}&days=7`);
                const data = await response.json();
                displayForecast(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        function displayForecast(data) {
            const forecastDiv = document.getElementById('forecast');
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

        fetchWeather();