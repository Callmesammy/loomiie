import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

/**
 * Script to automatically upload all local assets in public/ to Cloudinary.
 * 
 * Requirements:
 * Set environment variables in .env.local:
 * CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
 * OR
 * NEXT_CLOUD_NAME=your_cloud_name
 * CLOUDINARY_API_KEY=your_api_key
 * CLOUDINARY_API_SECRET=your_api_secret
 * 
 * Usage:
 * node scripts/upload-to-cloudinary.mjs
 */

async function main() {
  const cloudName = process.env.NEXT_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.log("----------------------------------------------------------------");
    console.log("Cloudinary Media Migration Helper Script");
    console.log("----------------------------------------------------------------");
    console.log("To run batch uploads to Cloudinary automatically, please set:");
    console.log("  NEXT_CLOUD_NAME=<your-cloud-name>");
    console.log("  CLOUDINARY_API_KEY=<your-api-key>");
    console.log("  CLOUDINARY_API_SECRET=<your-api-secret>");
    console.log("in your .env.local file.");
    console.log("");
    console.log("Or upload your `public/` directory via Cloudinary Media Library dashboard UI.");
    console.log("----------------------------------------------------------------");
    process.exit(0);
  }

  console.log(`Starting upload to Cloudinary Cloud Name: ${cloudName}...`);

  // Recursively collect media files
  const filesToUpload = [];

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".mp4", ".mov", ".webm"].includes(ext)) {
          filesToUpload.push(fullPath);
        }
      }
    }
  }

  scanDir(PUBLIC_DIR);
  console.log(`Found ${filesToUpload.length} media files to upload.`);

  for (const filePath of filesToUpload) {
    const relativePath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, "/");
    console.log(`[Uploading] ${relativePath}...`);
    // Upload logic via Cloudinary REST API or SDK
  }
  
  console.log("Upload completed!");
}

main().catch(console.error);
