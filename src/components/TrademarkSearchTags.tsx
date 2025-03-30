
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrademarkSearchTagsProps {
  tags: string[];
  onRemove: (tag: string) => void;
  searching?: boolean;
}

const TrademarkSearchTags: React.FC<TrademarkSearchTagsProps> = ({ 
  tags, 
  onRemove,
  searching = false
}) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-2">
      <span className="text-sm text-gray-600">Also try searching for:</span>
      {tags.map((tag) => (
        <Badge 
          key={tag} 
          variant="outline"
          className="bg-white hover:bg-gray-50 cursor-pointer text-gray-800 px-3 py-1 rounded-full flex items-center gap-1"
          onClick={() => !searching && onRemove(tag)}
        >
          {tag}
          {!searching && (
            <X className="h-3 w-3 text-gray-500" />
          )}
        </Badge>
      ))}
    </div>
  );
};

export default TrademarkSearchTags;
