import sql from '../config/db.js'

// Store feedback in database
const sendFeedback = async (req, res) => {
  try {
    const { feedback, userEmail, userName } = req.body
    const userId = req.auth.userId // Get userId from Clerk middleware

    if (!feedback) {
      return res.status(400).json({ success: false, message: 'Feedback is required' })
    }

    // Insert feedback into database
    await sql`
      INSERT INTO feedbacks (user_id, user_name, user_email, feedback, created_at)
      VALUES (${userId}, ${userName || 'Anonymous'}, ${userEmail || 'Not provided'}, ${feedback}, NOW())
    `

    res.json({ success: true, message: 'Thank you for your feedback!' })
  } catch (error) {
    console.error('Error saving feedback:', error)
    res.status(500).json({ success: false, message: 'Failed to submit feedback. Please try again.' })
  }
}

// Get all feedbacks (optional - for admin view)
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await sql`
      SELECT * FROM feedbacks 
      ORDER BY created_at DESC
    `

    res.json({ success: true, feedbacks })
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch feedbacks' })
  }
}

export { sendFeedback, getAllFeedbacks }
