import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { WeeklyForecastItem } from '../types/weather';

interface WeeklyForecastProps {
  weeklyForecast: WeeklyForecastItem[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ weeklyForecast }) => {
  const today = new Date().getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDayLabel = (dayName: string) => {
    const dayIndex = days.indexOf(dayName);
    return dayIndex === today ? "Today" : dayName;
  };

  return (
    <Card className="col-span-2">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {weeklyForecast.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-gray-600">{getDayLabel(item.day)}</p>
              <img src={item.icon} alt="Weather Icon" className="w-12 h-12 mx-auto" />
              <p className="font-medium">{item.minTemp}°C - {item.maxTemp}°C</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyForecast;