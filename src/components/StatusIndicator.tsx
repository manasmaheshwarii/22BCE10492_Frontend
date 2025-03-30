
import React from 'react';
import { Loader2, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { SearchStatus } from '@/types/trademark';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: SearchStatus;
  query: string;
  totalResults?: number;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  query, 
  totalResults = 0,
  className
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {status === 'searching' && (
        <div className="flex items-center text-blue-600">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Searching for "{query}"...</span>
        </div>
      )}
      
      {status === 'success' && totalResults > 0 && (
        <div className="flex items-center text-gray-700">
          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          <span>About {totalResults} Trademarks found for "{query}"</span>
        </div>
      )}
      
      {status === 'no-results' && (
        <div className="flex items-center text-amber-600">
          <AlertCircle className="mr-2 h-4 w-4" />
          <span>No results found for "{query}"</span>
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex items-center text-red-600">
          <XCircle className="mr-2 h-4 w-4" />
          <span>An error occurred while searching for "{query}"</span>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
