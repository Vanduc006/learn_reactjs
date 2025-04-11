import { useState, useEffect } from "react"

// import { FileText, Film, Music, File } from "lucide-react"

interface FilePreviewProps {
  file: File
}
const UploadPreview = ({ file }: FilePreviewProps) => {
    const [preview, setPreview] = useState<string | null>(null)
    const [fileType, setFileType] = useState<"image" | "audio" | "video" | "pdf" | "other">("other")
  
    useEffect(() => {
      if (!file) return
  
      // Determine file type
      if (file.type.startsWith("image/")) {
        setFileType("image")
      } else if (file.type.startsWith("audio/")) {
        setFileType("audio")
      } else if (file.type.startsWith("video/")) {
        setFileType("video")
      } else if (file.type === "application/pdf") {
        setFileType("pdf")
      } else {
        setFileType("other")
      }
  
      // Create preview URL
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
      }
    }, [file])
  return (
    <div className="flex flex-col">
    <div className="flex items-center space-x-3 mb-2">
      {/* {getFileIcon(fileType)} */}
      <div className="overflow-hidden">
        <p className="font-medium truncate">{file.name}</p>
        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
      </div>
      <div className="hidden">
        {preview}
        {fileType}
      </div>
    </div>

    
  </div>
  )
}

export default UploadPreview

function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
  
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
  
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }