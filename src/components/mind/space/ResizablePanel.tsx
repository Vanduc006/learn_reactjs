"use client"

import type React from "react"

import { useState, useRef, useEffect, type ReactNode } from "react"

interface ResizablePanelProps {
  children: ReactNode
  initialWidth: number
  minWidth?: number
  maxWidth?: number
}

export default function ResizablePanel({ children, initialWidth, minWidth = 10, maxWidth = 200 }: ResizablePanelProps) {
  const [width, setWidth] = useState(initialWidth)
  const [isDragging, setIsDragging] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef<number>(0)
  const startWidthRef = useRef<number>(initialWidth)
  const containerRef = useRef<HTMLElement | null>(null)

  // Find the scrollable container on mount
  useEffect(() => {
    if (panelRef.current) {
      let parent = panelRef.current.parentElement
      while (parent) {
        if (
          parent.scrollWidth > parent.clientWidth ||
          window.getComputedStyle(parent).overflowX === "auto" ||
          window.getComputedStyle(parent).overflowX === "scroll"
        ) {
          containerRef.current = parent
          break
        }
        parent = parent.parentElement
      }
    }
  }, [])

  // Handle mouse down on the resize handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    startXRef.current = e.clientX
    startWidthRef.current = width
  }

  // Handle mouse move for resizing with auto-scrolling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - startXRef.current
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + deltaX / 10))
      setWidth(newWidth)

      // Auto-scroll logic
      if (containerRef.current && panelRef.current) {
        const container = containerRef.current
        const panelRect = panelRef.current.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        // If the resize handle is beyond the right edge of the visible container
        if (panelRect.right > containerRect.right - 20) {
          // Scroll right to keep the handle visible
          container.scrollLeft += Math.min(15, panelRect.right - containerRect.right + 20)
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, minWidth, maxWidth])

  return (
    <div ref={panelRef} className="relative h-full flex-shrink-0" style={{ width: `${width}vh` }}>
      {children}

      {/* Resize handle */}
      <div
        className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-gray-500 ${
          isDragging ? "bg-gray-500 rounded-xl" : "bg-gray-200"
        }`}
        onMouseDown={handleMouseDown}
      />
    </div>
  )
}
