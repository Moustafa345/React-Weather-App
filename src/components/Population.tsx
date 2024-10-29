import React from 'react'
import { PopulationItem } from '../types/weather';

interface populationProps {
    population: PopulationItem;
}


const formatPopulation = (population: number): string => {
    if (population >= 1_000_000) {
      return `${(population / 1_000_000).toFixed(1)}M`;
    } else if (population >= 1_000) {
      return `${(population / 1_000).toFixed(1)}K`;
    } else {
      return population.toString();
    }
  };
  

 const Population : React.FC<populationProps> = ({population}) => {
  return (
    <div className="pt-6 border-t border-gray-200">
    <div className="flex items-center justify-between">
      <span className="text-gray-600">City Population</span>
      <span className="font-semibold">
        {population
          ? formatPopulation(Number(population))
          : 'N/A'}
      </span>
    </div>
  </div>
  )
}


export default Population