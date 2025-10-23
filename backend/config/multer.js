import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
});

export const upload = multer({ storage });
