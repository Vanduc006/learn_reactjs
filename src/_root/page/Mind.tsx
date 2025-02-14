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
import {
    Sheet,
    SheetContent,
    // SheetDescription,
    // SheetHeader,
    SheetTitle,
    // SheetTrigger,
  } from "@/components/ui/sheet"
import {
    Dialog,
    DialogClose,
    DialogContent,
    // DialogDescription,
    // DialogHeader,
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
import { Aperture, Mic, Languages, ScanSearch, Podcast, Settings, Bot, 
    ThumbsUp, ThumbsDown, ScanText, User, SwitchCamera, ChevronsRight,
    Camera, CameraOff
 } from 'lucide-react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { motion } from "framer-motion";



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
    // const [photo, setPhoto] = useState(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const [Open, setOpen] = useState<boolean>(false);
    // const [Usercam, setUsercam] = useState<boolean>(false);
    // const [Environmentcam, setEnvironment] = useState<boolean>(false);
    const [modeCam, setModeCam] = useState<'user' | 'environment'>('user');
    const [mirroredCam, setMirroredCam] = useState(true);
    const [Development, setDevelopment] = useState(false);

    const webcamRef:any = useRef(null);
    const capturePhoto = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(JSON.stringify(imageSrc))
      setPhotos((prevPhotos) => [imageSrc, ...prevPhotos].slice(0, 4));
    };

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
    const OpenSheet = () => {
        setOpen(true)
    }
    const CloseSheet = () => {
        setOpen(false)
    }
    const videoConstraints = {
        facingMode: modeCam,
    };

    const speakText = (text:string) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US"; // Change to "vi-VN" for Vietnamese
        speech.rate = 1; // Adjust speed
        window.speechSynthesis.speak(speech);
    };


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

    // const [Api, setApi] = useState<any>()
    // const [Current, setCurrent] = useState(0)
    // const scrollPrev = React.useCallback(() => {
    //     Api?.scrollPrev()
    // }, [Api])
    // const scrollNext = React.useCallback(() => {
    //     Api?.scrollNext()
    // }, [Api])

    const handleDragStart = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (event.type === "touchstart") {
          document.body.style.overflow = "hidden"
        }
    }
    
    const handleDragEnd = () => {
        document.body.style.overflow = ""
    }
  return (
    <main className='min-h-screen w-full  h-screen overflow-x-hidden overflow-y-auto'>
        <div className="bg-slate-300 text-black  hidden sm:block text-center p-5 justify-content-center items-center w-full h-screen">
            Sorry, during development imasis mind only support Mobile phones<br />
            Try TraCuuPhatNguoi page if you like, at route /phatnguoi
        </div>

        <div className='min-h-screen w-full  h-screen overflow-x-hidden overflow-y-auto bg-slate-300 text-white block sm:hidden'>

            <div className='flex justify-content-center items-center text black ml-5 mr-5 mt-2 block  text-white'>
                <div className='flex justify-content-center items-center rounded-xl p-1 bg-[#4871f7] drop-shadow-xl'>
                    
                    <Dialog>    
                            <DialogTrigger><Settings className='flex '/></DialogTrigger>
                            <DialogContent className='bg-white text-black max-w-full md:w-[500px] w-[90%] h-auto rounded-xl absolute top-0 mt-[50%]'>
                                
                                <DialogTitle className='mt-5'>Choose support languages fit your context</DialogTitle>
                                <Select
                                    className='border-none'
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={[list_languages_sp[0], list_languages_sp[2]]}
                                    isMulti
                                    options={list_languages_sp}
                                />
                                <DialogTitle className='mb-5 mt-5'>Your plan</DialogTitle>
                                
                                <DialogClose asChild>
                                    <Button type="button" className='bg-[#4871f7] drop-shadow-xl text-white'>
                                        Ok, Let's try
                                    </Button>
                                </DialogClose>
                            </DialogContent>
                    </Dialog>
                    {hasCamera === null ? (
                            <p></p>
                        ) : hasCamera ? (
                            <div className='ml-5 bg-[#5A8DF7] rounded-xl p-1 opacity-75' onClick={toogleDevelopment}>
                                {(() => {
                                    if (Development) {
                                        return (
                                            <p className='flex items-center'><CameraOff className='h-4 w-4 mr-2'/>Turn Off Camera</p>
                                        );
                                    } else {
                                        return (
                                            <p className='flex items-center'><Camera className='h-4 w-4 mr-2'/> Turn On Camera</p>
                                        );
                                    }
                                })()}
                                
                                </div>
                        ) : (
                            <div className='ml-5 bg-[#5A8DF7] rounded-xl p-1 opacity-50'>
                                <p className=''>IMASIS can't detect camera</p>
                            </div>
                    )}
                    
                </div>
                
            </div>


            <div className="">
                {hasCamera === null ? (
                    <p></p>
                        ) : hasCamera ? (
                            <div className='flex m-5 '>
                                <div className='flex items-center justify-center flex-shrink-0 w-16 h-16 text-black rounded-full overflow-hidden bg-slate-200 opacity-75'>
                                    <iframe src="https://lottie.host/embed/a7cc0414-abdf-4a65-b5ca-41e2d6671e18/vshdKBlMbj.lottie" className='w-[100%] h-[100%]'></iframe>
                                </div>  
                                <div className='flex flex-col justify-center text-black ml-2 overflow-hidden bg-slate-200 scrollbar-hide md:scrollbar-default overflow-hidden overflow-x-auto p-2 rounded-xl'>
                                    <p className='flex'> 
                                        
                                        IMASIS CONNECTED TO SERVER
                                    </p>
                                    <div 
                                        className='mt-2'
                                        onClick={OpenSheet}
                                    >      
                                        <div className='flex rounded-xl bg-[#4871f7] p-1 items-center '>
                                            <div className='flex w-5 h-5 text-black opacity-75 mr-2'>
                                                <iframe src="https://lottie.host/embed/af45882e-8502-4adb-9d6c-739d823b65db/O9CEimqPF0.lottie" className='w-[100%] h-[100%]'></iframe>
                                            </div>  
                                            <div>
                                                Work status
                                            </div>
                                            {/* <div className='flex flex-col justify-center text-black ml-2 overflow-hidden bg-slate-200 scrollbar-hide md:scrollbar-default overflow-hidden overflow-x-auto p-2 rounded-xl'>
                                                <p className='flex'> 
                                                    <Satellite className='bg-green-500 mr-2 rounded-full p-1'/>
                                                    IMASIS CONNECTED TO SERVER
                                                </p>
                                                <p className='flex'>
                                                    Waiting for tasks
                                                </p>
                                            </div>  */}
                                        </div>

                                    </div> 
                                </div> 
                            </div>
                        ) : (
                            <div className='flex m-5 '>
                                <div className='flex items-center justify-center flex-shrink-0 w-16 h-16 text-black rounded-full overflow-hidden bg-rose-500 opacity-75'>
                                    <iframe src="https://lottie.host/embed/a7cc0414-abdf-4a65-b5ca-41e2d6671e18/vshdKBlMbj.lottie" className='w-[100%] h-[100%]'></iframe>
                                </div>  
                                <div className='flex flex-col justify-center text-black ml-2 overflow-hidden bg-slate-200 scrollbar-hide md:scrollbar-default overflow-hidden overflow-x-auto p-2 rounded-xl'>
                                    <p className='flex'> 
                                        
                                        IMASIS NOT AVAIABLE
                                    </p>
                                    <div 
                                        className='mt-2'
                                        onClick={OpenSheet}
                                    >      
                                        <div className='flex rounded-xl bg-[#4871f7] p-1 items-center '>
                                            <div className='flex w-5 h-5 text-black opacity-75 mr-2'>
                                                <iframe src="https://lottie.host/embed/af45882e-8502-4adb-9d6c-739d823b65db/O9CEimqPF0.lottie" className='w-[100%] h-[100%]'></iframe>
                                            </div>  
                                            <div>
                                                Work status
                                            </div>
                                            {/* <div className='flex flex-col justify-center text-black ml-2 overflow-hidden bg-slate-200 scrollbar-hide md:scrollbar-default overflow-hidden overflow-x-auto p-2 rounded-xl'>
                                                <p className='flex'> 
                                                    <Satellite className='bg-green-500 mr-2 rounded-full p-1'/>
                                                    IMASIS CONNECTED TO SERVER
                                                </p>
                                                <p className='flex'>
                                                    Waiting for tasks
                                                </p>
                                            </div>  */}
                                        </div>

                                    </div> 
                                </div> 
                            </div>
                )}
                {/* <div className='flex items-center justify-center flex-shrink-0 w-16 h-16 text-black rounded-full overflow-hidden bg-slate-200 opacity-75'>
                    <iframe src="https://lottie.host/embed/a7cc0414-abdf-4a65-b5ca-41e2d6671e18/vshdKBlMbj.lottie" className='w-[100%] h-[100%]'></iframe>
                </div>  
                <div className='flex flex-col justify-center text-black ml-2 overflow-hidden bg-slate-200 scrollbar-hide md:scrollbar-default overflow-hidden overflow-x-auto p-2 rounded-xl'>
                    <p className='flex'> 
                        <Satellite className='bg-green-500 mr-2 rounded-full p-1'/>
                        IMASIS CONNECTED TO SERVER
                    </p>
                    <p className='flex'>
                        
                        Waiting for tasks
                    </p>
                </div>   */}
                
            </div>
              

            {/* <div className='m-5 p-2 rounded-xl drop-shadow-xl bg-[#4871f7]' onClick={OpenSheet}>
                <p className='text-center'>Show me the magic</p>
            </div> */}
            <motion.div
                className="flex ml-5 text-black items-center text-lg font-medium"
                initial={{ x: 0 }}
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
                Drag to see <ChevronsRight />

            </motion.div>
            <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
              
              className="w-full max-w-sm mx-auto"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchEnd={handleDragEnd}  
            >
                <CarouselContent>
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
                                    <video
                                        className="rounded-[12px] h-[58vh] w-[90%] max-w-[600px] object-cover"
                                        src="https://res.cloudinary.com/dkgluft3l/video/upload/v1739529576/7639979-hd_1080_1920_30fps_pzrbh0.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />

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

                                <div className='' onClick={() => speakText("We’re excited to have you here at IMASIS MIND, your go-to platform for intelligent and seamless AI-powered solutions. Our goal is to provide you with a smart and interactive experience, whether you're looking for assistance, insights, or innovative tools to simplify your tasks.")}> 
                                    {/* <p className='text-center'>Record</p> */}
                                {hasCamera === null ? (
                                    <p></p>
                                    ) : hasCamera ? (
                                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-white text-black rounded-full drop-shadow-xl" onClick={capturePhoto}>
                                            <p className='text-center'><Aperture/></p>
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
                    <CarouselItem>
                        <div className='bg-slate-200 ml-5 mr-5 rounded-xl p-2 overflow-y-auto text-black h-[58vh] mt-2 scrollbar-hide md:scrollbar-default'>

                            <div id='user' className='ml-auto mb-5 bg-[#4871f7] p-2 rounded-xl drop-shadow-2xl max-w-[75%]'>
                                <div className='flex items-center bg-white p-1 rounded-xl mb-1 overflow-hidden'>
                                    <User className='h-4 w-4 mr-1 ml-1'/> NguyenVanDuc
                                </div> 
                                <div id='user-media' className='grid grid-cols-2 gap-2 mt-3'>
                                    {[
                                        "https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg",
                                        "https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg",
                                        "https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg",
                                        "https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg"
                                    ].map((src, index) => (
                                        <img key={index} className='w-[100px] h-[100px] rounded-lg object-cover' src={src} alt='' />
                                    ))}
                                </div>
                            </div>

                            <div id='mode' className='w-[90%] mb-5 bg-slate-300 p-2 rounded-xl drop-shadow-xl'>
                                <div className='flex items-center bg-white p-1 rounded-xl mb-1'>
                                    <Bot className='h-4 w-4 mr-1 ml-1'/> Translator
                                </div>    
                                <p>AI, or Artificial Intelligence, doesn’t work in a single, unified way.  Instead, it encompasses a broad range of techniques and approaches, all aiming to create systems that can perform tasks that typically require human intelligence.  Here’s a breakdown of some core concepts:</p>
                                <p><strong>1. Data is King:</strong>  At the heart of most AI systems lies vast amounts of data.  This data is used to train the AI, allowing it to learn patterns, relationships, and insights.  The more relevant data, the better the AI’s performance.</p>
                                <p><strong>2. Algorithms are the Tools:</strong>  Algorithms are sets of rules and instructions that tell the AI how to process and learn from the data. Different types of AI use different algorithms:</p>
                                <div className='flex mt-5'>
                                    <ThumbsUp className='h-4 w-4 mr-1 ml-1'/> <ThumbsDown className='h-4 w-4 mr-1 ml-1'/> <ScanText className='h-4 w-4 mr-1 ml-1'/>
                                </div>
                            </div>

                            <div id='user' className='ml-auto mb-5 bg-[#4871f7] p-2 rounded-xl drop-shadow-2xl max-w-[75%]'>
                                <div className='flex items-center bg-white p-1 rounded-xl mb-1 overflow-hidden'>
                                    <User className='h-4 w-4 mr-1 ml-1'/> NguyenVanDuc
                                </div> 
                                <div id='user-media' className='grid grid-cols-2 gap-2 mt-3'>
                                    {[
                                        "https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg",
                                        "https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg",
                                        "https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg",
                                        "https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg"
                                    ].map((src, index) => (
                                        <img key={index} className='w-[100px] h-[100px] rounded-lg object-cover' src={src} alt='' />
                                    ))}
                                </div>
                            </div>

                            <div id='mode' className='w-[90%] mb-5 bg-slate-300 p-2 rounded-xl drop-shadow-xl'>
                                <div className='flex items-center bg-white p-1 rounded-xl mb-1'>
                                    <Bot className='h-4 w-4 mr-1 ml-1'/> Translator
                                </div>    
                                <p>AI, or Artificial Intelligence, doesn’t work in a single, unified way.  Instead, it encompasses a broad range of techniques and approaches, all aiming to create systems that can perform tasks that typically require human intelligence.  Here’s a breakdown of some core concepts:</p>
                                <p><strong>1. Data is King:</strong>  At the heart of most AI systems lies vast amounts of data.  This data is used to train the AI, allowing it to learn patterns, relationships, and insights.  The more relevant data, the better the AI’s performance.</p>
                                <p><strong>2. Algorithms are the Tools:</strong>  Algorithms are sets of rules and instructions that tell the AI how to process and learn from the data. Different types of AI use different algorithms:</p>
                                <div className='flex mt-5'>
                                    <ThumbsUp className='h-4 w-4 mr-1 ml-1'/> <ThumbsDown className='h-4 w-4 mr-1 ml-1'/> <ScanText className='h-4 w-4 mr-1 ml-1'/>
                                </div>
                            </div>
                            

                        </div>
                    </CarouselItem> 


                </CarouselContent>
            </Carousel>
            <div className='flex overflow-x-auto whitespace-nowrap space-x-4 m-5  max-w-lg scrollbar-hide md:scrollbar-default overflow-hidden text-black rounded-xl'>
                <div className='flex items-center bg-white p-2 rounded-xl opacity-75 cursor-not-allowed'>
                    <Mic className='h-4 w-4 mr-2'/> Conservation
                </div>
                <div className='flex items-center bg-white p-2 rounded-xl'>
                    <Languages className='h-4 w-4 mr-2'/> Translator
                </div>
                <div className='flex items-center bg-white p-2 rounded-xl opacity-75 cursor-not-allowed'>
                    <ScanSearch className='h-4 w-4 mr-2'/> Object
                </div>
                <div className='flex items-center bg-white p-2 rounded-xl opacity-75 cursor-not-allowed'>
                    <Podcast className='h-4 w-4 mr-2'/> Talkback
                </div>  
            </div>


            {/* <BottomSheet /> */}
            <Sheet open={Open} onOpenChange={CloseSheet}>
                {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent side={'bottom'} className="h-[95%] bg-white text-black rounded-tl-xl rounded-tr-xl justify-content-center "> 
                    <SheetTitle className='font-bold text-lg mb-1'>IMASIS MIND : POWERFUL FOR LIFE</SheetTitle>
                    
                    <Select1>
                        <SelectTrigger className="bg-[#4871f7] text-white drop-shadow-xl">
                            <SelectValue placeholder="Translator"/>
                        </SelectTrigger>
                        <SelectContent className='text-white items-center justify-content-center bg-[#5A8DF7]'>
                            {/* <SelectItem value="conservation">Conservation</SelectItem> */}
                            <SelectItem value="translator">Translator</SelectItem>
                            {/* <SelectItem value="object">Object</SelectItem> */}
                            {/* <SelectItem value="talkback">Talkback</SelectItem> */}
                        </SelectContent>
                    </Select1>
                    <div className=' h-[88%] mt-5 rounded-xl overflow-y-auto'>

                        <div id='user' className='w-[90%] ml-auto mb-5 bg-[#4871f7] p-2 rounded-xl drop-shadow-2xl'>
                            <div className='flex items-center bg-white p-1 rounded-xl mb-1 overflow-hidden'>
                                <User className='h-4 w-4 mr-1 ml-1'/> NguyenVanDuc
                            </div> 
                            <div id='user-media' className='flex gap-2 overflow-x-auto whitespace-nowrap mt-2'>
                                <img className='max-w-xs max-h-40 rounded-lg' src="https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg" alt="" />
                                <img className='max-w-xs max-h-40 rounded-lg' src="https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg" alt="" />
                                <img className='max-w-xs max-h-40 rounded-lg' src="https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg" alt="" />
                                <img className='max-w-xs max-h-40 rounded-lg' src="https://images.pexels.com/photos/29680707/pexels-photo-29680707/free-photo-of-c-ng-vom-ki-n-truc-thanh-l-ch-v-i-cac-hoa-van-l-p-l-i.jpeg" alt="" />
                            </div>

                        </div>
                        <div id='mode' className='w-[90%] mb-5 bg-slate-300 p-2 rounded-xl drop-shadow-xl'>
                            <div className='flex items-center bg-white p-1 rounded-xl mb-1'>
                                <Bot className='h-4 w-4 mr-1 ml-1'/> Translator
                            </div>    
                            <p>AI, or Artificial Intelligence, doesn’t work in a single, unified way.  Instead, it encompasses a broad range of techniques and approaches, all aiming to create systems that can perform tasks that typically require human intelligence.  Here’s a breakdown of some core concepts:</p>
                            <p><strong>1. Data is King:</strong>  At the heart of most AI systems lies vast amounts of data.  This data is used to train the AI, allowing it to learn patterns, relationships, and insights.  The more relevant data, the better the AI’s performance.</p>
                            <p><strong>2. Algorithms are the Tools:</strong>  Algorithms are sets of rules and instructions that tell the AI how to process and learn from the data. Different types of AI use different algorithms:</p>
                            <div className='flex mt-5'>
                                <ThumbsUp className='h-4 w-4 mr-1 ml-1'/> <ThumbsDown className='h-4 w-4 mr-1 ml-1'/> <ScanText className='h-4 w-4 mr-1 ml-1'/>
                            </div>
                        </div>

                    </div>
                </SheetContent>
            </Sheet>
            {/* <div className='m-5 bg-[#4871f7]'>
                USER section
            </div> */}

            
            <div className='rounded-md m-5 text-[#263381] items-center justify-content-center mt-[50px]'>
                

            </div>
            {/* <div className='flex bg-black m-3 mt-3 p-2 rounded-[10px]'>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>Choose mode</DropdownMenuTrigger>
                        <DropdownMenuContent className='mt-2 bg-black ml-1'>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem >Translator</DropdownMenuItem>
                            <DropdownMenuItem >Finding Object</DropdownMenuItem>
                            <DropdownMenuItem >Graph the world</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>
            <div className='text-center m-2 rounded-['>
                <p className='bg-black'>
                    Capture
                </p>
            </div> */}
        </div>
    </main>
    
  )
}

export default Mind