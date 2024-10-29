import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import AirQuality from './components/AirQuality';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import LoadingCard from './components/LoadingCard';
import { fetchWeatherData, formatTime, getAirQualityDescription, getWindDirection } from './services/weatherService';
import { WeatherData, ForecastItem, WeeklyForecastItem, AirQualityData, PopulationItem } from './types/weather';
import backgroundImg from '/weather-background.jpg';
import Population from './components/Population';
import { Card, CardContent } from './components/ui/card';

const App: React.FC = () => {
  const [city, setCity] = useState<string>("Cairo");
  const [inputCity, setInputCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: null,
    feelsLike: null,
    humidity: null,
    windSpeed: null,
    windDirection: null,
    sunrise: null,
    sunset: null,
    visibility: null,
    pressure: null,
  });
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastItem[]>([]);
  const [weatherIcon, setWeatherIcon] = useState<string>("");
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [population, setPopulation] = useState<PopulationItem | null>(null);

  const getDailyMinMaxTemp = (forecasts: any[]): { min: number; max: number } => {
    const temps = forecasts.map(f => f.main.temp);
    return {
      min: Math.round(Math.min(...temps)),
      max: Math.round(Math.max(...temps))
    };
  };

  const updateWeatherData = async (cityName: string) => {
    setIsLoading(true);
    try {
      const { weatherData: weather, airQualityData, forecastData } = await fetchWeatherData(cityName);
      
      setCity(weather.name);
      setWeatherData({
        temperature: Math.round(weather.main.temp),
        feelsLike: Math.round(weather.main.feels_like),
        humidity: weather.main.humidity,
        windSpeed: Math.round(weather.wind.speed * 3.6),
        windDirection: getWindDirection(weather.wind.deg),
        sunrise: formatTime(weather.sys.sunrise),
        sunset: formatTime(weather.sys.sunset),
        visibility: Math.round(weather.visibility / 1000),
        pressure: weather.main.pressure,
      });

      const iconCode = weather.weather[0].icon;
      setWeatherIcon(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);

      setAirQuality({
        index: airQualityData.list[0].main.aqi,
        description: getAirQualityDescription(airQualityData.list[0].main.aqi)
      });

      setPopulation(forecastData.city.population);

      // Process hourly forecast
      const processedForecast: ForecastItem[] = forecastData.list.slice(0, 5).map((item: any) => ({
        time: new Date(item.dt * 1000).getHours(),
        temp: Math.round(item.main.temp),
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      }));
      setForecast(processedForecast);

      // Process weekly forecast
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dailyForecasts: WeeklyForecastItem[] = [];
      
      // Group forecasts by day and calculate min/max temps
      for (let i = 0; i < forecastData.list.length; i += 8) {
        const dayForecasts = forecastData.list.slice(i, i + 8);
        if (dayForecasts.length > 0) {
          const { min: minTemp, max: maxTemp } = getDailyMinMaxTemp(dayForecasts);
          const date = new Date(dayForecasts[0].dt * 1000);
          
          dailyForecasts.push({
            day: days[date.getDay()],
            minTemp,
            maxTemp,
            icon: `https://openweathermap.org/img/wn/${dayForecasts[0].weather[0].icon}@2x.png`
          });
        }
      }
      
      setWeeklyForecast(dailyForecasts);

    } catch (error) {
      console.error("Error updating weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateWeatherData("Cairo");
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (inputCity.trim()) updateWeatherData(inputCity.trim());
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-3xl mx-auto space-y-6">
        <SearchBar 
          inputCity={inputCity} 
          setInputCity={setInputCity} 
          onSearch={handleSearch}
          disabled={isLoading}
        />

        <div className="flex flex-col md:grid md:grid-cols-2  gap-6">
          {isLoading ? (
            <>
              <LoadingCard className="col-span-2" />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard className="col-span-2" />
              <LoadingCard className="col-span-2" />
            </>
          ) : (
            <>
              <CurrentWeather 
                city={city} 
                weatherData={weatherData} 
                weatherIcon={weatherIcon} 
              />
              <WeatherDetails weatherData={weatherData}/>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">Air Quality & Population</h3>
                  {airQuality && <AirQuality airQuality={airQuality} />}
                  {population && <Population population={population} />}
                </CardContent>
              </Card>              
              <HourlyForecast forecast={forecast} />
              <WeeklyForecast weeklyForecast={weeklyForecast} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
