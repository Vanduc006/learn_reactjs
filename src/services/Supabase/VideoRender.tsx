"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Download, Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VideoPlayer({
  videoSrc = "https://res.cloudinary.com/dkgluft3l/video/upload/v1741572466/13182344_3840_2160_25fps_jipxnn.mp4",
  videoTitle = "Cinematic Nature Footage",
//   videoDescription = "This breathtaking 4K footage captures the serene beauty of nature in stunning detail. The video showcases lush landscapes, flowing water, and vibrant colors that highlight the natural world's magnificence.",
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isYouTube, setIsYouTube] = useState(false)
  const [youtubeId, setYoutubeId] = useState("")

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Extract YouTube video ID from URL
  useEffect(() => {
    const extractYouTubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[2].length === 11 ? match[2] : null
    }

    const isYouTubeUrl = (url: string) => {
      return url.includes("youtube.com") || url.includes("youtu.be")
    }

    if (isYouTubeUrl(videoSrc)) {
      const id = extractYouTubeId(videoSrc)
      if (id) {
        setIsYouTube(true)
        setYoutubeId(id)
      }
    } else {
      setIsYouTube(false)
      setYoutubeId("")
    }
  }, [videoSrc])

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Handle play/pause
  const togglePlay = () => {
    if (isYouTube) {
      // YouTube iframe API doesn't work well in this context
      // This is a simplified approach
      return
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    if (isYouTube) return

    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (isYouTube) return

    if (videoRef.current) {
      const newVolume = value[0]
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (isYouTube) return

    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
      if (isMuted) {
        videoRef.current.volume = volume || 1
      } else {
        videoRef.current.volume = 0
      }
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
      } else {
        document.exitFullscreen()
      }
    }
  }

  // Handle video download
  const handleDownload = () => {
    if (isYouTube) {
      // YouTube doesn't allow direct downloads
      alert("Direct downloads from YouTube are not supported due to their terms of service.")
      return
    }

    if (videoRef.current) {
      const videoSrc = videoRef.current.querySelector("source")?.src
      if (videoSrc) {
        const a = document.createElement("a")
        a.href = videoSrc
        a.download = "video-download.mp4"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    }
  }

  // Update time as video plays
  useEffect(() => {
    if (isYouTube) return

    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [isYouTube])

  // Auto-hide controls after inactivity
  const showControlsTemporarily = () => {
    if (isYouTube) return

    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={playerRef}
        className="relative w-full overflow-hidden rounded-lg aspect-video bg-black"
        onMouseMove={!isYouTube ? showControlsTemporarily : undefined}
        onMouseLeave={!isYouTube ? () => isPlaying && setShowControls(false) : undefined}
      >
        {isYouTube ? (
            //                     <iframe 
            //                     ref={iframeRef}
            // width="100%"
            // height="100%"
            // frameBorder="0"
            //                     src="https://www.youtube.com/embed/BV16FVY0Y6I" title="Камин - EMIN &amp; JONY (slowed 10min version)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        ) : (
          <>
            <video ref={videoRef} className="w-full h-full" onClick={togglePlay} onEnded={() => setIsPlaying(false)}>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause overlay button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-20 h-20 text-white bg-black/30 rounded-full hover:bg-black/50"
                  onClick={togglePlay}
                >
                  <Play className="w-10 h-10 fill-white" />
                </Button>
              </div>
            )}

            {/* Video title */}
            <div
              className={`absolute inset-x-0 top-0 p-4 text-lg font-medium text-white bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
            >
              {videoTitle}
            </div>

            {/* Controls */}
            <div
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
            >
              {/* Progress bar */}
              <div className="px-4 pt-8 pb-1">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="w-full cursor-pointer [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary"
                />
              </div>

              {/* Control buttons */}
              <div className="flex items-center gap-2 p-2 text-white">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={togglePlay}>
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>

                <div className="flex items-center gap-2 ml-1">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>

                  <div className="w-24 hidden sm:block">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      min={0}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="cursor-pointer [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary"
                    />
                  </div>
                </div>

                <div className="text-sm mx-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleDownload}>
                  <Download className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white ml-auto hover:bg-white/20"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {isYouTube && (
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This is a YouTube video. Custom controls and direct downloads are not available due to YouTube's terms of
            service.
          </AlertDescription>
        </Alert>
      )}

      {/* Video Description Section */}
      <div className="mt-4 p-4 bg-card rounded-lg border shadow-sm">
        {/* <h2 className="text-xl font-semibold mb-2">{videoTitle}</h2> */}
        <div className="flex flex-wrap gap-4 mb-3 text-sm text-muted-foreground">
          {!isYouTube && (
            <>
              <div className="flex items-center gap-1">
                <span className="font-medium">Duration:</span> {formatTime(duration)}
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Resolution:</span> 3840 × 2160 (4K)
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">Format:</span> MP4
              </div>
            </>
          )}
          {/* {isYouTube && (
            <div className="flex items-center gap-1">
              <span className="font-medium">Source:</span> YouTube
            </div>
          )} */}
        </div>
        {/* <p className="text-sm text-muted-foreground mb-3">{videoDescription}</p>
        {!isYouTube && (
          <p className="text-sm text-muted-foreground">
            Perfect for backgrounds, creative projects, or simply enjoying the tranquility of nature in high definition.
            The footage was captured using professional equipment to ensure the highest quality visual experience.
          </p>
        )} */}
      </div>
    </div>
  )
}

