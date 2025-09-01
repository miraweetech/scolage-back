import multer from "multer";
import path from "path";
import fs from "fs";

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "src", "assets", "uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const uploadMiddleware = multer({ storage });