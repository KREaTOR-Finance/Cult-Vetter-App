import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { io } from 'socket.io-client'
import { SessionProvider } from 'next-auth/react'
import App from './App.tsx'
import './index.css'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Initialize Socket.IO connection
const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:4000', {
  autoConnect: true,
  transports: ['websocket', 'polling'],
})

// Make socket available globally
window.socket = socket

// Create root and render
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SessionProvider>
  </React.StrictMode>,
)

// Global type declaration for socket
declare global {
  interface Window {
    socket: any
  }
}
