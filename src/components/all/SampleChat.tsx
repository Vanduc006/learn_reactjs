"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ImageIcon } from "lucide-react"

interface Message {
  id: string
  sender: "user" | "bot"
  content: string
  images?: string[]
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [images, setImages] = useState<string[]>([])

  const handleSend = () => {
    if (input.trim() || images.length > 0) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        content: input,
        images: images.length > 0 ? images : undefined,
      }
      setMessages((prev) => [...prev, newUserMessage])

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          content: "This is a simulated bot response.",
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)

      setInput("")
      setImages([])
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
            {message.sender === "user" && message.images && (
              <div className="flex flex-wrap justify-end gap-2 mb-2">
                {message.images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`User uploaded image ${index + 1}`}
                    className="max-w-xs max-h-40 rounded-lg"
                  />
                ))}
              </div>
            )}
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
            <ImageIcon className="h-4 w-4" />
            <span className="sr-only">Upload image</span>
          </Button>
          <Input
            type="file"
            id="image-upload"
            className="hidden"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

