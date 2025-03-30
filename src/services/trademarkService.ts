
import { SearchParams, TrademarkResult } from "@/types/trademark";

// This URL would typically be from your environment variables
const API_URL = "https://api.example.com/trademarks";

export async function searchTrademarks(params: SearchParams): Promise<{
  results: TrademarkResult[];
  total: number;
}> {
  try {
    // For demo purposes, we'll simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock response - in a real application, this would call the actual API
    return {
      results: mockTrademarks.filter(tm => 
        tm.mark.toLowerCase().includes(params.query.toLowerCase()) ||
        tm.owner.toLowerCase().includes(params.query.toLowerCase())
      ),
      total: mockTrademarks.length
    };
    
    // Real API call would look like this:
    /*
    const queryParams = new URLSearchParams();
    queryParams.append("query", params.query);
    if (params.country) queryParams.append("country", params.country);
    if (params.owner) queryParams.append("owner", params.owner);
    if (params.lawFirm) queryParams.append("lawFirm", params.lawFirm);
    if (params.attorney) queryParams.append("attorney", params.attorney);
    if (params.status) queryParams.append("status", params.status);
    if (params.page) queryParams.append("page", params.page.toString());

    const response = await fetch(`${API_URL}/search?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
    */
  } catch (error) {
    console.error("Error fetching trademarks:", error);
    throw error;
  }
}

// Mock data for development
const mockTrademarks: TrademarkResult[] = [
  {
    id: "88713620",
    mark: "Meta Logo",
    owner: "FACEBOOK INC.",
    status: "Live / Registered",
    serialNumber: "88713620",
    registrationNumber: "6058991",
    filingDate: "2020-01-28",
    registrationDate: "2020-05-19",
    class: ["9", "35", "42"],
    description: "Computer services, Social Media, Networking, Virtual Communities, Community",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "87542320",
    mark: "Nike",
    owner: "NIKE, Inc.",
    status: "Live / Registered",
    serialNumber: "87542320",
    registrationNumber: "5437598",
    filingDate: "2019-07-15",
    registrationDate: "2019-10-20",
    class: ["25", "28", "35"],
    description: "Footwear, Athletic apparel, Retail store services",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "88120453",
    mark: "Swoosh",
    owner: "NIKE, Inc.",
    status: "Pending",
    serialNumber: "88120453",
    filingDate: "2021-03-10",
    class: ["25", "28"],
    description: "Footwear, Athletic apparel",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "86729019",
    mark: "Just Do It",
    owner: "NIKE, Inc.",
    status: "Live / Registered",
    serialNumber: "86729019",
    registrationNumber: "5893392",
    filingDate: "2018-09-12",
    registrationDate: "2019-01-30",
    class: ["25", "35"],
    description: "Clothing, Advertising services",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "87629104",
    mark: "Air Jordan",
    owner: "NIKE, Inc.",
    status: "Live / Registered",
    serialNumber: "87629104",
    registrationNumber: "5782394",
    filingDate: "2017-11-05",
    registrationDate: "2018-04-20",
    class: ["25"],
    description: "Athletic footwear",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "87012934",
    mark: "Nike Training Club",
    owner: "NIKE, Inc.",
    status: "Abandoned",
    serialNumber: "87012934",
    filingDate: "2016-04-18",
    class: ["9", "41"],
    description: "Software application, Physical fitness training services",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "89123456",
    mark: "Pro Nike",
    owner: "Sports Inc.",
    status: "Others",
    serialNumber: "89123456",
    filingDate: "2022-01-15",
    class: ["25", "28", "35"],
    description: "Sports equipment, Athletic apparel",
    imageUrl: "/placeholder.svg"
  }
];

export function getAvailableFilters() {
  // In a real application, this would come from the API
  return {
    status: [
      { id: "registered", name: "Registered", checked: false },
      { id: "pending", name: "Pending", checked: false },
      { id: "abandoned", name: "Abandoned", checked: false },
      { id: "others", name: "Others", checked: false }
    ],
    owners: [
      { id: "nike", name: "NIKE, Inc.", checked: false },
      { id: "facebook", name: "FACEBOOK INC.", checked: false },
      { id: "sports", name: "Sports Inc.", checked: false }
    ],
    lawFirms: [
      { id: "legalforce", name: "LEGALFORCE RAPC", checked: false },
      { id: "spack", name: "Spack Inc.", checked: false },
      { id: "spackX", name: "SpaceX Inc.", checked: false }
    ],
    attorneys: [
      { id: "attorney1", name: "John Doe", checked: false },
      { id: "attorney2", name: "Jane Smith", checked: false },
      { id: "attorney3", name: "Robert Johnson", checked: false }
    ]
  };
}
