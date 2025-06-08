// import Chat from "@/components/mind/history/Chat"
import ChatHistory from "@/components/mind/history/Chat"
import { Textarea } from "@/components/ui/textarea"
import { useMind } from "@/context/MindProvider"
import { useUser } from "@clerk/clerk-react"
import { Send, ArrowDown, ThumbsUp, ThumbsDown, ScanText } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import dayjs from 'dayjs';
import BeatLoader from "react-spinners/BeatLoader"
// import { Button } from "@/components/ui/button"

const ChatScreen = () => {
    const { currentSpace} = useMind()
    const { user } = useUser()
    const [message, setMessage] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [textareaHeight, setTextareaHeight] = useState(40)
    // const [gapSize,setGapSize] = useState(0)
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

    interface Message {
      userid : string,
      spaceid : string,
      message : string,
      
    }

    const [currentMessageList,setCurrentMessageList] = useState<Message[]>([])
    const handleSendingMessage = () => {
      // setGapSize(200)
      const newMessage : Message = {
        userid : `${user?.id}`,
        spaceid : `${currentSpace}`,
        message : `${message}`,
        // res
        
      }
      setCurrentMessageList((prev) => [
        ...prev,
        newMessage,
      ])
      setMessage('')
      scrollToBottom()
    }

    useEffect(() => {
      const timeout = setTimeout(() => {
        scrollToBottom();
      }, 0);
      return () => clearTimeout(timeout);
    }, [currentMessageList]);


    useEffect(() => {
        adjustTextareaHeight()
    }, [message])

    return (
        <div className="h-full flex flex-col relative">
            <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto"
                onScroll={handleScroll}
            >
                <div className="md:max-w-3xl max-w-xs mx-auto overflow-hidden">
                    <div className="pb-4">
                        <ChatHistory currentSpace={currentSpace}/>

                        {
                          currentMessageList && 
                          <div>
                            {currentMessageList.map((message,id) => {
                              return (
                                <div key={id}>
                                    <div className='ml-auto text-sm font-mono w-fit font-semibold mb-1 bg-green-200 rounded-md p-1'>
                                        {dayjs().format('DD MMM HH:mm:ss')}
                                        {/* <DateFormat utcTime={chat.created_at}/> */}
                                    </div>

                                    <div className='mb-5 flex items-center justify-content-center gap-2 '>
                                        <img
                                            src={user?.imageUrl}
                                            alt="User Avatar"
                                            className="w-6 h-6 rounded-md"
                                        />
                                        <div className='mt-2.5'>
                                            {message.message}
                                        </div>
                                        
                                    </div>

                                    <div className='mb-5'>
                                        <div className=' items-center justify-content-center gap-2'>
                                            <img src="/favicon.svg" className="w-6 h-6 rounded-md mb-auto"/>
                                            <div className='markdown overflow-auto'>
                                                {/* {parse(chat.respone)} */}
                                                <div className="gap-2 flex items-center justify-content-center">
                                                Waiting respone <BeatLoader size={10} color='#4871f7'/>

                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className='flex mt-2'>
                                            <ThumbsUp className='h-4 w-4 mr-1 ml-1'/> 
                                            <ThumbsDown className='h-4 w-4 mr-1 ml-1'/>
                                            <ScanText className='h-4 w-4 mr-1 ml-1'/>
                                        </div>
                                        
                                    </div>

                                </div>
                              )
                            })}
                          </div>
                        }
                        {/* New chat section */}
                    </div>
                    <div style={{ height: `${textareaHeight + 80}px` }} />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-gray-200 md:px-2 px-0">
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
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (message.trim() !== '' ) {
                                   handleSendingMessage()
                                }

                                else {
                                  alert("Please fill the message box")
                                  setMessage('')
                                }
                                // console.log('User pressed Enter!');
                                // // Gọi hàm submit tại đây nếu cần
                              }
                            }}
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