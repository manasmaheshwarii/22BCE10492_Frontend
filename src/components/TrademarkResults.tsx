
import React from 'react';
import { TrademarkResult } from '@/types/trademark';
import TrademarkCard from './TrademarkCard';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

interface TrademarkResultsProps {
  results: TrademarkResult[];
  viewType: 'grid' | 'list';
  onViewTypeChange: (viewType: 'grid' | 'list') => void;
  loading?: boolean;
}

const TrademarkResults: React.FC<TrademarkResultsProps> = ({ 
  results,
  viewType,
  onViewTypeChange,
  loading = false
}) => {
  if (loading) {
    // Return skeleton loaders
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Results</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewTypeChange('grid')}
              className={viewType === 'grid' ? 'bg-gray-100' : ''}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewTypeChange('list')}
              className={viewType === 'list' ? 'bg-gray-100' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className={viewType === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
          : "space-y-4"
        }>
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index} 
              className="border rounded-lg p-4 h-48 animate-pulse bg-gray-50"
            >
              <div className="h-6 bg-gray-200 rounded mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-6 w-4/5"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No trademarks found</h3>
        <p className="mt-1 text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Results</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewTypeChange('grid')}
            className={viewType === 'grid' ? 'bg-gray-100' : ''}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewTypeChange('list')}
            className={viewType === 'list' ? 'bg-gray-100' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={viewType === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
        : "space-y-4"
      }>
        {results.map((trademark) => (
          <TrademarkCard 
            key={trademark.id} 
            trademark={trademark} 
            viewType={viewType} 
          />
        ))}
      </div>
    </div>
  );
};

export default TrademarkResults;
