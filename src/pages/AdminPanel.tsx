import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Users, 
  Shield, 
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react'

interface AdminSettings {
  voteThreshold: number
  participationThreshold: number
  autoApprovalEnabled: boolean
  fastTrackEnabled: boolean
  maxVotesPerUser: number
}

interface Partner {
  id: string
  name: string
  logo: string
  website: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
}

const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'XRPL Foundation',
    logo: 'https://via.placeholder.com/40',
    website: 'https://xrpl.org',
    status: 'ACTIVE',
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '2',
    name: 'CULT Community',
    logo: 'https://via.placeholder.com/40',
    website: 'https://cult.community',
    status: 'ACTIVE',
    createdAt: '2024-01-15T14:30:00Z',
  },
]

export default function AdminPanel() {
  const [settings, setSettings] = useState<AdminSettings>({
    voteThreshold: 4.0,
    participationThreshold: 51,
    autoApprovalEnabled: true,
    fastTrackEnabled: true,
    maxVotesPerUser: 10,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [partners, setPartners] = useState<Partner[]>(mockPartners)
  const [showAddPartner, setShowAddPartner] = useState(false)
  const [newPartner, setNewPartner] = useState({
    name: '',
    website: '',
    logo: '',
  })

  const handleSaveSettings = () => {
    // Mock API call to save settings
    console.log('Saving settings:', settings)
    setIsEditing(false)
  }

  const handleAddPartner = () => {
    if (newPartner.name && newPartner.website) {
      const partner: Partner = {
        id: Date.now().toString(),
        name: newPartner.name,
        website: newPartner.website,
        logo: newPartner.logo || 'https://via.placeholder.com/40',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      }
      setPartners([...partners, partner])
      setNewPartner({ name: '', website: '', logo: '' })
      setShowAddPartner(false)
    }
  }

  const handleDeletePartner = (id: string) => {
    setPartners(partners.filter(partner => partner.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage system settings and partnerships</p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Settings
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Voting Rules</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Vote Threshold (Auto-Approval)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={settings.voteThreshold}
                onChange={(e) => setSettings({ ...settings, voteThreshold: parseFloat(e.target.value) })}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Participation Threshold (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settings.participationThreshold}
                onChange={(e) => setSettings({ ...settings, participationThreshold: parseInt(e.target.value) })}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Max Votes Per User
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={settings.maxVotesPerUser}
                onChange={(e) => setSettings({ ...settings, maxVotesPerUser: parseInt(e.target.value) })}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.autoApprovalEnabled}
                  onChange={(e) => setSettings({ ...settings, autoApprovalEnabled: e.target.checked })}
                  disabled={!isEditing}
                  className="rounded border-input"
                />
                <span className="text-sm font-medium">Enable Auto-Approval</span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.fastTrackEnabled}
                  onChange={(e) => setSettings({ ...settings, fastTrackEnabled: e.target.checked })}
                  disabled={!isEditing}
                  className="rounded border-input"
                />
                <span className="text-sm font-medium">Enable Fast-Track Override</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Partnerships</h2>
            </div>
            <button
              onClick={() => setShowAddPartner(true)}
              className="flex items-center space-x-2 px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add Partner</span>
            </button>
          </div>

          <div className="space-y-3">
            {partners.map((partner) => (
              <div key={partner.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-base font-bold text-gray-700">
                    {partner.name ? partner.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div>
                    <p className="font-medium">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">{partner.website}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    partner.status === 'ACTIVE' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                  }`}>
                    {partner.status}
                  </span>
                  <button
                    onClick={() => handleDeletePartner(partner.id)}
                    className="p-1 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="h-5 w-5" />
          <h2 className="text-xl font-semibold">System Statistics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">456</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">89</p>
            <p className="text-sm text-muted-foreground">Approved Projects</p>
          </div>
        </div>
      </motion.div>

      {/* Add Partner Modal */}
      {showAddPartner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddPartner(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Partner</h3>
              <button
                onClick={() => setShowAddPartner(false)}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Partner Name</label>
                <input
                  type="text"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter partner name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  value={newPartner.website}
                  onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Logo URL (Optional)</label>
                <input
                  type="url"
                  value={newPartner.logo}
                  onChange={(e) => setNewPartner({ ...newPartner, logo: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowAddPartner(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPartner}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Add Partner
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 