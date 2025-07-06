import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'

// Pages
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import VetterDashboard from './pages/VetterDashboard'
import AdminPanel from './pages/AdminPanel'
import SubmitProject from './pages/SubmitProject'

// Components
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import AuthModal from './components/AuthModal'

// Types
interface User {
  id: string
  address: string
  role: 'GUEST' | 'MEMBER' | 'ADMIN'
}

// Mock user for static demo
const MOCK_USER: User = {
  id: '1',
  address: 'rEXAMPLETesTAddR1234567890',
  role: 'MEMBER',
}

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  // Set initial dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  // Show wallet modal on first load if not connected
  useEffect(() => {
    if (!user) setShowAuthModal(true)
  }, [user])

  // Handle wallet connect (mock)
  const handleWalletConnect = () => {
    setUser(MOCK_USER)
    setShowAuthModal(false)
  }

  // Handle wallet disconnect
  const handleWalletDisconnect = () => {
    setUser(null)
    setShowAuthModal(true)
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      <Router>
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            user={user as User}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header 
              onMenuClick={() => setSidebarOpen(true)}
              onThemeToggle={toggleDarkMode}
              darkMode={darkMode}
              user={user as User}
              onAuthClick={() => setShowAuthModal(true)}
            />

            {/* Page Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/vetter" element={<VetterDashboard />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/submit-project" element={<SubmitProject />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal}
          onConnect={handleWalletConnect}
          onDisconnect={handleWalletDisconnect}
          user={user}
        />
      </Router>
    </div>
  )
}

export default App
