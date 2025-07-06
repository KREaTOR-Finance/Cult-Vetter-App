import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Clock } from 'lucide-react'

interface RoiWidgetProps {
  projectId: string
}

interface RoiData {
  entryPrice: number
  currentPrice: number
  roi: number
  timeSinceApproval: string
  peakPrice: number
  peakRoi: number
}

export default function RoiWidget({ projectId }: RoiWidgetProps) {
  const [roiData, setRoiData] = useState<RoiData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock ROI data - replace with actual API call
    const fetchRoiData = async () => {
      setIsLoading(true)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock data
      const mockRoiData: RoiData = {
        entryPrice: 0.0234,
        currentPrice: 0.0289,
        roi: 23.5,
        timeSinceApproval: '2 days',
        peakPrice: 0.0356,
        peakRoi: 52.1,
      }
      
      setRoiData(mockRoiData)
      setIsLoading(false)
    }

    fetchRoiData()
  }, [projectId])

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-8 bg-muted rounded"></div>
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!roiData) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">ROI Tracking</h3>
        <p className="text-sm text-muted-foreground">
          ROI data will be available once the project is approved.
        </p>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return price < 0.01 ? price.toFixed(6) : price.toFixed(4)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <h3 className="text-lg font-semibold mb-4">ROI Tracking</h3>
      
      <div className="space-y-4">
        {/* Current ROI */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {roiData.roi >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
            <span className={`text-2xl font-bold ${roiData.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {roiData.roi >= 0 ? '+' : ''}{roiData.roi.toFixed(1)}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Current ROI</p>
        </div>

        {/* Price Information */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Entry Price</span>
            </div>
            <span className="font-medium">${formatPrice(roiData.entryPrice)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Current Price</span>
            </div>
            <span className="font-medium">${formatPrice(roiData.currentPrice)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Peak Price</span>
            </div>
            <span className="font-medium">${formatPrice(roiData.peakPrice)}</span>
          </div>
        </div>

        {/* Peak ROI */}
        <div className="p-3 bg-accent rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Peak ROI</span>
            <span className="text-lg font-bold text-green-500">
              +{roiData.peakRoi.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Time Since Approval */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Since Approval</span>
          </div>
          <span>{roiData.timeSinceApproval}</span>
        </div>
      </div>
    </motion.div>
  )
} 