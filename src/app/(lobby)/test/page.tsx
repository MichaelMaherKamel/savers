'use client'

import { ImageUpload } from "@/components/products/ImageUpload";

export default function YourPage() {
  const handleUploadComplete = (imageUrl: string) => {
    console.log("Image uploaded successfully:", imageUrl);
    // Update your application state with the new image URL
  };

  return (
    <div>
      <h1>Upload Images</h1>
      <ImageUpload 
        folder="products" 
        onUploadComplete={handleUploadComplete}
        path="/products" // Path to revalidate after upload
      />
    </div>
  );
}