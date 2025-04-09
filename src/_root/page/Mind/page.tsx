"use client"

import { useState } from "react"
import {
  ShowerHead,
  Droplet,
  SpaceIcon as Yoga,
  Dumbbell,
  Mail,
  Smartphone,
  Plus,
  Menu,
  Home,
  User,
  X,
  Camera,
  // FolderOpen,
  // Folder,
  Bot,
  Send,
  // Dna,
  ScrollText,
  FolderPlus,
  // CircleEllipsis,
} from "lucide-react"
import { Button } from "@/components/ui/button"
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"

import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
// import Link from "next/link"
// import { Link, } from "react-router-dom"
import { SignedIn, SignedOut, 
  // SignIn, 
  //   SignUp, 
    // SignOutButton, 
    UserButton, 
    // useUser
  } from "@clerk/clerk-react";
import Chat from "@/components/mind/Chat"
import FLashCard from "@/components/mind/FlashCard"
import Quizz from "@/components/mind/Quizz"
import { Textarea } from "@/components/ui/textarea"
import Space from "@/components/mind/space/Space"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import FolderSpace from "@/components/mind/space/FolderSpace"
import ResizablePanel from "@/components/mind/space/ResizablePanel"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTab, setCurrentTab ] = useState("home")
  const [currentSpace, setCurrentSpace] = useState<string | null>(null);
