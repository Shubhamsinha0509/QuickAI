import React, { useState } from 'react'
import { MessageSquare, Send, X } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!feedback.trim()) {
      toast.error('Please enter your feedback')
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedback/send`,
        {
          feedback: feedback.trim(),
          userEmail: user.primaryEmailAddress?.emailAddress,
          userName: user.fullName,
        }
      )

      if (response.data.success) {
        toast.success('Thank you for your feedback!')
        setFeedback('')
        setIsOpen(false)
      }
    } catch (error) {
      console.error('Error sending feedback:', error)
      toast.error('Failed to send feedback. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full px-4 mb-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-[#3C81F6] to-[#9243EA] text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">Give Feedback</span>
        </button>
      ) : (
        <div className="w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#3C81F6]" />
              Share Your Feedback
            </h3>
            <button
              onClick={() => {
                setIsOpen(false)
                setFeedback('')
              }}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think..."
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C81F6] focus:border-transparent resize-none"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-[#3C81F6] to-[#9243EA] text-white rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Feedback
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default FeedbackForm
