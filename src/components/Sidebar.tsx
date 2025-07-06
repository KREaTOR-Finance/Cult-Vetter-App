import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Home, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Users,
  Award,
  Zap
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  user?: {
    id: string
    address: string
    role: 'GUEST' | 'MEMBER' | 'ADMIN'
  }
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Vetter Engine', href: '/vetter', icon: Zap },
  { name: 'Leaderboards', href: '/leaderboards', icon: Award },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Community', href: '/community', icon: Users },
]

const adminNavigation = [
  { name: 'Admin Panel', href: '/admin', icon: Settings },
]

export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border lg:static lg:translate-x-0"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CV</span>
                  </div>
                  <span className="font-bold text-lg">CULTVETTER</span>
                </div>
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-accent'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                {/* Admin Navigation */}
                {user?.role === 'ADMIN' && (
                  <div className="pt-4 border-t border-border">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Admin
                    </div>
                    <div className="space-y-1">
                      {adminNavigation.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={onClose}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-accent'
                            }`}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </nav>

              {/* User Info */}
              {user && (
                <div className="p-4 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-medium">
                        {user.address.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.address.slice(0, 6)}...{user.address.slice(-4)}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user.role.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
} 