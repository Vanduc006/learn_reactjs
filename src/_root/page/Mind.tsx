import { Button } from '@/components/ui/button';
import 
// React,
 { useState } 
 from 'react'
// import Webcam from "react-webcam";
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
    // SheetTitle,
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
  
import { Aperture, Mic, Languages, ScanSearch, Podcast, Settings} from 'lucide-react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
// import BottomSheet from '@/components/all/BottomSheet';
// import ChatInterface from '@/components/all/SampleChat';

// const videoConstraints = {
//     width: window.innerWidth,
//     height: 400,
//     facingMode: "user",
//     mirrored : true,
// };
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
    const [Open, setOpen] = useState<boolean>(false);
    const OpenSheet = () => {
        setOpen(true)
    }
    const CloseSheet = () => {
        setOpen(false)
    }
  return (
    <div className='min-h-screen w-full  h-screen overflow-x-hidden overflow-y-auto bg-[#f0e6dc] text-[#263381]'>
        <div className='flex justify-content-center items-center text black ml-5 mr-5 mt-2'>
            <div className='flex justify-content-center items-center bg-white rounded-xl p-1'>
                
                <Dialog>    
                        <DialogTrigger><Settings className='flex '/></DialogTrigger>
                        <DialogContent className='bg-white text-black justify-content-center items-center max-w-full md:w-[500px] w-[90%] h-auto rounded-xl'>
                            
                            <DialogTitle className='mb-5 mt-5'>Choose support languages fit your context</DialogTitle>
                            <Select
                                className=''
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={[list_languages_sp[0], list_languages_sp[2]]}
                                isMulti
                                options={list_languages_sp}
                            />
                            <DialogTitle className='mb-5 mt-5'>Your plan</DialogTitle>
                            
                            <DialogClose asChild>
                                <Button type="button" className='border-solid border-2 border-black'>
                                    Ok, Let's try
                                </Button>
                            </DialogClose>
                        </DialogContent>
                </Dialog>
            </div>
            
        </div>
        <div className='relative'>
            <div className="flex flex-col items-center justify-center bg-[#f7e9dc] mt-2">
                <img
                className="rounded-[12px] max-w-full md:w-[500px] w-[90%] h-auto"
                src="https://images.pexels.com/photos/29947078/pexels-photo-29947078/free-photo-of-d-c-hoang-hon.jpeg"
                alt="Example"
                />
            </div>
            {/* <div className='absolute top-0 left-0 bg-white ml-5 text-black rounded-full p-1'> 
                
                for top left absolute
            </div> */}
            <div className='absolute bottom-0 left-0 right-0 flex items-center justify-center md:m-0 m-5 cursor-pointer text-black'>

                <div className='items-center justify-center ml-5 ' onClick={OpenSheet}>
                    {/* <p className='text-center'>Record</p> */}
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-white shadow-lg text-black rounded-full shadow-md">
                        <p className='text-center'><Aperture/></p>
                    </div>
                </div>
                <div className='flex overflow-x-auto whitespace-nowrap space-x-4 m-5 w-full max-w-lg scrollbar-hide md:scrollbar-default overflow-hidden'>
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
            </div>
        </div>
        
        {/* <BottomSheet /> */}
        <Sheet open={Open} onOpenChange={CloseSheet}>
            {/* <SheetTrigger>Open</SheetTrigger> */}
            <SheetContent side={'bottom'} className="h-[95%] bg-white text-black rounded-xl  justify-content-center "> 
                {/* <SheetTitle>IMASIS MODE</SheetTitle> */}
                <p className='font-bold text-lg mb-1'>IMASIS MODE : POWERFUL FOR LIFE</p>
                <Select1>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Translator"/>
                    </SelectTrigger>
                    <SelectContent className='text-black items-center justify-content-center'>
                        {/* <SelectItem value="conservation">Conservation</SelectItem> */}
                        <SelectItem value="translator">Translator</SelectItem>
                        {/* <SelectItem value="object">Object</SelectItem> */}
                        {/* <SelectItem value="talkback">Talkback</SelectItem> */}
                    </SelectContent>
                </Select1>
                <div className='bg-[#f0e6dc] text-[#263381] h-[88%] mt-5 rounded-xl p-4 overflow-y-auto'>
                <p>AI, or Artificial Intelligence, doesn’t work in a single, unified way.  Instead, it encompasses a broad range of techniques and approaches, all aiming to create systems that can perform tasks that typically require human intelligence.  Here’s a breakdown of some core concepts:</p>
<p><strong>1. Data is King:</strong>  At the heart of most AI systems lies vast amounts of data.  This data is used to train the AI, allowing it to learn patterns, relationships, and insights.  The more relevant data, the better the AI’s performance.</p>
<p><strong>2. Algorithms are the Tools:</strong>  Algorithms are sets of rules and instructions that tell the AI how to process and learn from the data. Different types of AI use different algorithms:</p>
<ul>
<li>
<p><strong>Machine Learning (ML):</strong>  This is a subset of AI where systems learn from data without explicit programming.  Instead of being explicitly told what to do, they identify patterns and make predictions based on the data they’re fed.  There are several types of ML:</p>
<ul>
<li><strong>Supervised Learning:</strong> The algorithm is trained on labeled data (data where the correct answers are already known).  For example, showing an image classifier thousands of pictures of cats and dogs, each labeled accordingly, so it can learn to distinguish between them.</li>
<li><strong>Unsupervised Learning:</strong> The algorithm is trained on unlabeled data, and it must find patterns and structure on its own.  Clustering similar data points together is an example.</li>
<li><strong>Reinforcement Learning:</strong> The algorithm learns through trial and error, receiving rewards for correct actions and penalties for incorrect ones.  This is often used in robotics and game playing.</li>
</ul>
</li>
<li>
<p><strong>Deep Learning (DL):</strong> This is a more advanced form of machine learning that uses artificial neural networks with multiple layers (hence “deep”).  These networks are inspired by the structure and function of the human brain and can process complex data like images, speech, and text with remarkable accuracy.  Deep learning powers many advancements in areas like image recognition, natural language processing, and self-driving cars.</p>
</li>
<li>
<p><strong>Expert Systems:</strong> These AI systems mimic the decision-making ability of a human expert in a specific domain. They use a knowledge base of rules and facts to answer questions and solve problems.  They are less common now due to the rise of machine learning.</p>
</li>
</ul>
<p><strong>3. Models are the Output:</strong>  The learning process produces a “model,” which is a representation of the patterns and relationships learned from the data.  This model is then used to make predictions or decisions on new, unseen data.</p>
<p><strong>4. Evaluation and Iteration:</strong>  The performance of the AI system is continuously evaluated, and the model is often refined and improved through further training and adjustments. This iterative process is crucial for building robust and accurate AI systems.</p>
<p><strong>In short:</strong> AI works by using algorithms to analyze large datasets, identifying patterns and relationships, and building models that can then be used to make predictions or take actions.  The specific approach used depends on the task and the available data.  It’s a complex and constantly evolving field, with new techniques and applications emerging regularly.</p>
                </div>
            </SheetContent>
        </Sheet>
        
        <div className='rounded-md m-5 text-[#263381] items-center justify-content-center mt-[50px]'>
            
            {/* <Webcam
                className=' rounded-[20px]'
                mirrored={true}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            >
            </Webcam> */}
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
    
  )
}

export default Mind