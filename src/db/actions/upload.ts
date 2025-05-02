'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type SupabaseUploadResult = {
  success: boolean
  url?: string
  error?: string
}

export async function uploadImageToSupabase(
  file: File,
  options?: {
    currentImageUrl?: string
    folder?: string
    path?: string
  }
): Promise<SupabaseUploadResult> {
  try {
    const supabase = await createClient()
    const folder = options?.folder || 'images'
    const currentImageUrl = options?.currentImageUrl

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return { success: false, error: 'File size exceeds 5MB limit' }
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp']
    if (!allowedTypes.includes(file.type)) {
      return { 
        success: false, 
        error: 'Invalid file type. Only JPEG, PNG, GIF, WebP, SVG and BMP are allowed' 
      }
    }

    // Delete existing image if present
    if (currentImageUrl) {
      try {
        const oldFileName = currentImageUrl.split('/').pop()
        if (oldFileName) {
          await supabase.storage.from('saversbucket').remove([`${folder}/${oldFileName}`])
        }
      } catch (error) {
        console.warn('Failed to delete old file:', error)
        // Continue with upload even if delete fails
      }
    }

    // Create unique filename
    const sanitizedFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-')
    const uniquePrefix = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    const fileName = `${folder}/${uniquePrefix}-${sanitizedFileName}`

    // Upload new file with retry logic
    let retries = 3
    let lastError: any

    while (retries > 0) {
      try {
        const { data, error } = await supabase.storage.from('saversbucket').upload(fileName, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false,
        })

        if (error) throw error

        const {
          data: { publicUrl },
        } = supabase.storage.from('saversbucket').getPublicUrl(data.path)

        // If a path was provided, revalidate it
        if (options?.path) {
          revalidatePath(options.path)
        }

        return {
          success: true,
          url: publicUrl,
        }
      } catch (error) {
        lastError = error
        retries--
        if (retries > 0) {
          // Wait before retrying (1 second)
          await new Promise((resolve) => setTimeout(resolve, 1000))
          continue
        }
      }
    }

    console.error('Upload failed after retries:', lastError)
    return {
      success: false,
      error: 'Failed to upload file after multiple attempts',
    }
  } catch (error) {
    console.error('Unexpected error during upload:', error)
    return {
      success: false,
      error: 'An unexpected error occurred during upload',
    }
  }
}

// Helper function for deleting multiple images
export async function deleteImages(
  imageUrls: string[],
  folder: string = 'images',
  path?: string
): Promise<{
  success: boolean
  error?: string
}> {
  if (!imageUrls.length) {
    return { success: true }
  }

  try {
    const supabase = await createClient()

    const filesToDelete = imageUrls
      .map((url) => {
        const fileName = url.split('/').pop()
        return fileName ? `${folder}/${fileName}` : null
      })
      .filter((path): path is string => path !== null)

    if (!filesToDelete.length) {
      return { success: false, error: 'No valid files to delete' }
    }

    const { error } = await supabase.storage.from('saversbucket').remove(filesToDelete)

    if (error) {
      console.error('Error deleting images:', error)
      return {
        success: false,
        error: 'Failed to delete images',
      }
    }

    // If a path was provided, revalidate it
    if (path) {
      revalidatePath(path)
    }

    return { success: true }
  } catch (error) {
    console.error('Error in deleteImages:', error)
    return {
      success: false,
      error: 'An unexpected error occurred while deleting images',
    }
  }
}