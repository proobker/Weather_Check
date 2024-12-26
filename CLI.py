import requests

def fetch_weather(location):
    API_KEY = "Your_API_Key"  # Replace with your WeatherAPI key
    BASE_URL = "https://api.weatherapi.com/v1/current.json"

    try:
        params = {"key": API_KEY, "q": location, "aqi": "no"}
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()  # Raise an error for bad responses

        data = response.json()
        weather = {
            "location": data["location"]["name"],
            "region": data["location"]["region"],
            "country": data["location"]["country"],
            "temperature": data["current"]["temp_c"],
            "condition": data["current"]["condition"]["text"],
            "humidity": data["current"]["humidity"],
            "wind_kph": data["current"]["wind_kph"],
        }
        return weather
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather: {e}")
        return None

if __name__ == "__main__":
    location = input("Enter a location (e.g., Kathmandu): ")
    weather = fetch_weather(location)
    if weather:
        print(f"\nWeather in {weather['location']}, {weather['region']}, {weather['country']}:")
        print(f"Temperature: {weather['temperature']}°C")
        print(f"Condition: {weather['condition']}")
        print(f"Humidity: {weather['humidity']}%")
        print(f"Wind Speed: {weather['wind_kph']} km/h")
    else:
        print("Could not fetch weather information.")
