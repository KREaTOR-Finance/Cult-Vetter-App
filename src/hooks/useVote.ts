import { useState } from 'react';

export function useVote(projectId: string) {
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitVote = async (voteData: any) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      setHasVoted(true);
      return { success: true };
    } catch (e) {
      setError('Failed to submit vote');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { hasVoted, isSubmitting, error, submitVote };
} 