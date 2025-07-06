import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'

// Pages
import Dashboard from './pages/Dashboard'
import ProjectDetail from './pages/ProjectDetail'
import VetterDashboard from './pages/VetterDashboard'
import AdminPanel from './pages/AdminPanel'

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

function App() {
  const { data: session, status } = useSession()
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  // Set initial dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  // Show auth modal if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      setShowAuthModal(true)
    }
  }, [status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      <Router>
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            user={session?.user as User}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header 
              onMenuClick={() => setSidebarOpen(true)}
              onThemeToggle={toggleDarkMode}
              darkMode={darkMode}
              user={session?.user as User}
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
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </Router>
    </div>
  )
}

export default App
