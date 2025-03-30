
export interface TrademarkResult {
  id: string;
  mark: string;
  owner: string;
  status: 'Live / Registered' | 'Pending' | 'Abandoned' | 'Others';
  serialNumber: string;
  registrationNumber?: string;
  filingDate: string;
  registrationDate?: string;
  class: string[];
  description: string;
  imageUrl?: string;
}

export interface SearchParams {
  query: string;
  country?: string;
  owner?: string;
  lawFirm?: string;
  attorney?: string;
  status?: string;
  page?: number;
}

export type SearchStatus = 'idle' | 'searching' | 'success' | 'error' | 'no-results';

export interface FilterOption {
  id: string;
  name: string;
  checked: boolean;
}

export interface SearchFilters {
  status: FilterOption[];
  owners: FilterOption[];
  lawFirms: FilterOption[];
  attorneys: FilterOption[];
}
