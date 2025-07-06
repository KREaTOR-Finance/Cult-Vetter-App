import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send } from 'lucide-react'

interface VoteFormProps {
  projectId: string
}

interface VoteData {
  meme: number
  roadmap: number
  growth: number
  narrative: number
  utility: number
}

const voteCategories = [
  { key: 'meme', label: 'Meme Factor', description: 'Community engagement and viral potential' },
  { key: 'roadmap', label: 'Roadmap', description: 'Clear development plan and milestones' },
  { key: 'growth', label: 'Growth Potential', description: 'Market opportunity and scalability' },
  { key: 'narrative', label: 'Narrative', description: 'Story and vision alignment' },
  { key: 'utility', label: 'Utility', description: 'Real-world use cases and value' },
]

export default function VoteForm({ projectId }: VoteFormProps) {
  const [votes, setVotes] = useState<VoteData>({
    meme: 0,
    roadmap: 0,
    growth: 0,
    narrative: 0,
    utility: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleVoteChange = (category: keyof VoteData, value: number) => {
    setVotes(prev => ({
      ...prev,
      [category]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Voting for project:', projectId, votes)
      
      // Reset form
      setVotes({
        meme: 0,
        roadmap: 0,
        growth: 0,
        narrative: 0,
        utility: 0,
      })
    } catch (error) {
      console.error('Voting error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const averageScore = Object.values(votes).reduce((sum, vote) => sum + vote, 0) / 5

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {voteCategories.map((category) => (
        <div key={category.key} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">{category.label}</label>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
            <span className="text-sm font-medium">
              {votes[category.key as keyof VoteData]}/5
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleVoteChange(category.key as keyof VoteData, star)}
                className={`p-1 rounded transition-colors ${
                  votes[category.key as keyof VoteData] >= star
                    ? 'text-yellow-500'
                    : 'text-muted-foreground hover:text-yellow-500'
                }`}
              >
                <Star className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Average Score */}
      {averageScore > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-accent rounded-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Average Score</span>
            <span className="text-lg font-bold text-primary">{averageScore.toFixed(1)}/5</span>
          </div>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || averageScore === 0}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <Send className="h-4 w-4" />
        )}
        <span>{isSubmitting ? 'Submitting...' : 'Submit Vote'}</span>
      </button>
    </form>
  )
} 