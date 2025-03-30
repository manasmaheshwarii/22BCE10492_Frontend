
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface TrademarkSearchbarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

const TrademarkSearchbar: React.FC<TrademarkSearchbarProps> = ({ 
  initialQuery = '', 
  onSearch 
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search Trademark: Nike, Mickey Mouse"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10 pl-4 py-2 w-full border rounded-md focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default TrademarkSearchbar;
