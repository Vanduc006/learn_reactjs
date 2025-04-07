import { Button } from '@/components/ui/button';
import 
React,
 { useState, useRef, useEffect, 
    // useCallback 
} 
 from 'react'
import Webcam from "react-webcam";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//     Sheet,
//     SheetContent,
//     // SheetDescription,
//     // SheetHeader,
//     SheetTitle,
//     // SheetTrigger,
//   } from "@/components/ui/sheet"
import {
    Dialog,
    DialogClose,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
    Select1,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel"
// import { Card, CardContent } from "@/components/ui/card"

import { Aperture, Mic, Languages, BookText, Podcast, Settings, SwitchCamera,
    Camera, CameraOff,
    ArrowLeftRight
    // Send,
 } from 'lucide-react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import { SignedIn, SignedOut, SignIn, 
    SignUp, 
    // SignOutButton, 
    UserButton, useUser} from "@clerk/clerk-react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
// import { EffectCards } from 'swiper/modules';
// import Markdown from 'react-markdown'
// import ReactFlipCard from 'reactjs-flip-card'
import Marquee from 'react-fast-marquee';

//services
import { UploadImages } from '@/services/Cloudinary/UploadImages';
import { TranslatorNew } from '@/services/Supabase/TranslatorList';
import VideoPlayer from '@/components/mind/VideoRender';
// import Chat from '@/components/mind/Chat';
import PreviewVoice from '@/components/mind/PreviewVoice';
import FLashCard from '@/components/mind/FlashCard';
import Quizz from '../../components/mind/Quizz';
import { isHaveFlashcard } from '@/services/Supabase/FlashcardList';
import { isHaveQuizz } from '@/services/Supabase/QuizList';
import UserRecent from '@/components/mind/UserRecent';
// import { Textarea } from '@/components/ui/textarea';
// import InstallPrompt from '@/components/all/InstallSafari';
// import BottomSheet from '@/components/all/BottomSheet';
// import ChatInterface from '@/components/all/SampleChat';

// Năm mới vạn sự hanh thông
const animatedComponents = makeAnimated();
const list_languages_sp = [
    {"value":"VN","label":"🇻🇳 Vietnam"},
    { "value": "CN", "label": "🇨🇳 China" },
    { "value": "EN", "label": "🇬🇧 English" },
    { "value": "FR", "label": "🇫🇷 France" },
    { "value": "JP", "label": "🇯🇵 Japan" },
    { "value": "TH", "label": "🇹🇭 Thailand" },
    { "value": "DE", "label": "🇩🇪 Đức" },
    { "value": "ES", "label": "🇪🇸 Tây Ban Nha" }
]

