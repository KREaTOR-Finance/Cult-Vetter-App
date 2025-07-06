import { useQuery } from '@tanstack/react-query';

const mockVetterScore = {
  autoScore: 4.2,
  totalScore: 4.4,
  feeds: [
    {
      liquidity: 125000,
      volume24h: 45000,
      holderGrowth: 12.5,
      priceVolatility: 8.2,
      socialMentions: 156,
      timestamp: '2024-01-15T10:30:00Z',
    },
    {
      liquidity: 890000,
      volume24h: 234000,
      holderGrowth: 8.7,
      priceVolatility: 5.1,
      socialMentions: 89,
      timestamp: '2024-01-10T14:20:00Z',
    },
    {
      liquidity: 567000,
      volume24h: 123000,
      holderGrowth: 15.2,
      priceVolatility: 12.8,
      socialMentions: 234,
      timestamp: '2024-01-05T16:45:00Z',
    },
  ],
};

export function useVetterScore(projectId: string) {
  return useQuery({
    queryKey: ['vetterScore', projectId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockVetterScore;
    },
    enabled: !!projectId,
    staleTime: Infinity,
    refetchInterval: false,
  });
} 