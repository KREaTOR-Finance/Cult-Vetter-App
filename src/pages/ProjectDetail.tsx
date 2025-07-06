import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ExternalLink, 
  Twitter, 
  MessageCircle,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Vote
} from 'lucide-react'
import { useProject } from '../hooks/useProjects'
import VoteForm from '../components/VoteForm'
import RoiWidget from '../components/RoiWidget'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, error } = useProject(id!)

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-muted rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-32"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-32 bg-muted rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-48 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Project not found</h2>
        <p className="text-muted-foreground mb-4">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
    return `$${num.toFixed(0)}`
  }

  const formatPrice = (price: number) => {
    return price < 0.01 ? price.toFixed(6) : price.toFixed(4)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 rounded-md hover:bg-accent transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center space-x-3">
          <img 
            src={project.logo} 
            alt={project.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground">{project.symbol}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Project Information</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.status === 'VETTING' ? 'bg-yellow-500/10 text-yellow-600' :
                project.status === 'APPROVED' ? 'bg-green-500/10 text-green-600' :
                'bg-purple-500/10 text-purple-600'
              }`}>
                {project.status}
              </span>
            </div>

            {project.description && (
              <p className="text-muted-foreground mb-4">{project.description}</p>
            )}

            {/* Social Links */}
            {(project.website || project.twitter || project.telegram) && (
              <div className="flex items-center space-x-4">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Website</span>
                  </a>
                )}
                {project.twitter && (
                  <a
                    href={`https://twitter.com/${project.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                  </a>
                )}
                {project.telegram && (
                  <a
                    href={`https://t.me/${project.telegram.replace('t.me/', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>

          {/* Price Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Price Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">${formatPrice(project.price)}</p>
                  <div className="flex items-center space-x-2">
                    {project.priceChange >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${project.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {project.priceChange >= 0 ? '+' : ''}{project.priceChange.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{project.score.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.votes} votes</p>
                </div>
              </div>
              
              {/* Placeholder for chart */}
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Price chart coming soon</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Liquidity</span>
                </div>
                <span className="font-medium">{formatNumber(project.liquidity)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">24h Volume</span>
                </div>
                <span className="font-medium">{formatNumber(project.volume24h)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Voters</span>
                </div>
                <span className="font-medium">{project.votes}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Created</span>
                </div>
                <span className="font-medium text-sm">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ROI Widget */}
          <RoiWidget projectId={project.id} />

          {/* Voting */}
          {project.status === 'VETTING' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Vote className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Vote</h3>
              </div>
              <VoteForm projectId={project.id} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 