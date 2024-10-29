import React from 'react';
import { Card, CardContent } from '../components/ui/card';

const LoadingCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Card className={className}>
    <CardContent className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default LoadingCard;