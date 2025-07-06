import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Activity,
  Gauge,
  Target,
  ArrowRight,
  RefreshCw
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

// Mock data for vetter feeds
const mockVetterFeeds = [
  {
    id: '1',
    projectName: 'CULT Token',
    symbol: 'CULT',
    liquidity: 125000,
    volume24h: 45000,
    holderGrowth: 12.5,
    priceVolatility: 8.2,
    socialMentions: 156,
    autoScore: 4.2,
    totalScore: 4.4,
    status: 'ACTIVE',
  },
  {
    id: '2',
    projectName: 'Vetter Protocol',
    symbol: 'VET',
    liquidity: 890000,
    volume24h: 234000,
    holderGrowth: 8.7,
    priceVolatility: 5.1,
    socialMentions: 89,
    autoScore: 4.8,
    totalScore: 4.9,
    status: 'APPROVED',
  },
  {
    id: '3',
    projectName: 'XRPL Labs',
    symbol: 'XLAB',
    liquidity: 567000,
    volume24h: 123000,
    holderGrowth: 15.2,
    priceVolatility: 12.8,
    socialMentions: 234,
    autoScore: 4.6,
    totalScore: 4.7,
    status: 'MONITORING',
  },
]

interface VetterFeed {
  id: string
  projectName: string
  symbol: string
  liquidity: number
  volume24h: number
  holderGrowth: number
  priceVolatility: number
  socialMentions: number
  autoScore: number
  totalScore: number
  status: 'ACTIVE' | 'APPROVED' | 'MONITORING' | 'WARNING'
}

export default function VetterDashboard() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock query for vetter feeds
  const { data: vetterFeeds, isLoading } = useQuery({
    queryKey: ['vetter-feeds'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return mockVetterFeeds
    },
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
    return `$${num.toFixed(0)}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-500/10 text-green-600'
      case 'ACTIVE': return 'bg-blue-500/10 text-blue-600'
      case 'MONITORING': return 'bg-yellow-500/10 text-yellow-600'
      case 'WARNING': return 'bg-red-500/10 text-red-600'
      default: return 'bg-gray-500/10 text-gray-600'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vetter Engine</h1>
          <p className="text-muted-foreground">Real-time on-chain metrics and automated scoring</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Auto Score</p>
              <p className="text-2xl font-bold">4.2</p>
            </div>
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Liquidity</p>
              <p className="text-2xl font-bold">$2.4M</p>
            </div>
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Alerts</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <Gauge className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vetter Feeds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-lg"
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Vetter Feeds</h2>
          <p className="text-sm text-muted-foreground">
            Real-time on-chain metrics and automated scoring
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Liquidity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Volume 24h
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Holder Growth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Auto Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-muted rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-muted rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-muted rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-muted rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-muted rounded w-12"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-muted rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-muted rounded w-20"></div>
                    </td>
                  </tr>
                ))
              ) : (
                vetterFeeds?.map((feed, index) => (
                  <motion.tr
                    key={feed.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{feed.projectName}</div>
                        <div className="text-sm text-muted-foreground">{feed.symbol}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{formatNumber(feed.liquidity)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{formatNumber(feed.volume24h)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{feed.holderGrowth.toFixed(1)}%</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{feed.autoScore.toFixed(1)}</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              className={`w-2 h-2 rounded-full ${
                                star <= feed.autoScore ? 'bg-yellow-500' : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feed.status)}`}>
                        {feed.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedProject(feed.id)}
                        className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Selected Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Project Details</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Detailed metrics and scoring breakdown for the selected project.
              </p>
              {/* Add detailed metrics here */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 