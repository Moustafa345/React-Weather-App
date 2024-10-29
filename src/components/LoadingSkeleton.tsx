import React from 'react';

const LoadingSkeleton: React.FC = () => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

export default LoadingSkeleton;