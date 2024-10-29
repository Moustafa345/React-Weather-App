import React from 'react';
import { Wind, Droplets, Thermometer } from 'lucide-react';
import { MdOutlineVisibility } from 'react-icons/md';
import { Card, CardContent } from '../components/ui/card';
import { WeatherData } from '../types/weather';
import  WeatherDetailItem  from './WeatherDetailItem';

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weatherData }) => (
  <Card>
    <CardContent className="p-6 space-y-4 flex-wrap">
      <h3 className="text-lg font-semibold">Weather Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <WeatherDetailItem
          icon={<Wind className="w-5 h-5 text-blue-500" />}
          label="Wind"
          value={`${weatherData.windSpeed} km/h ${weatherData.windDirection}`}
        />
        <WeatherDetailItem
          icon={<Droplets className="w-5 h-5 text-blue-500" />}
          label="Humidity"
          value={`${weatherData.humidity}%`}
        />
        <WeatherDetailItem
          icon={<Thermometer className="w-5 h-5 text-blue-500" />}
          label="Pressure"
          value={`${weatherData.pressure} hPa`}
        />
        <WeatherDetailItem
          icon={<MdOutlineVisibility className="w-5 h-5 text-blue-500" />}
          label="Visibility"
          value={`${weatherData.visibility} km`}
        />
      </div>
    </CardContent>
  </Card>
);


export default WeatherDetails;