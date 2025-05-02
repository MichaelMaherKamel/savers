"use client";
 
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { uploadImageToSupabase } from "@/db/actions/upload";

type ImageUploadProps = {
  folder?: string;
  currentImageUrl?: string;
  onUploadComplete?: (url: string) => void;
  path?: string;
}
 
export function ImageUpload({
  folder = "images",
  currentImageUrl,
  onUploadComplete,
  path
}: ImageUploadProps) {
  const [files, setFiles] = React.useState<File[]>([]);
 
  const onUpload = React.useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      },
    ) => {
      try {
        // Process each file individually
        const uploadPromises = files.map(async (file) => {
          try {
            // Start with initial progress
            onProgress(file, 0);
            
            // We'll manually update progress while waiting for the server action
            const progressInterval = setInterval(() => {
              // Simulate progress up to 90% while waiting for server
              let currentProgress = 0;
              const incrementProgress = () => {
                if (currentProgress < 90) {
                  currentProgress += Math.random() * 10;
                  currentProgress = Math.min(currentProgress, 90);
                  onProgress(file, currentProgress);
                }
              };
              
              incrementProgress();
            }, 300);
            
            // Call server action to handle the actual upload
            const result = await uploadImageToSupabase(file, {
              folder,
              currentImageUrl,
              path
            });
            
            // Clear the progress interval
            clearInterval(progressInterval);
            
            if (!result.success || !result.url) {
              throw new Error(result.error || "Upload failed");
            }
            
            // Set to 100% when done
            onProgress(file, 100);
            onSuccess(file);
            
            // Notify parent component if callback provided
            if (onUploadComplete && result.url) {
              onUploadComplete(result.url);
            }
            
            // Show success toast
            toast.success("Image uploaded successfully", {
              description: `${file.name} has been uploaded`,
            });
            
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
            
            // Show error toast
            toast.error("Upload failed", {
              description: error instanceof Error ? error.message : "Unknown error",
            });
          }
        });
 
        // Wait for all uploads to complete
        await Promise.all(uploadPromises);
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
        console.error("Unexpected error during upload:", error);
        toast.error("Upload process failed", {
          description: "There was an unexpected error during the upload process.",
        });
      }
    },
    [folder, currentImageUrl, onUploadComplete, path],
  );
 
  const onFileReject = React.useCallback((file: File, message: string) => {
    toast.error("File rejected", {
      description: `"${file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}" has been rejected: ${message}`,
    });
  }, []);
 
  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      maxFiles={10}
      maxSize={5 * 1024 * 1024}
      accept="image/*" // Fixed: Changed to string format instead of object
      className="w-full max-w-md"
      onUpload={onUpload}
      onFileReject={onFileReject}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop images here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max 10 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse images
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList orientation="horizontal">
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file} className="p-0">
            <FileUploadItemPreview className="size-20">
              <FileUploadItemProgress variant="fill" />
            </FileUploadItemPreview>
            <FileUploadItemMetadata className="sr-only" />
            <FileUploadItemDelete asChild>
              <Button
                variant="secondary"
                size="icon"
                className="-top-1 -right-1 absolute size-5 rounded-full"
              >
                <X className="size-3" />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}