
import React from 'react';
import { TrademarkResult } from '@/types/trademark';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TrademarkCardProps {
  trademark: TrademarkResult;
  viewType: 'grid' | 'list';
}

const TrademarkCard: React.FC<TrademarkCardProps> = ({ trademark, viewType }) => {
  const statusClass = trademark.status.toLowerCase().includes('registered') 
    ? 'registered-status' 
    : trademark.status.toLowerCase().includes('pending')
    ? 'pending-status'
    : trademark.status.toLowerCase().includes('abandoned')
    ? 'abandoned-status'
    : 'others-status';

  // Format dates
  const formattedFilingDate = trademark.filingDate 
    ? format(new Date(trademark.filingDate), 'dd MMM yyyy')
    : '';
  
  // Extract status text (remove "Live / " if present)
  const statusText = trademark.status.replace('Live / ', '');

  // Determine which classes to show
  const renderClasses = () => {
    return trademark.class.map((cls, i) => (
      <div key={i} className="flex items-center text-xs">
        <span className="bg-gray-100 rounded px-1.5 py-0.5 text-gray-700">
          Class {cls}
        </span>
      </div>
    ));
  };

  return (
    <div className={cn(
      "border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow",
      viewType === 'list' ? "flex" : "flex flex-col"
    )}>
      <div className={cn(
        "flex items-center justify-center bg-gray-100 overflow-hidden",
        viewType === 'list' ? "w-24 h-24" : "w-full h-32"
      )}>
        <img 
          src={trademark.imageUrl || "/placeholder.svg"} 
          alt={trademark.mark} 
          className="object-contain max-h-full max-w-full"
        />
      </div>
      
      <div className={cn(
        "flex flex-col p-3", 
        viewType === 'list' ? "flex-1" : "",
        viewType === 'grid' ? "h-48" : ""
      )}>
        <div className={cn(
          "flex", 
          viewType === 'list' ? "items-start justify-between" : "flex-col gap-1"
        )}>
          <div>
            <h3 className="font-semibold text-gray-900">{trademark.mark}</h3>
            <p className="text-sm text-gray-600">{trademark.owner}</p>
          </div>
          
          <div className={cn(
            "flex items-center",
            viewType === 'list' ? "ml-4" : "mt-2"
          )}>
            <span className={cn("text-sm font-medium", statusClass)}>
              {statusText}
            </span>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-800">{trademark.description}</p>
        </div>
        
        <div className="mt-auto pt-2">
          <div className="flex flex-wrap gap-1 mb-1">
            {renderClasses()}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <div>
              <span>{trademark.serialNumber}</span>
            </div>
            <div>
              <span>{formattedFilingDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrademarkCard;