const Mind = () => {

    const [photos, setPhotos] = useState<string[]>([]);
    // const [Open, setOpen] = useState<boolean>(false);
    const [modeCam, setModeCam] = useState<'user' | 'environment'>('user');
    const [mirroredCam, setMirroredCam] = useState(true);
    const [Development, setDevelopment] = useState(false);

    const webcamRef:any = useRef(null);
    const capturePhoto = () => {
      const imageSrc = webcamRef.current.getScreenshot();
    //   console.log(JSON.stringify(imageSrc))
      setPhotos((prevPhotos) => [imageSrc, ...prevPhotos].slice(0, 4));
    };

    // set show user drag to see content
    // const [hidden, setHidden] = useState(false);
    
    const toogleDevelopment = () => {
        if (Development) {
            setDevelopment(false)
        }
        else {
            setDevelopment(true)
        }
    }
    const toggleCameraMode = () => {
    if (modeCam === 'environment') {
        setModeCam('user');
        setMirroredCam(true); // Mirror the camera for the front-facing user camera
    } else {
        setModeCam('environment');
        setMirroredCam(false); // No mirroring for the environment (rear) camera
    }
    };
    // const OpenSheet = () => {
    //     setOpen(true)
    // }
    // const CloseSheet = () => {
    //     setOpen(false)
    // }
    const videoConstraints = {
        facingMode: modeCam,
    };


    // const speakText = (text:string) => {
    //     const speech = new SpeechSynthesisUtterance(text);
    //     speech.lang = "en-US"; // Change to "vi-VN" for Vietnamese
    //     speech.rate = 1; // Adjust speed
    //     window.speechSynthesis.speak(speech);
    // };


    const [hasCamera, setHasCamera] = useState(false);
    useEffect(() => {
        async function checkCamera() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === "videoinput");
            setHasCamera(videoDevices.length > 0);
        } catch (error) {
            console.error("Error checking camera:", error);
            setHasCamera(false);
        }
        }

        checkCamera();
    }, []);

    const handleDragStart = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (event.type === "touchstart") {
          document.body.style.overflow = "hidden"
        }
    }
    const handleDragEnd = () => {
        document.body.style.overflow = ""
    }
    // auth
    const [openClerk, setOpenClerk] = useState(true);
    const { user } = useUser(); // Lấy thông tin user trước khi dùng
    const [isSignUp, setIsSignUp] = useState(false);
    const appearance = {
        elements: {
          footerActionLink: "hidden", // Hides the link (Sign In / Sign Up)
          footerActionText: "hidden", // Hides the text (e.g., "Already have an account?")
        },
    };
      
    // upload
    // const [Havefile,isHavefile] = useState(false)
    // const iduser = async(iduser: any) => {
    //     try {
    //         const res = await fetch("http://localhost:5000/iduser", {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             iduser: iduser,

    //           }),
    //         });
    
    //         const data = await res.json();
    //         console.log(data)
    //       } catch (error) {
    //         console.error("Error posting data:", error);
            
    //       }
    // }

    // useEffect(() => {
    //     if(user) {
    //         const clerkid = user?.id
    //         console.log(clerkid)
    //         iduser(clerkid)
    //     }
    //     fetch('http://localhost:5000/envirorment')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data.envirorment);

    //         })
    //         .catch(error => console.error("Error fetching data:", error));
    // }, [user]);
    
    // const base64_list = [
    //     "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gemini_SS.width-1300.jpg",
    //     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/2560px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg",
    //     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/2560px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg",
    // ];
    // const [photosPromptUrls, setPhotosPromptUrls] = useState<string[] | null>(null);

    // check to show 
    const [flashcard,setFlashcard] = useState(false)
    const [quizz,setQuizz] = useState(false)
    useEffect(() => {
        if (user) {
            isHaveFlashcard(user.id).then((data) => {
                setFlashcard(data)
            })
            isHaveQuizz(user.id).then((data) => {
                
                setQuizz(data)
            })
        }
    },[user])


  return (
    <main className='min-h-screen w-full  h-screen overflow-x-hidden overflow-y-auto'>
        <div className="bg-slate-300 text-black  hidden sm:block text-center p-5 justify-content-center items-center w-full h-screen">
            Sorry, during development imasis mind only support Mobile phones<br />
            Try TraCuuPhatNguoi page if you like, at route /phatnguoi
        </div>

        <div className='min-h-screen w-full  h-screen overflow-x-hidden overflow-y-auto bg-slate-300 text-white block sm:hidden'>
        {/* <InstallPrompt /> */}

            <div className='flex justify-content-center items-center text black ml-5 mr-5 mt-2 block  text-white mt-5'>
                <div className='flex justify-content-center items-center rounded-xl p-1 drop-shadow-xl bg-[#4871f7] '>
                    
                    <Dialog>    
                            <DialogTrigger><Settings className='flex '/></DialogTrigger>
                            <DialogContent className='bg-white text-black max-w-full md:w-[500px] w-[90%] h-auto rounded-xl absolute top-0 mt-[90%]'>
                                
                                <DialogTitle className='mt-5'>Chọn những ngôn ngữ phù hợp với ngữ cảnh của bạn</DialogTitle>
                                <Select
                                    className='border-none'
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={[list_languages_sp[0], list_languages_sp[2]]}
                                    isMulti
                                    options={list_languages_sp}
                                />
                                <DialogTitle className='mb-5 mt-5'>Gói đăng kí của bạn</DialogTitle>
                                <DialogTitle className='mb-2'>Giọng đọc</DialogTitle>
                                
                                <PreviewVoice/>

                                <DialogClose asChild>
                                    <Button type="button" className='bg-[#4871f7] drop-shadow-xl text-white'>
                                        Lưu hoặc Đóng
                                    </Button>
                                </DialogClose>
                            </DialogContent>
                    </Dialog>

                    <div className=''>
                        {hasCamera === null ? (
                                <p></p>
                            ) : hasCamera ? (
                                <div className='ml-5 bg-[#5A8DF7] rounded-xl p-1 opacity-75' onClick={toogleDevelopment}>
                                    {(() => {
                                        if (Development) {
                                            return (
                                                <p className='flex items-center'><CameraOff className='h-4 w-4 mr-2'/> Tắt Camera</p>
                                            );
                                        } else {
                                            return (
                                                <p className='flex items-center'><Camera className='h-4 w-4 mr-2'/> Bật Camera</p>
                                            );
                                        }
                                    })()}
                                    
                                </div>
                            ) : (
                                <div className='ml-5 bg-[#5A8DF7] rounded-xl p-1 opacity-50'>
                                    <p className='flex items-center'><CameraOff className='h-4 w-4 mr-2'/>notfound</p>
                                </div>
                        )}
                    </div>
                    
                    
                </div>
                <div className='ml-auto'>
                        <div className='flex rounded-xl items-center'>
                            {/* <div className='flex w-5 h-5 text-black opacity-75 mr-2'>
                                <iframe src="https://lottie.host/embed/af45882e-8502-4adb-9d6c-739d823b65db/O9CEimqPF0.lottie" className='w-[100%] h-[100%]'></iframe>
                            </div>   */}
                            <div className='text-white'>
                                <SignedOut>
                                    <div onClick={() => setOpenClerk(true)} className='cursor-pointer bg-[#4871f7] p-2 rounded-xl'>
                                        Đăng nhập
                                    
                                    </div>
                                </SignedOut>       
                                <SignedIn>                    
                                    <div className='flex items-center p-1'>
                                        <div className='rounded-md'>
                                            <UserButton afterSignOutUrl="/mind" afterSwitchSessionUrl="/mind" afterMultiSessionSingleSignOutUrl='/mind' /> 
                                        </div>                                        
                                        {/* <p className='ml-2'>Xin chào {user?.firstName} {user?.lastName}</p> */}
                                    </div>                               
                                </SignedIn>
                            </div>
                        </div>
                </div>
                
            </div>
            
            {/* <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h1>📌 Streaming HTML with AI-Like Typing Effect</h1>
            <div
                onClick={() => setStartStreaming(true)}
                style={{
                    padding: "10px 15px",
                    fontSize: "16px",
                    cursor: "pointer",
                    marginBottom: "10px",
                }}
            >const swiperRef = useRef(null);
                📝 Start Streaming
            </div>
            <div dangerouslySetInnerHTML={{ __html: displayedContent.join("") }} />
            </div> */}
            <div className='flex overflow-x-auto whitespace-nowrap space-x-2 ml-5 mr-5 mt-2  max-w-lg scrollbar-hide md:scrollbar-default overflow-hidden text-black rounded-xl'>
                <div className='flex items-center bg-white p-2 rounded-xl opacity-75 cursor-not-allowed'>
                    <Mic className='h-4 w-4 mr-2'/> Giao Tiếp
                </div>
                <div className='flex items-center bg-white p-2 rounded-xl'>
                    <Languages className='h-4 w-4 mr-2'/> Dịch thuật
                </div>
                <div className='flex items-center bg-white p-2 rounded-xl opacity-75 cursor-not-allowed'>
                    <BookText className='h-4 w-4 mr-2'/> Học tập
                </div>
                <div className='flex items-center bg-white p-2 rounded-xl opacity-75 cursor-not-allowed'>
                    <Podcast className='h-4 w-4 mr-2'/> Trợ năng
                </div>  
            </div>
            {/* <div className='m-5 p-2 rounded-xl drop-shadow-xl bg-[#4871f7]' onClick={OpenSheet}>
                <p className='text-center'>Show me the magic</p>
            </div> */}
            <SignedOut>
                <Marquee className='ml-5 mr-5 p-2'> IMASIS MIND đang có chương trình giảm giá hấp dẫn! Đừng bỏ lỡ cơ hội nhận ưu đãi ngay hôm nay! 🎉 </Marquee>
                {/* <motion.div
                className="flex ml-5 text-black items-center text-lg font-medium mt-2 opacity-50 cursor-pointer"
                initial={{ x: 0 }}
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                // onClick={() => setHidden(true)}
                >
                Trượt để xem  <ChevronsRight />
                </motion.div> */}

            </SignedOut> 
            {/* <SignedIn>
            <div>
                {!hidden && (
                    <motion.div
                    className="flex ml-5 text-black items-center text-lg font-medium mt-2 opacity-50 cursor-pointer"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    onClick={() => setHidden(true)}
                    >
                    Trượt để xem  <ChevronsRight /> <p className='ml-1 bg-slate-500 rounded-xl pl-1 pr-1'>click để ẩn ?</p>
                    </motion.div>
                )}
                </div>
            </SignedIn> */}

            
            <Carousel
            // draggable={false}
            // data-disable-drag="false"
            
            opts={{
                align: "start",
                loop: true,
                dragFree: false,

            }}
              
              className="w-full max-w-sm mx-auto"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchEnd={handleDragEnd}  

            >
                
                <CarouselContent 
                >
                {/* {cards.map((card, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4 bg-slate-200">
                        <Card className="cursor-grab active:cursor-grabbing">
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                            <p className="text-sm text-muted-foreground">{card.content}</p>
                            </div>
                        </CardContent>
                        </Card>
                    </CarouselItem>
                ))} */}
                    <CarouselItem>
                        <div className='relative'>

                            <div className="flex flex-col items-center justify-center mt-2 bg-slate-300">
                            {(() => {
                                if (Development) {
                                    return (
                                    <Webcam
                                        className="rounded-[12px] max-w-full md:w-[500px] w-[90%] h-auto drop-shadow-xl"
                                        mirrored={mirroredCam}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                        ref={webcamRef}
                                    />
                                    );
                                } else {
                                    return (
                                    // <iframe 
                                    //     src="https://lottie.host/embed/f7ab9b56-215a-481d-8e60-ab8a948b0ade/MjFaD0e0FK.lottie"
                                    //     className="rounded-[12px] max-w-full md:w-[500px] w-[90%] h-auto drop-shadow-xl "
                                    // ></iframe>
                                    // <img
                                    //     className="rounded-[12px] max-w-full md:w-[500px] w-[90%] h-auto drop-shadow-xl"
                                    //     src="https://images.pexels.com/photos/29947078/pexels-photo-29947078/free-photo-of-d-c-hoang-hon.jpeg"
                                    //     alt="Example"
                                    // />
                                    // <video
                                    //     className="rounded-[12px] h-[58vh] w-[90%] max-w-[600px] object-cover"
                                    //     src="https://res.cloudinary.com/dkgluft3l/video/upload/v1739529576/7639979-hd_1080_1920_30fps_pzrbh0.mp4"
                                    //     autoPlay
                                    //     loop
                                    //     muted
                                    //     playsInline
                                        
                                    // />
                                    <video
                                        className="rounded-[12px] h-[58vh] w-[90%] max-w-[600px] object-cover"
                                        
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    
                                    >
                                        <source src="/turnoffcam.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    );
                                }
                            })()}
                                {/* <img
                                className="rounded-[12px] max-w-full md:w-[500px] w-[90%] h-auto"
                                src="https://images.pexels.com/photos/29947078/pexels-photo-29947078/free-photo-of-d-c-hoang-hon.jpeg"
                                alt="Example"
                                />
                                <Webcam
                                    className='rounded-[12px] max-w-full md:w-[500px] w-[90%] h-auto'
                                    mirrored={mirroredCam}
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                >
                                </Webcam> */}
                            </div>
                            {/* onClick={() => { setVisible(true); } } */}
                            {/* onClick={() => { setModecam('environment'); setMirroredcam(true)}} */}
                            <div className='absolute top-0 ml-7 mt-3 text-black bg-white p-1 rounded-xl drop-shadow-xl' onClick={toggleCameraMode} >
                                <SwitchCamera className='opacity-100'/>
                            </div>
                            {/* <div className='absolute top-0'>
                                <p className='text-center'>only 4 pics with vistor plan</p>
                            </div> */}
                            <div className='absolute top-0 ml-7 mt-[15%] flex flex-col flex-end space-y-2 bg-white p-1 drop-shadow-xl rounded-xl'>
                                
                                {Array(4).fill(null).map((_, index) => (
                                    <img

                                        key={index}
                                        className="w-8 h-10 rounded-xl bg-slate-200"
                                        src={photos[index] || "https://digitalreach.asia/wp-content/uploads/2021/11/placeholder-image-300x225.png"}
                                        alt="Captured"
                                    />
                                ))}

                            </div>

                            {/* <div className='absolute top-0 left-0 bg-white ml-5 text-black rounded-full p-1'> 
                                
                                for top left absolute
                            </div> */}
                            <div className='absolute bottom-0 left-0 right-0 flex items-center justify-center md:m-0 m-5 cursor-pointer text-black'>

                                <div className='' 
                                // onClick={() => speakText("We’re excited to have you here at IMASIS MIND, your go-to platform for intelligent and seamless AI-powered solutions. Our goal is to provide you with a smart and interactive experience, whether you're looking for assistance, insights, or innovative tools to simplify your tasks.")
                                // }
                                > 
                                    {/* <p className='text-center'>Record</p> */}
                                {hasCamera === null ? (
                                    <p></p>
                                    ) : hasCamera ? (
                                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-white text-black rounded-full drop-shadow-xl" onClick={capturePhoto}>
                                            <p className='text-center'><Aperture/></p>
                                            {/* <p> <Send/> </p> */}
                                        </div>
                                    ) : (
                                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-rose-500 text-black rounded-full drop-shadow-xl">
                                            <p className='text-center'><Aperture/></p>
                                            
                                        </div>
                                )}

                                </div>
                                
                            </div>
                        </div>
                        
                    </CarouselItem>
                    {/* chat tab */}
                    <CarouselItem> 
                        <div className='bg-slate-200 ml-5 mr-5 rounded-xl p-2 text-black h-[58vh] mt-2 cursor-pointer'> 

                            <div className="flex flex-col space-y-2 mb-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Select1>
                                            <SelectTrigger className="bg-white text-black">
                                                <SelectValue placeholder="🇻🇳 Vietnam" />
                                            </SelectTrigger>
                                            <SelectContent className='bg-white text-black'>
                                                {list_languages_sp.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select1>
                                    </div>
                                    <div className='bg-white p-1 rounded-full'>
                                        < ArrowLeftRight />
                                    </div>
                                    <div>
                                        <Select1>
                                            <SelectTrigger className="bg-white text-black">
                                                <SelectValue placeholder="🇬🇧 English" />
                                            </SelectTrigger>
                                            <SelectContent className='bg-white text-black'>
                                                {list_languages_sp.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select1>
                                        
                                    </div>
                                </div>
                                {/* <div className='flex'>
                                    {Array(4).fill(null).map((_, index) => (
                                        <img

                                            key={index}
                                            className="w-10 h-10 rounded-xl bg-slate-200"
                                            src={photos[index] || "https://digitalreach.asia/wp-content/uploads/2021/11/placeholder-image-300x225.png"}
                                            alt="Captured"
                                        />
                                    ))}
                                </div> */}
                                {/* <Textarea placeholder="Type your message here." className="max-h-[50px] text-base resize-none"/> */}
                            </div>

                            <SignedOut>
                                <p className='p-2 rounded-xl bg-[#4871f7] text-white mb-2'>Hãy đăng nhập, đăng kí để truy vấn lịch sử LLM, AI Agent bạn nhé</p>
                            </SignedOut>

                            <SignedIn>
                                <div className='scrollbar-hide md:scrollbar-default overflow-y-auto h-[90%] rounded-xl'>
                                    {/* < Chat /> */}
                                </div>
                            </SignedIn>
                        </div>
                        
                    </CarouselItem> 

                    {flashcard && 
                        <CarouselItem>
                            <div className='bg-slate-200 ml-5 mr-5 rounded-xl p-2 overflow-y-auto text-black h-[58vh] mt-2 scrollbar-hide md:scrollbar-default'>
                                < FLashCard />

                            </div>   
                        </CarouselItem>
                    }
                    
                    {quizz &&
                        <CarouselItem>
                            < Quizz />                            
                        </CarouselItem>  
                    }
 

                    <CarouselItem>

                        <div className='bg-slate-200 ml-5 mr-5 rounded-xl p-2 overflow-y-auto text-black h-[58vh] mt-2 scrollbar-hide md:scrollbar-default'>
                        {/* <div>
                            <h2 className="text-xl font-semibold mb-4">Direct Video Source</h2>
                            <VideoPlayer
                                videoSrc="https://res.cloudinary.com/dkgluft3l/video/upload/v1741572466/13182344_3840_2160_25fps_jipxnn.mp4"
                                videoTitle="Cinematic Nature Footage"
                                videoDescription="This breathtaking 4K footage captures the serene beauty of nature in stunning detail. The video showcases lush landscapes, flowing water, and vibrant colors that highlight the natural world's magnificence."
                            />
                        </div> */}

                        <div>
                            <h2 className="text-xl font-semibold mb-4">YouTube Video Source</h2>
                            <VideoPlayer
                                videoSrc="https://www.youtube.com/watch?v=Y1QXFXGfrTI"
                                // videoTitle="Rick Astley - Never Gonna Give You Up"
                                // videoDescription="The official music video for Rick Astley's iconic 1987 hit single 'Never Gonna Give You Up'. The song became a worldwide number-one hit, initially in the UK where it spent five weeks at the top of the charts."
                            />
                        </div>
                        </div>    
                    </CarouselItem>                         
                </CarouselContent>
            </Carousel>
            
            <div>
                { photos.length < 0 ? (
                    <div className='ml-5 mr-5 mt-2 mb-1 bg-slate-500 p-1 rounded-xl cursor-pointer'
                    // onClick={() => {
                        
                    //     UploadImages(photos).then((result) => {
                    //         console.log(result)
                    //     })

                    // }}                    
                    > 
                        <p className='text-center'>Thực hiện</p>                       
                    </div>
                ) : (
                    <div className='ml-5 mr-5 mt-2 mb-1 bg-slate-500 p-1 rounded-xl cursor-pointer'
                    onClick={() => {
                        const lisst = '{https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg,https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg}'
                        console.log('photos.length < 0')
                        TranslatorNew(user?.id,lisst,'<p>Test insert row supabase</p>').then((data) => {
                            console.log(data)
                        })
                        UploadImages(photos).then((result) => {
                            console.log(result)
                        })
                        

                    }}                    
                    > 
                        <p className='text-center'>Thực hiện</p>                     
                    </div>
                )}
            </div>
            <div className='flex ml-5 mr-5 mt-2 bg-slate-200 text-black rounded-xl scrollbar-hide md:scrollbar-default h-[50%] overflow-y-auto'>
                < UserRecent />
            </div>
                                  

            {/* <div className='flex ml-5 mr-5 mt-2'>

                <div className='flex flex-col justify-center text-black overflow-hidden bg-slate-200 scrollbar-hide md:scrollbar-default overflow-hidden overflow-x-auto p-2 rounded-xl w-full'>
                    <div className='' >      
                        

                    </div>
                    <p className='mt-1 '> 
                        <SignedOut>
                            <div className='flex items-center'>
                                <div className='flex items-center justify-center w-8 h-8 rounded-md overflow-hidden bg-rose-500 opacity-75 mr-2'>
                                    <iframe src="https://lottie.host/embed/a7cc0414-abdf-4a65-b5ca-41e2d6671e18/vshdKBlMbj.lottie" className='w-[100%] h-[100%]'></iframe>
                                </div> 
                                
                                IMASIS MIND TỪ CHỐI KẾT NỐI
                            </div> 
                        </SignedOut>    
                        <SignedIn>
                            <div className='flex items-center'>
                                <div className='flex items-center justify-center w-8 h-8 rounded-md overflow-hidden bg-green-500 opacity-75 mr-2'>
                                    <iframe src="https://lottie.host/embed/a7cc0414-abdf-4a65-b5ca-41e2d6671e18/vshdKBlMbj.lottie" className='w-[100%] h-[100%]'></iframe>
                                </div> 
                                
                                {hasCamera === null ? (
                                    <p></p>
                                    ) : hasCamera ? (
                                        <div>IMASIS MIND ĐÃ SẴN SÀNG</div>
                                    ) : (
                                        <div>IMASIS MIND VẪN TỪ CHỐI KẾT NỐI</div>
                                )}
                            </div> 
                        </SignedIn> 
                    </p>

                    
                        
                </div> 
            </div>   */}
            
            {/* Nếu chưa đăng nhập, mở dialog login */}
            <SignedOut>
                <Dialog open={openClerk} onOpenChange={setOpenClerk}>
                    <DialogContent className="block sm:hidden bg-slate-300 text-black max-w-full md:w-[500px] w-[90%] h-auto rounded-xl flex flex-col items-center">
                    
                    <DialogHeader>
                        <DialogTitle className="text-center">
                        {isSignUp ? "Đăng ký tài khoản" : "Chào mừng bạn quay trở lại"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="w-full flex justify-center">
                        <div className="scale-90 mx-auto">
                        {isSignUp ? (
                            <SignUp afterSignUpUrl="/mind" redirectUrl="/mind" appearance={appearance} />
                        ) : (
                            <SignIn afterSignInUrl="/mind" redirectUrl="/mind" appearance={appearance} />
                        )}
                        </div>
                    </div>

                    {/* Custom Toggle Button */}
                    <p className="mt-4 text-sm text-black">
                        {isSignUp ? "Đã có tài khoản?" : "Chưa có tài khoản?"}
                        <button 
                        className="text-blue-500 ml-2 underline"
                        onClick={() => setIsSignUp(!isSignUp)}
                        >
                        {isSignUp ? "Đăng nhập" : "Đăng ký"}
                        </button>
                    </p>

                    </DialogContent>
                </Dialog>
            </SignedOut>

            {/* Nếu đã đăng nhập, hiển thị nội dung */}


            {/* <BottomSheet /> */}
            
            {/* <div className='m-5 bg-[#4871f7]'>
                USER section
            </div> */}

            
            <div className='rounded-md m-5 text-[#263381] items-center justify-content-center mt-[50px]'>
                

            </div>
        </div>
    </main>
    
  )
}

export default Mind