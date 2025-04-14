import type React from "react"

import { useState, useRef, useCallback } from "react"
// import { FilePreview } from "./file-preview"
import { Eye, Upload, X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import PreviewAudio from "./PreviewAudio"
import PreviewVideo from "./PreviewVideo"


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
      console.log(file?.type)
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
            multiple
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

            {/* files map in here */}
            <div className="text-sm flex items-center justify-content-center">

              {file.type.includes("image") && (
                <Dialog>
                  <DialogTrigger className="flex items-center pl-5 pr-5 pt-1 pb-1 mr-2 justify-content-center bg-gray-200 rounded-xl hover:scale-[1.02]">
                    <Eye className="w-4 h-4 mr-1"/>
                    Preview image
                  </DialogTrigger>
                  <DialogContent className="bg-gray-200 border-none p-1 bg-gray-50 overflow-hidden overflow-x-auto overflow-y-auto scrollbar-hide">
                      <DialogDescription className="flex gap-2">
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-sm h-sm rounded-md" />
                      </DialogDescription>
  
                  </DialogContent>
                </Dialog>
                      
              )}

              {file.type.includes("audio") && (
                <PreviewAudio File={file} />
              )}

              {file.type.includes("video") && (
                <PreviewVideo File={file} />

              )}

              {/* <div className="flex font-semibold "> 
                <svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.151.012c-2.802 0-5.073 2.272-5.073 5.073v53.842c0 2.802 2.272 5.073 5.073 5.073h45.774c2.803 0 5.075-2.271 5.075-5.073v-38.606l-18.903-20.309h-31.946z" fill="#379FD3"></path> <path d="M56 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z" fill="#2987C8"></path> <path d="M37.097.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z" opacity=".5" fill="#ffffff"></path> <path d="M29.798 34.036l-14.165 1.814v13.438c-.738-.205-1.628-.243-2.531-.064-2.009.394-3.325 1.702-2.938 2.918.386 1.215 2.325 1.88 4.333 1.48 1.764-.348 2.994-1.397 3.005-2.473h.002v-10.74l10.422-1.288v8.306c-.75-.212-1.655-.251-2.572-.068-2.03.399-3.357 1.718-2.969 2.947.389 1.229 2.35 1.897 4.379 1.499 1.849-.366 3.116-1.494 3.031-2.621v-15.148z" fill="#ffffff"></path> </g> </g></svg>
                {file.name}
              </div> */}
              
            </div>
        </div>
        )}

    </div>
  )
}

export default DragnDrop