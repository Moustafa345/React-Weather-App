import React, { ReactNode } from 'react';

interface WeatherDetailItemProps {
  icon: ReactNode;
  label: string;
  value: string | null;
}

const WeatherDetailItem: React.FC<WeatherDetailItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value ?? "N/A"}</p>
    </div>
  </div>
);


export default WeatherDetailItem;