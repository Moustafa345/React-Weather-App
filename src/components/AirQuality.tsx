
import React from 'react';
import { AirQualityData } from '../types/weather';

interface AirQualityProps {
  airQuality: AirQualityData | null;
}


 const AirQuality: React.FC<AirQualityProps> = ({ airQuality }) => {
  return <div>

    {airQuality && (
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Air Quality Index</span>
          <span
            className={`font-semibold ${airQuality.index <= 2
                ? 'text-green-500'
                : airQuality.index <= 3
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
          >
            {airQuality.description}
          </span>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${airQuality.index <= 2
                ? 'bg-green-500'
                : airQuality.index <= 3
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            style={{ width: `${(airQuality.index / 5) * 100}%` }}
          />
        </div>


      </div>
    )}
  </div>


}

export default AirQuality