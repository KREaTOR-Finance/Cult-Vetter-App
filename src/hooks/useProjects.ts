import { useQuery } from '@tanstack/react-query'

interface Project {
  id: string
  name: string
  symbol: string
  status: 'VETTING' | 'APPROVED' | 'PARTNERSHIP'
  score: number
  votes: number
  liquidity: number
  volume24h: number
  price: number
  priceChange: number
  logo: string
  description?: string
  website?: string
  twitter?: string
  telegram?: string
  createdAt: string
  updatedAt: string
}

interface ProjectsResponse {
  projects: Project[]
  total: number
  page: number
  limit: number
}

interface UseProjectsOptions {
  status?: 'VETTING' | 'APPROVED' | 'PARTNERSHIP'
  page?: number
  limit?: number
  search?: string
}

// Pure mock data for static demo
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'CULT Token',
    symbol: 'CULT',
    status: 'VETTING',
    score: 4.2,
    votes: 45,
    liquidity: 125000,
    volume24h: 45000,
    price: 0.0234,
    priceChange: 12.5,
    logo: 'https://via.placeholder.com/40/FFD600/000000?text=C',
    description: 'A revolutionary token for the CULT community',
    website: 'https://culttoken.com',
    twitter: '@culttoken',
    telegram: 't.me/culttoken',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Vetter Protocol',
    symbol: 'VET',
    status: 'APPROVED',
    score: 4.8,
    votes: 67,
    liquidity: 890000,
    volume24h: 234000,
    price: 0.156,
    priceChange: -2.1,
    logo: 'https://via.placeholder.com/40/FFD600/000000?text=V',
    description: 'Decentralized vetting protocol for XRPL projects',
    website: 'https://vetterprotocol.com',
    twitter: '@vetterprotocol',
    telegram: 't.me/vetterprotocol',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
  },
  {
    id: '3',
    name: 'XRPL Labs',
    symbol: 'XLAB',
    status: 'PARTNERSHIP',
    score: 4.6,
    votes: 89,
    liquidity: 567000,
    volume24h: 123000,
    price: 0.089,
    priceChange: 8.7,
    logo: 'https://via.placeholder.com/40/FFD600/000000?text=X',
    description: 'Innovation hub for XRPL ecosystem development',
    website: 'https://xrpllabs.com',
    twitter: '@xrpllabs',
    telegram: 't.me/xrpllabs',
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-01-14T11:30:00Z',
  },
  {
    id: '4',
    name: 'DeFi Bridge',
    symbol: 'DBRIDGE',
    status: 'VETTING',
    score: 3.9,
    votes: 23,
    liquidity: 89000,
    volume24h: 34000,
    price: 0.0045,
    priceChange: 5.2,
    logo: 'https://via.placeholder.com/40/FFD600/000000?text=D',
    description: 'Cross-chain DeFi bridge for XRPL',
    website: 'https://defibridge.com',
    twitter: '@defibridge',
    telegram: 't.me/defibridge',
    createdAt: '2024-01-12T08:15:00Z',
    updatedAt: '2024-01-15T12:45:00Z',
  },
  {
    id: '5',
    name: 'NFT Marketplace',
    symbol: 'NFTM',
    status: 'APPROVED',
    score: 4.4,
    votes: 56,
    liquidity: 345000,
    volume24h: 89000,
    price: 0.078,
    priceChange: -1.3,
    logo: 'https://via.placeholder.com/40/FFD600/000000?text=N',
    description: 'Decentralized NFT marketplace on XRPL',
    website: 'https://nftmarketplace.com',
    twitter: '@nftmarketplace',
    telegram: 't.me/nftmarketplace',
    createdAt: '2024-01-08T13:20:00Z',
    updatedAt: '2024-01-15T10:20:00Z',
  },
];

const MOCK_DELAY = 500;

export function useProjects(options: UseProjectsOptions = {}) {
  return useQuery({
    queryKey: ['projects', options],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      let filtered = mockProjects;
      if (options.status && options.status !== 'ALL') {
        filtered = filtered.filter(p => p.status === options.status);
      }
      if (options.search) {
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(options.search!.toLowerCase()) ||
          p.symbol.toLowerCase().includes(options.search!.toLowerCase())
        );
      }
      const page = options.page || 1;
      const limit = options.limit || 20;
      const start = (page - 1) * limit;
      const end = start + limit;
      return {
        projects: filtered.slice(start, end),
        total: filtered.length,
        page,
        limit,
      };
    },
    staleTime: Infinity,
    refetchInterval: false,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      const project = mockProjects.find(p => p.id === id);
      if (!project) throw new Error('Project not found');
      return project;
    },
    enabled: !!id,
    staleTime: Infinity,
    refetchInterval: false,
  });
} 