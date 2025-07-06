import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Menu, 
  Moon, 
  Sun, 
  User, 
  LogOut, 
  Settings,
  Bell,
  Search
} from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
  onThemeToggle: () => void
  darkMode: boolean
  user?: {
    id: string
    address: string
    role: 'GUEST' | 'MEMBER' | 'ADMIN'
  }
  onAuthClick: () => void
}

export default function Header({ 
  onMenuClick, 
  onThemeToggle, 
  darkMode, 
  user, 
  onAuthClick 
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CV</span>
          </div>
          <span className="font-bold text-lg hidden sm:block">CULTVETTER</span>
        </Link>
      </div>

      {/* Center Section - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Notifications */}
        <button className="p-2 rounded-md hover:bg-accent transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-md hover:bg-accent transition-colors"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* User Menu */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden sm:block text-sm font-medium">
                {user.address.slice(0, 6)}...{user.address.slice(-4)}
              </span>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50"
              >
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    {user.role}
                  </div>
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                  <button className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors w-full">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <button
            onClick={onAuthClick}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  )
} 