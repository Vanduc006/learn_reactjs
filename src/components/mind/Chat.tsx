import TranslatorList, { isHaveTranslator } from '@/services/Supabase/TranslatorList';
import { SignedIn, useUser } from '@clerk/clerk-react';
import { Bot, ScanText, ThumbsDown, ThumbsUp, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader';
import parse from 'html-react-parser';
import DateFormat from './DateFormat';

const Chat = () => {
    const { user } = useUser();
    const [chatSession, setChatSession] = useState<any[]>([]);
    const [isHave, setIsHave ] = useState(true)
    const [loadingChat,setLoadingChat] = useState(false)
    const [moreChat,setMoreChat] = useState(true)
    const lastChatRef = useRef(null)
    const [lastCreatedAt, setLastCreatedAt] = useState(null);
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    };
    useEffect(() => {
        if (user) {
            isHaveTranslator(user?.id).then((data) => {
                setIsHave(data)
            })
        }
    },[user])

    async function CallTranslatorList(clerkUserId : string,cursor = null) {
        TranslatorList(clerkUserId,cursor).then((data) => {

            // if (!moreChat || loadingChat) {
            //     console.log("morechat false , loading false")
            //     return
            // }
            // console.log(data)
            setLoadingChat(true)
            // if (data.length === 0 ) {
            //     setIsHave(false)
            // }
            if (data.length < 10 ) {
                // console.log("data.length < 20")
                setMoreChat(false)
            }
            if (data.length > 0) {
                // console.log("data.length > 0")
                setChatSession((prev) => [...prev, ...data]); 
                setLastCreatedAt(data[data.length - 1].created_at);
                // console.log(chatSession)
            }
            // if (data.length === 0) {
            //     console.log('Chat history not exists')
            // }
            // setChatSession(data)
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
                // console.log(loadingChat)
            } 
            if (loadingChat && user ) {
                const clerkUserId = user?.id
                if (!moreChat) {
                    console.log("No more chat")
                    return
                }
                else {
                    CallTranslatorList(clerkUserId,lastCreatedAt)
                }
                
                // console.log(clerkUserId)
                console.log(loadingChat)
            }
            return () => {
                // if (lastChatRef.current) {
                //     observer.unobserve(lastChatRef.current)
                // }
            }
        }
    },[observerOptions,loadingChat,user,isHave]);
  return (
    <div>
        {/* {isHave ? <p>Có chat</p> : <p>Không có chat</p>} */}
        {isHave ? 
            <div>
                    <div>
                    
                    {chatSession.map((chat, index) => {
                        // Chuyển `{url1,url2,url3}` thành mảng hợp lệ
                        // console.log(chat.id)
                        const photos = chat.photos_prompt_url
                            ? chat.photos_prompt_url.replace(/{|}/g, "").split(",")
                            : [];

                        return (
                            <div key={index}>
                                <div id='user' className='ml-auto mb-5 bg-[#4871f7] p-2 rounded-xl drop-shadow-2xl max-w-[75%]'>
                                    
                                    <div className='flex items-center bg-white p-1 rounded-xl mb-1 overflow-hidden'>
                                        
                                        <SignedIn>
                                            
                                            <User className='h-4 w-4 mr-1 ml-1'/>{user?.firstName} {user?.lastName}
                                        </SignedIn>
                                    </div> 
                                    
                                    {photos.length > 0 && (
                                        <div id="user-media" className="grid grid-cols-3 gap-2 mt-3">
                                            {photos.map((src:string, imgIndex:any) => (
                                                <img key={imgIndex} className="w-[100px] h-[100px] rounded-lg object-cover" src={src.trim()} alt="User Upload" />
                                            ))}
                                        </div>
                                    )}
                                    
                                </div>
                                <div id='mode' className='w-[90%] mb-5 bg-slate-300 p-2 rounded-xl drop-shadow-xl'>
                                    <div className='flex items-center bg-white p-1 rounded-xl mb-1'>
                                        
                                        {/* creat at {chat.created_at} */}
                                        <Bot className='h-4 w-4 mr-1 ml-1'/> Translator
                                        <div className='ml-auto bg-slate-100 p-1 rounded-xl'><DateFormat utcTime={chat.created_at}/></div>
                                    </div>    

                                    
                                    {parse(chat.api_respone_content)}
                                    
                                    <div className='flex mt-5'>
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
            </div>    
            : 
            <div className='bg-[#4871f7] text-white p-2 rounded-xl'>Chào mừng bạn đến với MIND</div>
            // guider hereeee
        }
    </div>
  )
}

export default Chat