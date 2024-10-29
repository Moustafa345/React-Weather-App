import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { ForecastItem } from '../types/weather';

interface HourlyForecastProps {
  forecast: ForecastItem[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast }) => (
  <Card className="col-span-2">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
        {forecast.map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-gray-600">{item.time}h</p>
            <img src={item.icon} alt="Weather Icon" className="w-12 h-12 mx-auto" />
            <p className="font-medium">{item.temp}°C</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default HourlyForecast;