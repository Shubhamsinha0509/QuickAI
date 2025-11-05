import express from 'express'
import { sendFeedback, getAllFeedbacks } from '../controllers/feedbackController.js'

const feedbackRouter = express.Router()

feedbackRouter.post('/send', sendFeedback)
feedbackRouter.get('/all', getAllFeedbacks)

export default feedbackRouter
