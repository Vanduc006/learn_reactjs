import ChatList, { isHaveChat } from '@/services/Supabase/ChatList';
import { useUser } from '@clerk/clerk-react';
import { ScanText, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader';
import parse from 'html-react-parser';
import DateFormat from '../DateFormat';
import '@/styles/markdown.css'
// import { useUser } from '@clerk/clerk-react';

const ChatHistory = ({ currentSpace }: { currentSpace: string | null }) => {
    const { user } = useUser();
    const [chatSession, setChatSession] = useState<any[]>([]);
    const [isHave, setIsHave ] = useState(true)
    const [loadingChat,setLoadingChat] = useState(false)
    const [moreChat,setMoreChat] = useState(true)
    const lastChatRef = useRef(null)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const [lastCreatedAt, setLastCreatedAt] = useState(null);
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (currentSpace) {
            isHaveChat(currentSpace).then((data) => {
                setIsHave(data)
            })
        }  
    },[user,currentSpace,isHave,setMoreChat])

    async function CallTranslatorList(userID: string,spaceID : string,cursor = null) {
        ChatList(userID,spaceID,cursor).then((data) => {
            setLoadingChat(true)
            if (data.length < 10 ) {
                setMoreChat(false)
            }
            if (data.length > 0) {
                setChatSession((prev) => [...prev, ...data]); 
                setLastCreatedAt(data[data.length - 1].created_at);
            }
            setLoadingChat(false)
        })
    }

    useEffect(() => {
        if (isHave) {
            const observer = new IntersectionObserver((entries) => {
                const [entry] =  entries;
                setLoadingChat(entry.isIntersecting)
            },observerOptions)
    
            if (lastChatRef.current) {
                observer.observe(lastChatRef.current)
            } 
            if (loadingChat && currentSpace && user ) {
                const spaceID = currentSpace;
                if (!moreChat) {
                    return
                }
                else {
                    CallTranslatorList(user?.id,spaceID,lastCreatedAt)
                }
            }
            return () => {
                observer.disconnect()
            }
        }
    },[observerOptions,loadingChat,user]);

    // Scroll to bottom when chat session updates
    useEffect(() => {
        if (chatSession.length > 0) {
            scrollToBottom();
        }
    }, [chatSession]);

    return (
        <div>
            {/* {isHave ? <p>Có chat</p> : <p>Không có chat</p>} */}
            {isHave ? 
                <div>
                        <div>     
                        {chatSession.map((chat) => {
                            return (
                                <div key={chat.id}>
                                    <div className='ml-auto text-sm font-mono w-fit font-semibold mb-1 bg-green-200 rounded-md p-1'>
                                        <DateFormat utcTime={chat.created_at}/>
                                    </div>

                                    <div className='mb-5 flex items-center justify-content-center gap-2 '>
                                        <img
                                            src={user?.imageUrl}
                                            alt="User Avatar"
                                            className="w-6 h-6 rounded-md"
                                        />
                                        <div className='mt-2.5'>
                                            {parse(chat.message)}
                                        </div>
                                        
                                    </div>
                                    <div className='mb-5'>
                                        <div className=' items-center justify-content-center gap-2'>
                                            <img src="/favicon.svg" className="w-6 h-6 rounded-md mb-auto"/>
                                            <div className='markdown overflow-auto'>
                                                {chat.respone == '' ? 
                                                <div>
                                                    {parse(chat.respone)}
                                                </div> 
                                                : 
                                                <div className='markdown'>Unable to load this respone</div>
                                                }
                                            </div>
                                        </div>
                                        
                                        <div className='flex mt-2'>
                                            <ThumbsUp className='h-4 w-4 mr-1 ml-1'/> <ThumbsDown className='h-4 w-4 mr-1 ml-1'/> <ScanText className='h-4 w-4 mr-1 ml-1'/>
                                        </div>
                                        
                                    </div> 
                                    
                                </div>
                            );
                        })}
                    </div>
                    <div ref={lastChatRef}>
                        {moreChat && 
                            <p className='flex items-center '>      
                                <BeatLoader
                                    color='#4871f7'
                                    className=''
                                    loading={true}
                                    size={10}
                                />
                            </p>
                        }
                    </div>
                    {/* <div ref={chatContainerRef} /> */}
                </div>    
                : 
                <div className='bg-gray-200 text-black text-sm font-bold p-2 rounded-xl text-center mt-2'>
                    Ask me anything !
                </div>
                // guider hereeee
            }
        </div>
    )
}

export default ChatHistory