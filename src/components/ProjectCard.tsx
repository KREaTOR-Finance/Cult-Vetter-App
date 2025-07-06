import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  Star,
  Clock
} from 'lucide-react'

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
}

interface ProjectCardProps {
  project: Project
}

const statusColors = {
  VETTING: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  APPROVED: 'bg-green-500/10 text-green-600 border-green-500/20',
  PARTNERSHIP: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
    return `$${num.toFixed(0)}`
  }

  const formatPrice = (price: number) => {
    return price < 0.01 ? price.toFixed(6) : price.toFixed(4)
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={project.logo} 
            alt={project.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.symbol}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>

      {/* Price and Change */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-lg font-bold">${formatPrice(project.price)}</p>
          <div className="flex items-center space-x-1">
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
          <p className="text-xs text-muted-foreground">{project.votes} votes</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">{formatNumber(project.liquidity)}</p>
            <p className="text-xs text-muted-foreground">Liquidity</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">{formatNumber(project.volume24h)}</p>
            <p className="text-xs text-muted-foreground">24h Volume</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Link
          to={`/project/${project.id}`}
          className="flex-1 px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 transition-colors text-center"
        >
          View Details
        </Link>
        {project.status === 'VETTING' && (
          <button className="px-3 py-2 bg-secondary text-secondary-foreground text-sm rounded-md hover:bg-secondary/90 transition-colors">
            Vote
          </button>
        )}
      </div>
    </motion.div>
  )
} 