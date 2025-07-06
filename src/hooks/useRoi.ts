import { useQuery } from '@tanstack/react-query';

const mockRoiData = {
  entryPrice: 0.0234,
  currentPrice: 0.0289,
  roi: 23.5,
  timeSinceApproval: '2 days',
  peakPrice: 0.0356,
  peakRoi: 52.1,
};

export function useRoi(projectId: string) {
  return useQuery({
    queryKey: ['roi', projectId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockRoiData;
    },
    enabled: !!projectId,
    staleTime: Infinity,
    refetchInterval: false,
  });
} 