import axios from 'axios'

const CLOUDINARY_UPLOAD_PRESET = 'college_admissions' // Created in Cloudinary dashboard
const CLOUDINARY_CLOUD_NAME = 'dal5z9kro' // Replace with your actual cloud name from Cloudinary

class CloudinaryService {
  constructor() {
    this.cloudName = CLOUDINARY_CLOUD_NAME
    this.uploadPreset = CLOUDINARY_UPLOAD_PRESET
  }

  /**
   * Upload a single file to Cloudinary
   * @param {File} file - The file to upload
   * @param {Function} onProgress - Progress callback function
   * @returns {Promise<Object>} - Upload result with public_id and other metadata
   */
  async uploadFile(file, onProgress = null) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', this.uploadPreset)
    formData.append('folder', 'college_admissions') // Organize files in a folder
    formData.append('tags', 'admission_documents') // Add tags for easier management

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
              onProgress(percentCompleted)
            }
          },
        }
      )

      return {
        success: true,
        public_id: response.data.public_id,
        secure_url: response.data.secure_url,
        format: response.data.format,
        bytes: response.data.bytes,
        width: response.data.width,
        height: response.data.height,
        created_at: response.data.created_at
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      }
    }
  }

  /**
   * Upload multiple files to Cloudinary
   * @param {File[]} files - Array of files to upload
   * @param {Function} onProgress - Progress callback function
   * @returns {Promise<Array>} - Array of upload results
   */
  async uploadMultipleFiles(files, onProgress = null) {
    const uploadPromises = files.map(async (file, index) => {
      const progressCallback = onProgress ? (progress) => {
        onProgress(index, progress)
      } : null

      return await this.uploadFile(file, progressCallback)
    })

    try {
      const results = await Promise.all(uploadPromises)
      return results
    } catch (error) {
      console.error('Multiple file upload error:', error)
      throw error
    }
  }

  /**
   * Delete a file from Cloudinary
   * @param {string} publicId - The public ID of the file to delete
   * @returns {Promise<Object>} - Deletion result
   */
  async deleteFile(publicId) {
    try {
      const response = await axios.delete(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/destroy`,
        {
          data: {
            public_id: publicId
          }
        }
      )

      return {
        success: true,
        result: response.data.result
      }
    } catch (error) {
      console.error('Cloudinary delete error:', error)
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      }
    }
  }

  /**
   * Get file information from Cloudinary
   * @param {string} publicId - The public ID of the file
   * @returns {Promise<Object>} - File information
   */
  async getFileInfo(publicId) {
    try {
      const response = await axios.get(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/${publicId}`,
        {
          params: {
            type: 'upload'
          }
        }
      )

      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Cloudinary get info error:', error)
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      }
    }
  }

  /**
   * Generate a secure URL for a file
   * @param {string} publicId - The public ID of the file
   * @param {Object} options - Transformation options
   * @returns {string} - Secure URL
   */
  generateSecureUrl(publicId, options = {}) {
    const baseUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload`
    const transformations = this.buildTransformationString(options)
    
    return `${baseUrl}/${transformations}/${publicId}`
  }

  /**
   * Build transformation string for Cloudinary URLs
   * @param {Object} options - Transformation options
   * @returns {string} - Transformation string
   */
  buildTransformationString(options) {
    const transformations = []

    if (options.width) transformations.push(`w_${options.width}`)
    if (options.height) transformations.push(`h_${options.height}`)
    if (options.crop) transformations.push(`c_${options.crop}`)
    if (options.quality) transformations.push(`q_${options.quality}`)
    if (options.format) transformations.push(`f_${options.format}`)

    return transformations.join(',')
  }

  /**
   * Validate file before upload
   * @param {File} file - The file to validate
   * @returns {Object} - Validation result
   */
  validateFile(file) {
    const errors = []

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      errors.push('File size must be less than 10MB')
    }

    // Check file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not supported. Please upload JPG, PNG, PDF, DOC, or DOCX files.')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Create and export a singleton instance
const cloudinaryService = new CloudinaryService()
export default cloudinaryService
