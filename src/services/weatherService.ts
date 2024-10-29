const API_KEY = import.meta.env.VITE_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const AIR_QUALITY_API_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour:'2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const getAirQualityDescription = (aqi: number): string => {
  const descriptions: Record<number, string> = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor"
  };
  return descriptions[aqi] || "Unknown";
};

export const fetchWeatherData = async (cityName: string) => {
  try {
    const weatherResponse = await fetch(`${WEATHER_API_URL}?q=${cityName}&units=metric&appid=${API_KEY}`);
    const weatherData = await weatherResponse.json();

    if (weatherResponse.status !== 200) {
      throw new Error(weatherData.message);
    }

    const { lat, lon } = weatherData.coord;
    
    const airQualityResponse = await fetch(`${AIR_QUALITY_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const airQualityData = await airQualityResponse.json();

    const forecastResponse = await fetch(`${FORECAST_API_URL}?q=${cityName}&units=metric&appid=${API_KEY}`);
    const forecastData = await forecastResponse.json();

    return {
      weatherData,
      airQualityData,
      forecastData
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
