
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { searchTrademarks, getAvailableFilters } from '@/services/trademarkService';
import { SearchStatus, TrademarkResult, SearchFilters } from '@/types/trademark';
import TrademarkHeader from '@/components/TrademarkHeader';
import TrademarkFilters from '@/components/TrademarkFilters';
import TrademarkResults from '@/components/TrademarkResults';
import StatusIndicator from '@/components/StatusIndicator';
import TrademarkSearchTags from '@/components/TrademarkSearchTags';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  
  const { toast } = useToast();
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [results, setResults] = useState<TrademarkResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<SearchFilters>(getAvailableFilters());
  const [relatedTags, setRelatedTags] = useState<string[]>([]);

  // Handle search functionality
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    try {
      setStatus('searching');
      setSearchParams({ query: searchQuery });

      // Generate related search tags
      if (searchQuery.toLowerCase().includes('nike')) {
        setRelatedTags(['Nike', 'Just Do It', 'Swoosh']);
      } else if (searchQuery.toLowerCase().includes('meta')) {
        setRelatedTags(['Meta', 'Facebook', 'Instagram']);
      } else {
        setRelatedTags(['Nike', 'Adidas', 'Meta']);
      }

      const response = await searchTrademarks({ query: searchQuery });
      
      setResults(response.results);
      setTotalResults(response.total);
      setStatus(response.results.length > 0 ? 'success' : 'no-results');
    } catch (error) {
      console.error('Search error:', error);
      setStatus('error');
      toast({
        title: 'Search Error',
        description: 'An error occurred while searching. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    
    // Apply filters to results
    // This is simplified - in a real app, you'd want to call the API with the new filters
    // For demo purposes, we'll just filter the existing results
    const activeStatusFilters = newFilters.status
      .filter(item => item.checked)
      .map(item => item.name);
      
    const activeOwnerFilters = newFilters.owners
      .filter(item => item.checked)
      .map(item => item.name);
      
    // Re-fetch results with new filters
    handleSearch(query);
  };
  
  // Handle tag click
  const handleTagClick = (tag: string) => {
    setRelatedTags(prevTags => prevTags.filter(t => t !== tag));
    handleSearch(tag);
  };
  
  // Handle view type change
  const handleViewTypeChange = (type: 'grid' | 'list') => {
    setViewType(type);
  };

  // Copy current URL to clipboard
  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link Copied',
      description: 'Search link has been copied to clipboard',
    });
  };

  // Initial search based on URL query params
  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TrademarkHeader initialQuery={query} onSearch={handleSearch} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          {/* Status and Filters Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <StatusIndicator 
              status={status} 
              query={query} 
              totalResults={totalResults} 
            />
            
            <div className="flex items-center gap-2">
              <TrademarkFilters 
                filters={filters} 
                onFilterChange={handleFilterChange} 
              />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300 shadow-sm"
                onClick={handleShareLink}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Related Search Tags */}
          <TrademarkSearchTags 
            tags={relatedTags} 
            onRemove={handleTagClick} 
            searching={status === 'searching'}
          />
          
          {/* Results Section */}
          <TrademarkResults 
            results={results} 
            viewType={viewType} 
            onViewTypeChange={handleViewTypeChange} 
            loading={status === 'searching'}
          />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Trademarkia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
