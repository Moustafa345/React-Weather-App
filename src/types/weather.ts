export interface WeatherData {
  temperature: number | null;
  feelsLike: number | null;
  humidity: number | null;
  windSpeed: number | null;
  windDirection: string | null;
  sunrise: string | null;
  sunset: string | null;
  visibility: number | null;
  pressure: number | null;
}

export interface ForecastItem {
  time: number;
  temp: number;
  icon: string;
}
export interface PopulationItem {
  population: string ;
}

export interface WeeklyForecastItem {
  day: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
}

export interface AirQualityData {
  index: number;
  description: string;
}
