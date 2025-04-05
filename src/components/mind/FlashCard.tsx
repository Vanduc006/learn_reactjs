import FlashcardList from '@/services/Supabase/FlashcardList';
import { useEffect, useRef, useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import { CircleDashed, Pin, PinOff } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    // SheetDescription,
    // SheetHeader,
    SheetTitle,
    // SheetTrigger,
  } from "@/components/ui/sheet"
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { EffectCards } from 'swiper/modules';
import BeatLoader from 'react-spinners/BeatLoader';
import DateFormat from './DateFormat';
  
const FLashCard = () => {
    const [Open, setOpen] = useState<boolean>(false);
    // show list
    const { user } = useUser();
    const [flashcardSession, setFlashcardSession] = useState<any[]>([]);
    const [loadingFlashcard,setLoadingFlashcard] = useState(false)
    const [moreFlashcard,setMoreFlashcard] = useState(true)
    const lastFlashcardRef = useRef(null)
    const [lastCreatedAt, setLastCreatedAt] = useState(null); 
    const [selectedFlashcard,setSelectedFlashcard] = useState<any[]>([]);
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    };

    const [isReveal,setIsReveal] = useState(false)
    // const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    async function CallFlashcardList(clerkUserrId:string, cursor =  null) {
        
        FlashcardList(clerkUserrId,cursor).then(( data ) => {
            setLoadingFlashcard(true)
            if (data.length < 10) {
                setMoreFlashcard(false)
                
            }
            if (data.length > 0) {
                setFlashcardSession((prev) => [...prev,...data])
                setLastCreatedAt(data[data.length - 1].created_at);
                
            }
            setLoadingFlashcard(false)
        })
    }
    useEffect(() => {
        const observer =  new IntersectionObserver((entries) => {
            const [entry] = entries;
            setLoadingFlashcard(entry.isIntersecting)
        },observerOptions)
        if (lastFlashcardRef.current) {
            observer.observe(lastFlashcardRef.current)
        }
        if (loadingFlashcard && user ) {
            const clerkUserId = user?.id
            if (!moreFlashcard) {
                return
            }
            else {
                CallFlashcardList(clerkUserId,lastCreatedAt)
            }
        }
        return () => {

        }
    },[observerOptions,loadingFlashcard,user])
    // useEffect(() => {
    //     if ( user ) {
    //         const clerkUserId = user?.id
    //         FlashcardList(clerkUserId).then(( data ) => {
    //             console.log(data)
    //             // data.map((index) => {
    //             //     console.log(index.card_json)
    //             // })

    //             setFlashcardSession(data)
    //         })
    //     }

    // },[user])
    const OpenSheet = (card:any) => {
        setOpen(true)
        console.log(card)
        setSelectedFlashcard(card)

    }
    const CloseSheet = () => {
        setOpen(false)
    }
  return (
    <div>
        <div>

            {flashcardSession.map((flashcard,index) => {
                // const date = new Date(flashcard.created_at)
                // date.setHours(date.getHours() + 7);
                // const formatDate = date.toLocaleString("en-GB", {
                //     day: "2-digit",
                //     month: "short",
                //     hour: "2-digit",
                //     minute: "2-digit",
                //     second: "2-digit",
                //     hour12: false, // 24-hour format
                // }).replace(",", "");

                return (
                    <div key={index}>
                        <div className='bg-gray-200 p-1 rounded-xl mb-2 cursor-pointer p-2'>
                            <div className='text-black flex  items-center justify-content-center font-bold'
                            >
                                <CircleDashed className='w-4 h-4 items-center justify-content-center mr-1'/>{flashcard.title_flashcard}
                                {flashcard.ispin ? <PinOff className="w-4 h-4 ml-auto" /> : <Pin className="w-4 h-4 ml-auto" />}
                                {/* <Pin className="w-4 h-4 ml-auto" /> */}
                            </div> 
                            <br />
                            <div  className='flex'>
                                <div className='text-black  pr-5 pt-2 pb-2'><DateFormat utcTime={flashcard.created_at} /></div>
                                <div className='ml-auto bg-slate-300 rounded-xl pl-5 pr-5 pt-2 pb-2'
                                    onClick={() => {
                                        // console.log('open')
                                        setIsReveal(false)
                                        OpenSheet(flashcard.card_json?.card_sets)
                                        
                                    }}
                                >View</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        {/* <div className='bg-[#4871f7] p-1 rounded-xl mb-2 cursor-pointer drop-shadow-xl'>
            <div className='text-white flex  items-center justify-content-center'

            
            ><CircleDashed className='w-4 h-4 items-center justify-content-center mr-1'/> How to start with Nextjs</div> <br />
            <div  className='flex '>
                <div className='text-white'>07 Mar  03:13:41</div>
                <div className='ml-auto bg-slate-300 rounded-xl pl-2 pr-2'
                    onClick={() => {
                        console.log('open')
                        OpenSheet()
                    }}
                >View</div>
            </div>
        </div> */}
        {/* loading */}
        <div ref={lastFlashcardRef}>
            {moreFlashcard && 
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
        {/* drawer bottom */}
        <div>
        <Sheet open={Open} onOpenChange={CloseSheet}>

            <SheetContent side={'bottom'} className="h-[60%] bg-white text-black rounded-tl-xl rounded-tr-xl justify-content-center "> 
                <SheetTitle className='font-bold text-lg mb-1'>Flashcard Mode</SheetTitle>
                <p className='pl-2 pr-2 bg-[#4871f7] text-white w-fit rounded-xl'>Click to reveal answer</p>

                <div className=' h-[88%] mt-5 rounded-xl overflow-y-auto'>
                    <Swiper
                        onSlideChange={(swiper) => {
                            setIsReveal(false)
                            setActiveIndex(swiper.activeIndex)
                            // con
                        }}
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className='w-[80%] h-[300px] mt-2 rounded-xl items-center justify-content-center'
                    >
                        {Array.isArray(selectedFlashcard) && selectedFlashcard.map((card, index) => {
                            return (
                                <SwiperSlide key={index} className="bg-slate-300 rounded-xl" onClick={() => index === activeIndex && setIsReveal(true)}>
                                <div className="p-2 mt-[40%]" >
                                    <p className="text-center font-bold text-xl">{card.question}</p>
    

                                    <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: isReveal && index === activeIndex ? 1 : 0, y: isReveal && index === activeIndex ? 0 : -10 }}
                                    transition={{ duration: 0.1, ease: "easeInOut" }}
                                    className="absolute bottom-0 transform w-11/12 max-w-md p-4 bg-gray-100 rounded-md shadow-lg text-center mb-2"
                                    >
                                    {isReveal && index === activeIndex && <div>{card.answer}</div>}
                                    </motion.div>
                                </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </SheetContent>
        </Sheet>
        </div>
    </div>
  )
}

export default FLashCard