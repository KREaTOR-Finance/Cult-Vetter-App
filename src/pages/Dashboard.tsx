import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Award, 
  Zap,
  Plus,
  Filter,
  Search
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import ProjectCard from '../components/ProjectCard'
import { useProjects } from '../hooks/useProjects'

// Mock data for demonstration
const mockStats = [
  { label: 'Total Projects', value: '1,234', change: '+12%', icon: TrendingUp },
  { label: 'Active Vetters', value: '456', change: '+8%', icon: Users },
  { label: 'Approved Projects', value: '89', change: '+15%', icon: Award },
  { label: 'Avg ROI', value: '+23.4%', change: '+5.2%', icon: Zap },
]

const mockProjects = [
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
    logo: 'https://via.placeholder.com/40',
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
    logo: 'https://via.placeholder.com/40',
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
    logo: 'https://via.placeholder.com/40',
  },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const { data: projects, isLoading } = useProjects()

  // Filter projects based on search and status
  const filteredProjects = (projects || mockProjects).filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Monitor XRPL projects and vetting activity</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Submit Project</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-green-500">{stat.change}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        >
          <option value="ALL">All Status</option>
          <option value="VETTING">Vetting</option>
          <option value="APPROVED">Approved</option>
          <option value="PARTNERSHIP">Partnership</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-4 animate-pulse"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </motion.div>
          ))
        ) : (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))
        )}
      </div>

      {/* Empty State */}
      {!isLoading && filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  )
} 