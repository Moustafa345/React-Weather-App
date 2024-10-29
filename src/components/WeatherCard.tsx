import React from "react";

interface WeatherCardProps {
  data: {
    city: string;
    date: string;
    temperature: number;
    description: string;
    icon: string;
    tempMax: number;
    tempMin: number;
    wind: number;
    humidity: number;
    visibility: number;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
        <div className="font-bold text-xl">{data.city}</div>
        <div className="text-sm text-gray-500">{data.date}</div>

        <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
          <img
            className="w-32 h-32"
            src={`http://openweathermap.org/img/wn/${data.icon}.png`}
            alt={data.description}
          />
        </div>

        <div className="flex flex-row items-center justify-center mt-6">
          <div className="font-medium text-6xl">{Math.round(data.temperature)}°</div>
          <div className="flex flex-col items-center ml-6">
            <div className="capitalize">{data.description}</div>
            <div className="mt-1">
              <span className="text-sm">
                <i className="far fa-long-arrow-up"></i>
              </span>
              <span className="text-sm font-light text-gray-500">{Math.round(data.tempMax)}°C</span>
            </div>
            <div>
              <span className="text-sm">
                <i className="far fa-long-arrow-down"></i>
              </span>
              <span className="text-sm font-light text-gray-500">{Math.round(data.tempMin)}°C</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-6">
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Wind</div>
            <div className="text-sm text-gray-500">{data.wind} k/h</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Humidity</div>
            <div className="text-sm text-gray-500">{data.humidity}%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-medium text-sm">Visibility</div>
            <div className="text-sm text-gray-500">{data.visibility} km</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
