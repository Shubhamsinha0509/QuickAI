import multer from "multer";

// Use memory storage for Vercel compatibility (serverless has read-only file system)
const storage = multer.memoryStorage();

export const upload = multer({ storage });
