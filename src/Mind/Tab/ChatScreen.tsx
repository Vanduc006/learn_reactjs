import Chat from "@/components/mind/Chat"
import { Textarea } from "@/components/ui/textarea"
import { useMind } from "@/context/MindProvider"
import { Send, ArrowDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"

const ChatScreen = () => {
    const { currentSpace} = useMind()
    const [message, setMessage] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [textareaHeight, setTextareaHeight] = useState(40)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const [showScrollButton, setShowScrollButton] = useState(false)

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            const newHeight = Math.min(textarea.scrollHeight, 150) // Max height 150px
            setTextareaHeight(newHeight)
            textarea.style.height = `${newHeight}px`
        }
    }

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
            // Show button when scrolled up more than 100px from bottom
            setShowScrollButton(scrollHeight - scrollTop - clientHeight > 500)
        }
    }

    useEffect(() => {
        adjustTextareaHeight()
    }, [message])
  
    // scrollToBottom

    return (
        <div className="h-full flex flex-col relative">
            <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto"
                onScroll={handleScroll}
            >
                <div className="md:max-w-3xl max-w-xs mx-auto overflow-hidden">
                    <div className="pb-4">
                        <Chat currentSpace={currentSpace}/>
                    </div>
                    {/* Spacer div to prevent content from being hidden behind textarea */}
                    <div style={{ height: `${textareaHeight + 80}px` }} />
                </div>
            </div>

            {/* Scroll to bottom button */}
            {/* {showScrollButton && (
                <Button
                    onClick={scrollToBottom}
                    className="absolute bottom-[120px] right-4 md:right-[calc(50%-12rem)] rounded-full shadow-lg bg-white hover:bg-gray-100"
                    size="icon"
                >
                    <ArrowDown className="h-5 w-5" />

            )} */}

            <div className="absolute bottom-0 left-0 right-0 border-gray-200">
                <div className="md:max-w-3xl mx-auto ">
                  {showScrollButton && 
                    <ArrowDown 
                    onClick={scrollToBottom}
                    className="ml-auto w-4 h-4 bg-gray-200 rounded-full mb-2 "/>
                  }
                </div>
                <div className="md:max-w-3xl mx-auto bg-gray-200 rounded-md shadow-md p-2">
                    <div className="mb-2">
                        Recommend
                    </div>
                    <div className="relative">
                        <Textarea 
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your message..." 
                            className="resize-none border-none outline-none pr-10 min-h-[40px] max-h-[150px] overflow-y-auto"
                            style={{ height: 'auto' }}
                        />
                        <button className="absolute bottom-2 right-2 p-1 bg-gray-200 rounded-md transition-colors">
                            <Send className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatScreen