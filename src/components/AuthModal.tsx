import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wallet, Shield, Zap } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const walletOptions = [
  {
    id: 'xumm',
    name: 'XUMM Wallet',
    description: 'Connect with XUMM wallet',
    icon: Wallet,
    color: 'bg-blue-500',
  },
  {
    id: 'xrpl',
    name: 'XRPL Wallet',
    description: 'Connect with any XRPL wallet',
    icon: Zap,
    color: 'bg-purple-500',
  },
]

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { data: session } = useSession()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleWalletConnect = async (provider: string) => {
    setIsConnecting(true)
    try {
      await signIn(provider, { callbackUrl: '/' })
    } catch (error) {
      console.error('Authentication error:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
    onClose()
  }

  if (session) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Connected</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-accent rounded-md">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {(session.user as any)?.address?.slice(0, 6)}...{(session.user as any)?.address?.slice(-4)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {(session.user as any)?.role || 'Member'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                >
                  Disconnect Wallet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card border border-border rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Connect Wallet</h2>
                <p className="text-sm text-muted-foreground">
                  Connect your XRPL wallet to access CULTVETTER
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {walletOptions.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletConnect(wallet.id)}
                  disabled={isConnecting}
                  className="w-full flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
                >
                  <div className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center`}>
                    <wallet.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{wallet.name}</p>
                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Your wallet signature is used for authentication only</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 