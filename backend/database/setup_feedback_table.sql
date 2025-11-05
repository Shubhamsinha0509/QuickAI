-- Create feedbacks table to store user feedback
CREATE TABLE IF NOT EXISTS feedbacks (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) DEFAULT 'Anonymous',
    user_email VARCHAR(255) DEFAULT 'Not provided',
    feedback TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster queries
CREATE INDEX idx_feedbacks_user_id ON feedbacks(user_id);

-- Create index on created_at for faster sorting
CREATE INDEX idx_feedbacks_created_at ON feedbacks(created_at DESC);
