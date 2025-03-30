import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FilterOption, SearchFilters } from '@/types/trademark';
import { cn } from '@/lib/utils';

interface TrademarkFiltersProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

const TrademarkFilters: React.FC<TrademarkFiltersProps> = ({ filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);
  
  // Keep local filters in sync with prop filters
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (category: keyof SearchFilters, filterId: string, checked: boolean) => {
    const updatedFilters = {
      ...localFilters,
      [category]: localFilters[category].map(item => 
        item.id === filterId ? { ...item, checked } : item
      )
    };
    
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const filterItems = (items: FilterOption[]) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderFilterGroup = (
    category: keyof SearchFilters,
    title: string,
    items: FilterOption[]
  ) => {
    const filteredItems = filterItems(items);
    
    return (
      <div className="py-2">
        <h3 className="mb-2 font-medium text-sm">{title}</h3>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${category}-${item.id}`}
                    checked={item.checked}
                    onCheckedChange={(checked) => 
                      handleFilterChange(category, item.id, checked === true)
                    }
                  />
                  <label 
                    htmlFor={`${category}-${item.id}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No {title.toLowerCase()} found</p>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const getActiveFiltersCount = () => {
    return Object.values(localFilters).reduce((count, filterGroup) => {
      return count + filterGroup.filter(item => item.checked).length;
    }, 0);
  };

  const activeCount = getActiveFiltersCount();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "flex items-center gap-1 border-gray-300 shadow-sm", 
            activeCount > 0 && "border-blue-600 text-blue-600"
          )}
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          {activeCount > 0 && (
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="p-3 border-b">
          <Input
            placeholder="Search filters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8"
          />
        </div>
        <Tabs defaultValue="status" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="owners">Owners</TabsTrigger>
            <TabsTrigger value="lawFirms">Law Firms</TabsTrigger>
            <TabsTrigger value="attorneys">Attorneys</TabsTrigger>
          </TabsList>
          <div className="px-3">
            <TabsContent value="status">
              {renderFilterGroup('status', 'Status', localFilters.status)}
            </TabsContent>
            <TabsContent value="owners">
              {renderFilterGroup('owners', 'Owners', localFilters.owners)}
            </TabsContent>
            <TabsContent value="lawFirms">
              {renderFilterGroup('lawFirms', 'Law Firms', localFilters.lawFirms)}
            </TabsContent>
            <TabsContent value="attorneys">
              {renderFilterGroup('attorneys', 'Attorneys', localFilters.attorneys)}
            </TabsContent>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default TrademarkFilters;
