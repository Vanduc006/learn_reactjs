import TranslatorList, { isHaveTranslator } from '@/services/Supabase/TranslatorList';
import { SignedIn, useUser } from '@clerk/clerk-react';
import { ScanText, ThumbsDown, ThumbsUp, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader';
import parse from 'html-react-parser';
import DateFormat from './DateFormat';

const Chat = ({ currentSpace }: { currentSpace: string | null }) => {
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
        if (currentSpace) {
            isHaveTranslator(currentSpace).then((data) => {
                
                setIsHave(data)

            })
        }  

    },[user,currentSpace,isHave,setMoreChat])

    async function CallTranslatorList(spaceID : string,cursor = null) {

        TranslatorList(spaceID,cursor).then((data) => {

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


  // Load lại dữ liệu khi `currentSpace` thay đổi
    useEffect(() => {

        // Reset chat session và trạng thái liên quan khi currentSpace thay đổi
        setChatSession([]);  // Clear current chat session
        setMoreChat(true);   // Reset moreChat để có thể load thêm
        setLastCreatedAt(null); // Reset lastCreatedAt

        if (currentSpace) {
            CallTranslatorList(currentSpace);
        }

  
    }, [currentSpace]);

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
            if (loadingChat && currentSpace ) {
                // const clerkUserId = user?.id
                const spaceID = currentSpace;
                if (!moreChat) {
                    // console.log("No more chat")
                    return
                }
                else {
                    CallTranslatorList(spaceID,lastCreatedAt)
                }
                
                // console.log(clerkUserId)
                // console.log(loadingChat)
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
                                <div id='user' className='ml-auto mb-5 bg-black p-2 rounded-xl drop-shadow-2xl w-fit'>
                                    
                                    <div className='flex items-center bg-white p-1 rounded-xl mb-1 overflow-hidden'>
                                        
                                        <SignedIn>
                                            
                                            <User className='h-4 w-4 mr-1 ml-1'/>{user?.firstName} {user?.lastName}
                                        </SignedIn>
                                    </div> 
                                    
                                    {photos.length > 0 && (
                                        <div id="user-media" className="grid grid-cols-2 gap-2 mt-3 ">
                                            {photos.map((src:string, imgIndex:any) => (
                                                <img key={imgIndex} className="w-[100px] h-[100px] rounded-lg object-cover" src={src.trim()} alt="User Upload" />
                                            ))}
                                        </div>
                                    )}
                                    
                                </div>
                                <div id='mode' className='w-[80%] mb-1 bg-gray-200 p-2 rounded-xl drop-shadow-xl'>
  
                                    {parse(chat.api_respone_content)}
                                    
                                    <div className='flex'>
                                        <p></p>
                                    </div>
                                    <div className='flex mt-5'>
                                        <ThumbsUp className='h-4 w-4 mr-1 ml-1'/> <ThumbsDown className='h-4 w-4 mr-1 ml-1'/> <ScanText className='h-4 w-4 mr-1 ml-1'/>
                                    </div>
                                    
                                </div> 
                                <div className='text-sm mb-5'>
                                    <DateFormat utcTime={chat.created_at}/>
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
                {/* move chat ref to top */}

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

export default Chat