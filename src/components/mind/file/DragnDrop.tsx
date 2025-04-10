import type React from "react"

import { useState, useRef, useCallback } from "react"
// import { FilePreview } from "./file-preview"
import { Upload, X } from "lucide-react"
import UploadPreview from "./UploadPreview"

const DragnDrop = () => {
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
  
    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(true)
    }, [])
  
    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }, [])
  
    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
  
      const droppedFiles = e.dataTransfer.files
      if (droppedFiles.length > 0) {
        handleFile(droppedFiles[0])
      }
    }, [])
  
    const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFile(e.target.files[0])
      }
    }, [])
  
    const handleFile = (selectedFile: File) => {
      setFile(selectedFile)
      simulateUpload(selectedFile)
    }
    // const simulateUpload = (selectedFile: File) => {
    const simulateUpload = (selectedFile: File) => {
        console.log(selectedFile)
      setIsUploading(true)
      setUploadProgress(0)
  
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          const newProgress = prevProgress + 5
          if (newProgress >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return newProgress
        })
      }, 200)
    }
  
    const handleRemoveFile = () => {
      setFile(null)
      setUploadProgress(0)
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  
    const handleButtonClick = () => {
      fileInputRef.current?.click()
    }

  return (
    <div className="w-full">
        {!file ? (
        <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-full bg-gray-100">
                <Upload className="h-8 w-8 text-gray-500" />
            </div>
            <div>
                <p className="text-lg font-medium">Drag and drop your file here</p>
                <p className="text-sm text-gray-500 mt-1">or</p>
            </div>
            <button
                onClick={handleButtonClick}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                Browse Files
            </button>
            <p className="text-xs text-gray-400">Supported formats: JPG, PNG, PDF, MP3, MP4, etc.</p>
            </div>
            <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            accept="image/*,audio/*,video/*,application/pdf"
            />
        </div>
        ) : (
        <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Uploaded File</h3>
            <button onClick={handleRemoveFile} className="p-1 rounded-full hover:bg-gray-100" aria-label="Remove file">
                <X className="h-5 w-5 text-gray-500" />
            </button>
            </div>

            {/* Progress bar */}
            {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-xs text-gray-500 mt-1 text-right">{uploadProgress}% uploaded</p>
            </div>
            )}

            {/* File preview */}
            {/* <FilePreview file={file} /> */}
            <UploadPreview file={file} />
        </div>
        )}

    </div>
  )
}

export default DragnDrop