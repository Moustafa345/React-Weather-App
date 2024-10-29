import React from 'react';
import { Sunrise, Sunset } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  city: string;
  weatherData: WeatherData;
  weatherIcon: string;
}


 const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city, weatherData, weatherIcon }) => (
  <Card className="col-span-2">
    <CardContent className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{city}</h2>
          <div className="flex items-center mt-2">
            <img src={weatherIcon} alt="Weather" className="w-16 h-16" />
            <span className="text-4xl ml-2">
              {weatherData.temperature !== null ? `${weatherData.temperature}°C` : "N/A"}
            </span>
          </div>
          <p className="text-gray-600 mt-1">Feels like {weatherData.feelsLike}°C</p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <Sunrise className="w-5 h-5" />
            <span>{weatherData.sunrise}</span>
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <Sunset className="w-5 h-5" />
            <span>{weatherData.sunset}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CurrentWeather