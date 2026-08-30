/**
 * Cloudinary helper for loomie application.
 * Automatically appends Cloudinary CDN base domain and f_auto,q_auto optimization parameters.
 */

export function getCloudinaryUrl(
  path: string,
  type: "image" | "video" = "image"
): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dxmy6yy5";
  const baseUrl = `https://res.cloudinary.com/${cloudName}`;

  // Extract filename since media assets were uploaded to Cloudinary's root folder
  const filename = path.split("/").pop() || path;

  // Serve with auto format (AVIF/WebP for images, WebM/MP4 for videos) and auto quality compression
  return `${baseUrl}/${type}/upload/f_auto,q_auto/${filename}`;
}
