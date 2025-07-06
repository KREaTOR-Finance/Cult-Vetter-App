import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Award,
  Zap,
  Plus,
  Search
} from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { Dialog } from '@headlessui/react'

const mockStats = [
  { label: 'Total Projects', value: '1,234', change: '+12%', icon: TrendingUp },
  { label: 'Active Vetters', value: '456', change: '+8%', icon: Users },
  { label: 'Approved Projects', value: '89', change: '+15%', icon: Award },
  { label: 'Avg ROI', value: '+23.4%', change: '+5.2%', icon: Zap },
]

const mockModalToken = {
  name: 'Hypothetical Token',
  symbol: 'HYP',
  status: 'VETTING',
  score: 3.9,
  votes: 12,
  liquidity: 42000,
  volume24h: 8500,
  price: 0.0123,
  priceChange: 2.1,
}

const initialProjects = [
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
    logo: 'https://via.placeholder.com/40?text=CULT',
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
    logo: 'https://via.placeholder.com/40?text=VET',
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
    logo: 'https://via.placeholder.com/40?text=XLAB',
  },
  {
    id: '4',
    name: 'RippleX',
    symbol: 'RPX',
    status: 'VETTING',
    score: 4.1,
    votes: 33,
    liquidity: 210000,
    volume24h: 32000,
    price: 0.045,
    priceChange: 3.2,
    logo: 'https://via.placeholder.com/40?text=RPX',
  },
  {
    id: '5',
    name: 'XRP Stars',
    symbol: 'XST',
    status: 'APPROVED',
    score: 4.5,
    votes: 54,
    liquidity: 340000,
    volume24h: 41000,
    price: 0.067,
    priceChange: 5.9,
    logo: 'https://via.placeholder.com/40?text=XST',
  },
  {
    id: '6',
    name: 'Seismic Wallet',
    symbol: 'SEIS',
    status: 'VETTING',
    score: 3.7,
    votes: 21,
    liquidity: 150000,
    volume24h: 17000,
    price: 0.031,
    priceChange: 1.4,
    logo: 'https://via.placeholder.com/40?text=SEIS',
  },
]

export default function Dashboard() {
  const [projects, setProjects] = useState(initialProjects)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Monitor XRPL projects and vetting activity</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <a href="/submit-project" className="mb-6 mt-2 inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-semibold text-base shadow transition-colors">Submit my Project</a>
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full mt-12 flex flex-col items-center gap-2 text-xs text-muted-foreground pb-4">
        <div className="flex gap-4 mb-1">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64.9c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.72 2.16 2.97 4.07 3A9.05 9.05 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"></path></svg>
          </a>
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21.05 2.39a2.18 2.18 0 00-2.18-.18L2.7 10.13a2.18 2.18 0 00.13 4.01l4.13 1.36 1.36 4.13a2.18 2.18 0 004.01.13l7.92-16.17a2.18 2.18 0 00-.2-2.2z"></path></svg>
          </a>
          <a href="https://kreationstudios.com/" target="_blank" rel="noopener noreferrer" aria-label="Website">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"></path></svg>
          </a>
        </div>
        <div>Powered by Kreation Studios</div>
      </footer>
    </div>
  )
} 