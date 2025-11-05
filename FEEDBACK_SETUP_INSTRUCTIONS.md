# Feedback Form Setup Instructions

## Overview
A feedback form has been added to your sidebar, just above the signout button. Users can now submit feedback that will be stored in your database for you to review.

## Database Setup

### Step 1: Create the Feedbacks Table

You need to create a table in your Neon Database to store feedback:

**Option A: Using Neon Console (Recommended)**
1. Go to your [Neon Dashboard](https://console.neon.tech/)
2. Select your project
3. Go to the **SQL Editor**
4. Copy and paste the SQL from `backend/database/setup_feedback_table.sql`
5. Click **Run** to execute

**Option B: Using SQL directly**
```sql
CREATE TABLE IF NOT EXISTS feedbacks (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) DEFAULT 'Anonymous',
    user_email VARCHAR(255) DEFAULT 'Not provided',
    feedback TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_feedbacks_user_id ON feedbacks(user_id);
CREATE INDEX idx_feedbacks_created_at ON feedbacks(created_at DESC);
```

### Step 2: Verify Database Connection

Make sure your `backend/.env` file has the correct DATABASE_URL:

```env
DATABASE_URL=your-neon-database-connection-string
```

## Testing the Feedback Form

1. Make sure your backend server is running: `npm run dev` (in backend folder)
2. Make sure your frontend is running: `npm run dev` (in client folder)
3. Log in to your application
4. Look for the "Give Feedback" button in the sidebar above the signout section
5. Click it, enter your feedback, and submit
6. You should see a success message

## Viewing Feedbacks

### Using API Endpoint

You can view all feedbacks by making a GET request to:
```
GET http://localhost:3000/api/feedback/all
```

This will return all feedbacks in JSON format:
```json
{
  "success": true,
  "feedbacks": [
    {
      "id": 1,
      "user_id": "user_xyz123",
      "user_name": "John Doe",
      "user_email": "john@example.com",
      "feedback": "Great app! Love the features.",
      "created_at": "2024-11-05T18:00:00.000Z"
    }
  ]
}
```

### Using Database Query

You can also query directly in Neon Console:
```sql
SELECT * FROM feedbacks ORDER BY created_at DESC;
```

## Features

- **Beautiful UI**: Modern gradient button with smooth animations
- **Expandable Form**: Click to open, submit or close to collapse
- **User Info**: Automatically includes user's name and email in the database
- **Loading States**: Shows loading spinner while submitting
- **Success/Error Notifications**: Uses react-hot-toast for user feedback
- **Database Storage**: All feedback securely stored in your Neon database

## Files Modified/Created

### Backend:
- ✅ `backend/controllers/feedbackController.js` - Database storage logic
- ✅ `backend/routes/feedbackRoutes.js` - API routes (POST /send, GET /all)
- ✅ `backend/server.js` - Added feedback route
- ✅ `backend/database/setup_feedback_table.sql` - Database table schema

### Frontend:
- ✅ `client/src/components/FeedbackForm.jsx` - Feedback form component
- ✅ `client/src/components/SideBar.jsx` - Integrated feedback form

## Troubleshooting

### Feedback not saving?
1. Check if the `feedbacks` table exists in your database
2. Verify DATABASE_URL is correctly set in backend `.env`
3. Check the backend console for error messages
4. Make sure the backend server is running

### Form not showing?
1. Make sure both frontend and backend servers are running
2. Check browser console for any errors
3. Verify the import paths are correct

### API errors?
1. Check if backend URL is correct in your frontend `.env` file
2. Ensure CORS is properly configured
3. Verify the user is authenticated (Clerk middleware)

## Need Help?

If you encounter any issues, check:
- Backend console for server errors
- Browser console for frontend errors
- Network tab in browser DevTools for API call status
