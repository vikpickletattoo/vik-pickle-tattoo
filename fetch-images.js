import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Resolve the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fetch all images and write to a JSON file
const fetchImages = async () => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload', // Fetch only uploaded resources
      resource_type: 'image', // Fetch only images
      max_results: 100, // Adjust as needed (max 500 per request)
    });

    // Extract image URLs
    const imageUrls = result.resources.map((resource) => resource.secure_url);

    // Ensure the public/assets directory exists
    const assetsDir = path.join(__dirname, 'public', 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    // Write URLs to a JSON file in the public/assets folder
    const filePath = path.join(assetsDir, 'image-urls.json');
    fs.writeFileSync(filePath, JSON.stringify(imageUrls, null, 2));

    console.log(`Image URLs written to ${filePath}`);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

fetchImages();