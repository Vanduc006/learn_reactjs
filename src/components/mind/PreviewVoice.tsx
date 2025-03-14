"use client"

import { useEffect, useRef, useState } from "react"
import { Speech, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

// Audio track data
const AUDIO_TRACKS = [
  {
    id: 1,
    title : "Trung Hà, trung tiên giọng Bắc trầm",
    url: "https://res.cloudinary.com/dkgluft3l/video/upload/v1741772495/trungha_yhutm6.mp3",
  },
  {
    id: 2,
    title : "Huyền Phạm, giọng Nam diễn cảm",
    url: "https://res.cloudinary.com/dkgluft3l/video/upload/v1741772495/huyenpham_pfcfjv.mp3",
  },
  {
    id: 3,
    title : "Hope, english voice",
    url: "https://res.cloudinary.com/dkgluft3l/video/upload/v1741772991/Hope_w7nxin.mp3",
  },
]

function AudioTrack({ track }: { track: (typeof AUDIO_TRACKS)[0] }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioData, setAudioData] = useState<number[]>([])
  
    const audioRef = useRef<HTMLAudioElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()
    const analyserRef = useRef<AnalyserNode | null>(null)
    const dataArrayRef = useRef<Uint8Array | null>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  
    // Initialize audio context and analyzer
    useEffect(() => {
      if (typeof window !== "undefined") {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        audioContextRef.current = new AudioContext()
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256
  
        const bufferLength = analyserRef.current.frequencyBinCount
        dataArrayRef.current = new Uint8Array(bufferLength)
  
        // Generate some initial random data for the waveform when not playing
        const initialData = Array(bufferLength)
          .fill(0)
          .map(() => Math.random() * 30)
        setAudioData(initialData)
      }
  
      return () => {
        if (sourceRef.current) {
          sourceRef.current.disconnect()
        }
        if (audioContextRef.current) {
          audioContextRef.current.close()
        }
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [])
  
    // Set up audio element and connect to analyzer
    useEffect(() => {
      const audio = audioRef.current
      if (!audio || !audioContextRef.current || !analyserRef.current) return
  
      // Only create the source once
      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audio)
        sourceRef.current.connect(analyserRef.current)
        analyserRef.current.connect(audioContextRef.current.destination)
      }
  
      audio.addEventListener("ended", () => {
        setIsPlaying(false)
      })
  
      return () => {
        audio.removeEventListener("ended", () => {})
      }
    }, [])
  
    // Animation function for the sound wave
    const animate = () => {
      if (!analyserRef.current || !dataArrayRef.current || !canvasRef.current) return
  
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return
  
      const width = canvas.width
      const height = canvas.height
  
      ctx.clearRect(0, 0, width, height)
  
      if (isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current)
        setAudioData(Array.from(dataArrayRef.current))
      }
  
      // Draw the waveform
      const barWidth = width / audioData.length
  
      ctx.fillStyle = "#000000" // Black color for the bars
  
      audioData.forEach((value, index) => {
        const scaledValue = isPlaying ? ((value / 255) * height) / 1.5 : value
        const x = index * barWidth
        const barHeight = scaledValue
  
        // Draw the bar
        ctx.beginPath()
        ctx.roundRect(x, height / 2 - barHeight / 2, barWidth - 1, barHeight, [2])
        ctx.fill()
      })
  
      animationRef.current = requestAnimationFrame(animate)
    }
  
    // Start/stop animation based on play state
    useEffect(() => {
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
      } else if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
  
        // When paused, slowly reduce the bar heights to create a "calming" effect
        const calmAnimation = () => {
          setAudioData((prev) =>
            prev.map((value) => {
              const newValue = value * 0.95
              return newValue < 3 ? Math.random() * 3 : newValue
            }),
          )
  
          if (Math.max(...audioData) > 3) {
            animationRef.current = requestAnimationFrame(calmAnimation)
          }
        }
  
        animationRef.current = requestAnimationFrame(calmAnimation)
      }
  
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [isPlaying, audioData])
  
    // Handle play/pause
    const togglePlay = () => {
      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume()
      }
  
      if (isPlaying) {
        audioRef.current?.pause()
      } else {
        audioRef.current?.play()
      }
  
      setIsPlaying(!isPlaying)
    }
  
    return (
      <div className="w-full border-b border-gray-100 last:border-b-0">
        {/* Play Button */}
        <div>{track.title}</div>
        <div className="flex items-center">
            <Button
            onClick={togglePlay}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-2 border-black bg-white hover:bg-gray-100 text-black flex-shrink-0 mr-2"
            >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Speech className="h-5 w-5 ml-0.5" />}
            </Button>
    
            {/* Waveform Visualization */}
            <div className="h-8 w-full bg-slate-200 rounded-lg overflow-hidden border border-gray-100">
            <canvas ref={canvasRef} width={500} height={30} className="w-full h-full" />
            </div>
    
            {/* Hidden audio element */}
            <audio ref={audioRef} src={track.url} crossOrigin="anonymous" preload="metadata" className="hidden" />
            </div>
      </div>
    )
  }

const PreviewVoice = () => {
  return (
    <div className="">
      <div className="w-full">
        {AUDIO_TRACKS.map((track) => (
          <div className="mb-1">
            <AudioTrack key={track.id} track={track}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreviewVoice