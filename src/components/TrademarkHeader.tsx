
import React from 'react';
import { Link } from 'react-router-dom';
import TrademarkSearchbar from './TrademarkSearchbar';

interface TrademarkHeaderProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

const TrademarkHeader: React.FC<TrademarkHeaderProps> = ({ initialQuery, onSearch }) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-700 mr-8">
              Trademarkia
            </Link>
          </div>
          <div className="flex-1 max-w-2xl">
            <TrademarkSearchbar 
              initialQuery={initialQuery} 
              onSearch={onSearch} 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TrademarkHeader;