//   const isDesktop = useMediaQuery("(min-width: 1024px)")

  const tasks = [
    {
      id: 1,
      title: "Take cold showers only",
      day: 18,
      icon: ShowerHead,
    },
    {
      id: 2,
      title: "Use PanOxyl foaming wash",
      day: 17,
      icon: Droplet,
    },
    {
      id: 3,
      title: "Do 10x Child Pose stretch",
      day: 18,
      icon: Yoga,
    },
    {
      id: 4,
      title: "Do 100 Push Ups",
      day: 9,
      icon: Dumbbell,
    },
    {
      id: 5,
      title: "Test Cora email app",
      day: 19,
      icon: Mail,
    },
    {
      id: 6,
      title: "No social media & entertainment",
      day: 1,
      icon: Smartphone,
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 z-50 flex w-72 flex-col bg-white shadow-lg transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <h2 className="text-xl font-semibold cursor-pointer" onClick={() => {setCurrentTab("home")}}>MIND</h2>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 overflow-auto p-4 scrollbar-hide">
          <ul className="space-y-1">
            <li>
                
              <Button variant="secondary" className="w-full justify-start gap-2"
              onClick={() => {
                setCurrentTab("home")
              }}>
                  <Home className="h-5 w-5" />
                  Your Activities
              </Button>

            </li>
            {/* <li>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Button variant="ghost" className="w-full justify-start gap-2"
                    onClick={() => {
                      setCurrentTab("folder")
                    }}>
                      <FolderOpen className="h-5 w-5" />
                      Your folders
                    </Button>
                  </AccordionTrigger>
                  <AccordionContent className="ml-3 max-h-48 overflow-y-auto scrollbar-hide">
                    <FolderSpace/>
                  </AccordionContent>
                  
                </AccordionItem>
              </Accordion>
            </li> */}

            <li>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </Button>

            </li>
            
            <li>

              <Button variant="ghost" className="w-full justify-start gap-2"
>
                <Bot className="w-5 h-5"/>Your spaces
              </Button>

              <div className="ml-3 overflow-hidden overflow-y-auto"
                onClick={() => {
                  setCurrentTab("chat")
                }}
              >
                <Space setCurrentSpace={setCurrentSpace} />
              </div>

            </li>

            {/* <li>
              <Link to="/camera">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Camera className="h-5 w-5" />
                  Camera
                </Button>
              </Link>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </li> */}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            {/* <h1 className="text-xl font-semibold lg:hidden">Habit Tracker</h1> */}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">March 27, 2025</span>
            <SignedIn>                    
                <div className='flex items-center p-1'>
                    <div className='rounded-md'>
                        <UserButton afterSignOutUrl="/ver2" afterSwitchSessionUrl="/ver2" afterMultiSessionSingleSignOutUrl='/ver2' /> 
                    </div>                                        
                    {/* <p className='ml-2'>Xin chào {user?.firstName} {user?.lastName}</p> */}
                </div>                               
            </SignedIn>
            <SignedOut>
              <div className="flex items-center justify-content-center bg-gray-200 pl-3 pr-3 pt-1 pb-1 rounded-xl cursor-pointer">
                Sign In <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 ml-2 lucide lucide-ampersand-icon lucide-ampersand"><path d="M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"/><path d="M16 12h3"/></svg> Sign Up
              </div>
            </SignedOut>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">

          {
            (currentTab == "home" || currentTab == "folder") ? <></> : 
            
            <div className="flex">
              <div className="cursor-pointer mb-2 flex overflow-x-auto whitespace-nowrap space-x-2 lg:w-full scrollbar-hide md:scrollbar-default overflow-hidden rounded-xl mr-5">
                <div className={`${ currentTab == "report" ? "bg-gray-200" : "bg-white border-2 border-gray-200"} flex items-center transition-transform hover:scale-[1.02] pl-5 pr-5 pt-2 pb-2 font-bold rounded-xl`} >
                  <ScrollText className="w-4 h-4 mr-2"/> Report
                </div>  
                <div className={`${ currentTab == "chat" ? "bg-gray-200" : "bg-white border-2 border-gray-200"} flex items-center transition-transform hover:scale-[1.02] pl-5 pr-5 pt-2 pb-2 font-bold rounded-xl`}
                onClick={() => {
                  setCurrentTab("chat")
                }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 lucide lucide-message-circle-more-icon lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg> Chat 
                </div>
                <div className={`${ currentTab == "flashcard" ? "bg-gray-200" : "bg-white border-2 border-gray-200"} flex items-center transition-transform hover:scale-[1.02] pl-5 pr-5 pt-2 pb-2 font-bold rounded-xl`}
                onClick={() => {
                  setCurrentTab("flashcard")
                }}
                >
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 lucide lucide-sparkles-icon lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>Flashcard
                </div>
                <div className={`${ currentTab == "quizz" ? "bg-gray-200" : "bg-white border-2 border-gray-200"} flex items-center transition-transform hover:scale-[1.02] pl-5 pr-5 pt-2 pb-2 font-bold rounded-xl`}
                onClick={() => {
                  setCurrentTab("quizz")
                }}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 lucide lucide-rainbow-icon lucide-rainbow"><path d="M22 17a10 10 0 0 0-20 0"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M10 17a2 2 0 0 1 4 0"/></svg> Quizz
                </div>      
                <div className={`${ currentTab == "transcript" ? "bg-gray-200" : "bg-white border-2 border-gray-200"} flex items-center transition-transform hover:scale-[1.02] pl-5 pr-5 pt-2 pb-2 font-bold rounded-xl`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 lucide lucide-notepad-text-icon lucide-notepad-text"><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>Transcript
                </div>  
                
              </div>

              {/* <div className="cursor-pointer mb-5 flex rounded-full transition-transform hover:scale-[1.02] bg-white border-2 border-gray-200 items-center p-2">
                <div className="">
                  <Dna className=""/>
                </div>
                
              </div> */}
            </div>
          }

          {/* Task grid */}
          { (currentTab == "home" || currentTab == "folder")   ? <></> : 
            <>
              <Popover>
                <PopoverTrigger>
                  <div  className="mb-1 cursor-pointer text-sm font-semibold flex items-center justify-content-center "> <FolderPlus className="w-4 h-4 mr-2"/> 
                  Add to folder</div>
                </PopoverTrigger>
                <PopoverContent className="">
                  <div className="text-xs font-semibold">Add to exist folder</div>
                  <div className=" max-h-48 overflow-y-auto mt-2 cursor-pointer scrollbar-hide">
                    <FolderSpace/>
                  </div>
                  <div className="text-xs bg-gray-200 p-2 rounded-lg font-semibold mt-2 flex items-center justify-content-center cursor-pointer"><Plus className="w-4 h-4 mr-1"/>Create new</div>
                  
                </PopoverContent>
              </Popover>
            
            </>}
          
          { currentTab == 'folder' ? <>

              <div className="h-[100%] rounded-xl p-1 bg-white flex overflow-x-auto overflow-hidden scrollbar-hide space-x-2 p-2">
                <ResizablePanel initialWidth={60} minWidth={40} maxWidth={100}>
                  <div className="h-full bg-gray-300 rounded-xl p-2">Panel 1 Content</div>
                </ResizablePanel>  
                <ResizablePanel initialWidth={60} minWidth={40} maxWidth={100}>
                  <div className="h-full bg-gray-300 rounded-xl p-2">Panel 1 Content</div>
                </ResizablePanel> 
                <ResizablePanel initialWidth={60} minWidth={40} maxWidth={100}>
                  <div className="h-full bg-gray-300 rounded-xl p-2">Panel 1 Content</div>
                </ResizablePanel> 
                <div className="flex-shrink-0 w-[300px]" aria-hidden="true"></div>   

              </div>

            </> : <></>}


          { currentTab == "chat" ? 
          <>
            <div className="overflow-y-auto h-[75%] rounded-xl p-1 bg-white">
              <div className="items-center justify-content-center lg:w-[50%] lg:mx-auto"> 

                <Chat currentSpace={currentSpace}/>

              </div>
            </div>
            <div className="">
              <div className="lg:w-[50%] lg:mx-auto h-fit"> 
                
                <div className="flex mb-1 cursor-pointer">
                  <div className="text-white bg-black items-center justify-content-center pl-5 pr-5 pt-2 pb-2 rounded-xl transition-transform hover:scale-[1.02]">
                    recomended chat
                  </div>
                  <div className="bg-gray-200 ml-auto items-center justify-content-center pl-5 pr-5 pt-2 pb-2 rounded-xl transition-transform hover:scale-[1.02]">
                    <Send className="w-5 h-5"/>
                  </div>
                  
                </div>
                <div className="flex">
                  <Textarea placeholder="Your message..." className="resize-none border-none"/>
                  

                </div>
              </div>
              
            </div>
          </> 
          : 
          <></>
          }

          {
            currentTab == "flashcard" ? 
            <>
              <div className="scrollbar-hide md:scrollbar-default overflow-y-auto h-[80%] rounded-xl p-1">
                <div className="w-[100%] items-center justify-content-center"> 
                  
                    <FLashCard/>

                </div>
              </div>
            </> : <></>
          }

          {
            currentTab == "quizz" ? 
            <>
              <div className="scrollbar-hide md:scrollbar-default overflow-y-auto h-[100%] rounded-xl p-1">
                <div className="w-[100%] items-center justify-content-center"> 
                  <Quizz/>

                </div>
              </div>
            </> : <></>
          }

          {
            currentTab == "home" ? 
            <>
            
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Where your knowleagde begin</h2>
                
                <div className="flex gap-2">

                    <Button variant="outline" size="icon" className="rounded-full">
                      <Camera className="h-5 w-5" />
                    </Button>
                  

                  <Button className="rounded-full">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Habit
                  </Button>
                </div>
                
              </div>
              <h1 className="text-sm block mb-5">You can upload, capture, record, and more</h1>
              <div className="cursor-pointer grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-black text-white rounded-full text-sm">
                  <svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" enable-background="new 0 0 56 64" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#8C181A" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"></path> <path fill="#6B0D12" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"></path> <path opacity="0.5" fill="#FFFFFF" enable-background="new " d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"></path> </g> <path fill="#FFFFFF" d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"></path> </g></svg>
                  PDFs
                </div>
                <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-black text-white rounded-full text-sm">
                <svg className="w-5 h-5 mr-2"viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.112.011c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.272 5.074 5.073 5.074h45.775c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.904-20.31h-31.945z" fill-rule="evenodd" clip-rule="evenodd" fill="#3C8CEA"></path> <path d="M10.133 37.439h21.564v2.059h-21.564zm0 4.801h21.564v2.057h-21.564zm0 4.801h21.564v2.057h-21.564zm0 4.8h12.233v2.058h-12.233z" fill="#ffffff"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.96 20.377v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#2D6FE4"></path> <path d="M37.058.025v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> </g></svg>
                  Documents
                </div>
                <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-black text-white rounded-full text-sm">
                  <svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.125.042c-2.801 0-5.072 2.273-5.072 5.074v53.841c0 2.803 2.271 5.073 5.072 5.073h45.775c2.801 0 5.074-2.271 5.074-5.073v-38.604l-18.904-20.311h-31.945z" fill="#49C9A7"></path> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#37BB91"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M10.119 53.739v-20.904h20.906v20.904h-20.906zm18.799-18.843h-16.691v12.6h16.691v-12.6zm-9.583 8.384l3.909-5.256 1.207 2.123 1.395-.434.984 5.631h-13.082l3.496-3.32 2.091 1.256zm-3.856-3.64c-.91 0-1.649-.688-1.649-1.538 0-.849.739-1.538 1.649-1.538.912 0 1.65.689 1.65 1.538 0 .85-.738 1.538-1.65 1.538z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"></path> </g></svg>
                  Images
                </div>
                <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-black text-white rounded-full text-sm">
                  <svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.15.011c-2.801 0-5.072 2.272-5.072 5.074v53.841c0 2.803 2.272 5.074 5.072 5.074h45.775c2.802 0 5.075-2.271 5.075-5.074v-38.606l-18.904-20.309h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#8E4C9E"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#713985"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M24.531 45.529c0 .368-.163.736-.449.981-.205.163-5.255 4.417-11.839 7.095-.164.062-.327.103-.511.103-.225 0-.47-.062-.675-.184-.348-.205-.593-.573-.613-.981-.021-.144-.307-3.456-.307-7.014s.286-6.87.307-6.993c.021-.408.266-.776.613-1.002.205-.122.43-.184.675-.184.164 0 .348.041.511.103 6.584 2.678 11.634 6.932 11.839 7.115.286.225.449.593.449.961z" fill="#ffffff"></path> </g></svg>
                  Videos
                </div>
                <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-black text-white rounded-full text-sm">
                  <svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.106 0c-2.802 0-5.073 2.272-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.903-20.31h-31.945z" fill-rule="evenodd" clip-rule="evenodd" fill="#45B058"></path> <path d="M20.306 43.197c.126.144.198.324.198.522 0 .378-.306.72-.703.72-.18 0-.378-.072-.504-.234-.702-.846-1.891-1.387-3.007-1.387-2.629 0-4.627 2.017-4.627 4.88 0 2.845 1.999 4.879 4.627 4.879 1.134 0 2.25-.486 3.007-1.369.125-.144.324-.233.504-.233.415 0 .703.359.703.738 0 .18-.072.36-.198.504-.937.972-2.215 1.693-4.015 1.693-3.457 0-6.176-2.521-6.176-6.212s2.719-6.212 6.176-6.212c1.8.001 3.096.721 4.015 1.711zm6.802 10.714c-1.782 0-3.187-.594-4.213-1.495-.162-.144-.234-.342-.234-.54 0-.361.27-.757.702-.757.144 0 .306.036.432.144.828.739 1.98 1.314 3.367 1.314 2.143 0 2.827-1.152 2.827-2.071 0-3.097-7.112-1.386-7.112-5.672 0-1.98 1.764-3.331 4.123-3.331 1.548 0 2.881.467 3.853 1.278.162.144.252.342.252.54 0 .36-.306.72-.703.72-.144 0-.306-.054-.432-.162-.882-.72-1.98-1.044-3.079-1.044-1.44 0-2.467.774-2.467 1.909 0 2.701 7.112 1.152 7.112 5.636.001 1.748-1.187 3.531-4.428 3.531zm16.994-11.254l-4.159 10.335c-.198.486-.685.81-1.188.81h-.036c-.522 0-1.008-.324-1.207-.81l-4.142-10.335c-.036-.09-.054-.18-.054-.288 0-.36.323-.793.81-.793.306 0 .594.18.72.486l3.889 9.992 3.889-9.992c.108-.288.396-.486.72-.486.468 0 .81.378.81.793.001.09-.017.198-.052.288z" fill="#ffffff"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M56.001 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z" fill="#349C42"></path> <path d="M37.098.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z" opacity=".5" fill="#ffffff"></path> </g> </g></svg>
                  CSV
                  <svg className="ml-2 w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.112.006c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#45B058"></path><path d="M19.429 53.938c-.216 0-.415-.09-.54-.27l-3.728-4.97-3.745 4.97c-.126.18-.324.27-.54.27-.396 0-.72-.306-.72-.72 0-.144.035-.306.144-.432l3.89-5.131-3.619-4.826c-.09-.126-.145-.27-.145-.414 0-.342.288-.72.721-.72.216 0 .432.108.576.288l3.438 4.628 3.438-4.646c.127-.18.324-.27.541-.27.378 0 .738.306.738.72 0 .144-.036.288-.127.414l-3.619 4.808 3.891 5.149c.09.126.125.27.125.414 0 .396-.324.738-.719.738zm9.989-.126h-5.455c-.595 0-1.081-.486-1.081-1.08v-10.317c0-.396.324-.72.774-.72.396 0 .721.324.721.72v10.065h5.041c.359 0 .648.288.648.648 0 .396-.289.684-.648.684zm6.982.216c-1.782 0-3.188-.594-4.213-1.495-.162-.144-.234-.342-.234-.54 0-.36.27-.756.702-.756.144 0 .306.036.433.144.828.738 1.98 1.314 3.367 1.314 2.143 0 2.826-1.152 2.826-2.071 0-3.097-7.111-1.386-7.111-5.672 0-1.98 1.764-3.331 4.123-3.331 1.548 0 2.881.468 3.853 1.278.162.144.253.342.253.54 0 .36-.307.72-.703.72-.145 0-.307-.054-.432-.162-.883-.72-1.98-1.044-3.079-1.044-1.44 0-2.467.774-2.467 1.909 0 2.701 7.112 1.152 7.112 5.636 0 1.748-1.188 3.53-4.43 3.53z" fill="#ffffff"></path><path d="M55.953 20.352v1h-12.801s-6.312-1.26-6.127-6.707c0 0 .207 5.707 6.002 5.707h12.926z" fill-rule="evenodd" clip-rule="evenodd" fill="#349C42"></path><path d="M37.049 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.801l-18.905-20.352z" opacity=".5" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"></path></g></svg>
                  XLS

                </div>
              </div>

              <div>
                dnd
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-200 rounded-3xl p-4 flex flex-col h-40 transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center mb-2">
                      <task.icon className="text-white w-5 h-5" />

                    </div>
                    <div className="mt-auto">
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <p className="text-gray-500 text-xs mt-1">Day {task.day}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats section */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Your Plan</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium mb-2">Completion Rate</h3>
                    <p className="text-3xl font-bold">87%</p>
                    <p className="text-sm text-gray-500 mt-1">+12% from last week</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium mb-2">Streak</h3>
                    <p className="text-3xl font-bold">19 days</p>
                    <p className="text-sm text-gray-500 mt-1">Your longest streak yet!</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium mb-2">Total Habits</h3>
                    <p className="text-3xl font-bold">6 active</p>
                    <p className="text-sm text-gray-500 mt-1">2 completed this month</p>
                  </div>
                </div>
              </div>
              
            </> : <></>
          }

        </main>
      </div>

      {/* Mobile navigation */}
      
    </div>
  )
}

