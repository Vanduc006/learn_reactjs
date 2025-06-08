// "use client"

// import { useState } from "react"
// import {
//   Plus,
//   Menu,
//   User,
//   X,
//   // FolderOpen,
//   // Folder,
//   Bot,
//   Send,
//   // Dna,
//   ScrollText,
//   FolderPlus,
//   // ClipboardPaste,
//   // CircleEllipsis,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// // import {
// //   Accordion,
// //   AccordionContent,
// //   AccordionItem,
// //   AccordionTrigger,
// // } from "@/components/ui/accordion"


// import { cn } from "@/lib/utils"
// // import { useMediaQuery } from "@/hooks/use-media-query"
// // import Link from "next/link"
// // import { Link, } from "react-router-dom"
// import { SignedIn,
//   // SignIn, 
//   //   SignUp, 
//     // SignOutButton, 
//     UserButton, 
//     useUser
//   } from "@clerk/clerk-react";
// import Chat from "@/components/mind/Chat"
// import FLashCard from "@/components/mind/FlashCard"
// import Quizz from "@/components/mind/Quizz"
// import { Textarea } from "@/components/ui/textarea"
// import Space from "@/components/mind/space/Space"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import FolderSpace from "@/components/mind/space/FolderSpace"
// import ResizablePanel from "@/components/mind/space/ResizablePanel"
// import Upload from "@/components/mind/file/Upload"
// // import DragnDrop from "@/components/mind/file/DragnDrop"
// // import { DialogTitle } from "@radix-ui/react-dialog"
// // import { Input } from "@/components/ui/input"


// export default function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [currentTab, setCurrentTab ] = useState<string | null>("home")
//   const [currentSpace, setCurrentSpace] = useState<string | null>(null);

//   setCurrentSpace('1111')

// //   const isDesktop = useMediaQuery("(min-width: 1024px)")

//   const { user } = useUser()

//   return (
//     <div className="flex h-screen bg-gray-200 text-gray-900">
//       {/* Sidebar for desktop */}
//       <aside
//         className={cn(
//           "fixed inset-y-0 z-50 flex w-72 flex-col bg-gray-200 transition-transform lg:static lg:translate-x-0 ",
//           sidebarOpen ? "translate-x-0" : "-translate-x-full",
//         )}
//       >
//         <div className="flex items-center justify-between h-16 px-6">
//           <h2 className="text-xl font-semibold cursor-pointer flex items-center justify-content-center" onClick={() => {setCurrentTab("home")}}>
//             <img src="/favicon.svg" className="w-8 h-8 rounded-md mr-2"/>
//             MIND
//           </h2>
//           <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
//             <X className="h-5 w-5" />
//           </Button>
//         </div>
        
//         <nav className="flex flex-col h-full overflow-auto p-2 scrollbar-hide">
//           <ul className="space-y-1 flex-1 overflow-auto">
//             <li>
//               <Button variant="ghost" className="w-full justify-start gap-2"
//               onClick={() => {
//                 setCurrentTab("home")
//               }}>
//                 <div className="flex items-center justify-content-center">
//                     <Plus className="h-5 w-5 mr-2" />
//                     New Space
//                 </div>
//               </Button>  


//             </li>
//             {/* <li>
//               <Accordion type="single" collapsible className="w-full">
//                 <AccordionItem value="item-1">
//                   <AccordionTrigger>
//                     <Button variant="ghost" className="w-full justify-start gap-2"
//                     onClick={() => {
//                       setCurrentTab("folder")
//                     }}>
//                       <FolderOpen className="h-5 w-5" />
//                       Your folders
//                     </Button>
//                   </AccordionTrigger>
//                   <AccordionContent className="ml-3 max-h-48 overflow-y-auto scrollbar-hide">
//                     <FolderSpace/>
//                   </AccordionContent>
                  
//                 </AccordionItem>
//               </Accordion>
//             </li> */}

//             <li>
//                 <Button variant="ghost" className="w-full justify-start gap-2">
//                   <User className="h-5 w-5" />
//                   Profile
//                 </Button>

//             </li>
            
//             <li>

//               <Button variant="ghost" className="w-full justify-start gap-2">
//                 <Bot className="w-5 h-5"/>Your spaces
//               </Button>

//               <div className="ml-3 overflow-hidden overflow-y-auto"
//                 // onClick={() => {
//                 //   setCurrentTab("chat")
//                 // }}
//               >
//                 <Space parent="dash" />
//               </div>

//             </li>

//             {/* <li>
//               <Link to="/camera">
//                 <Button variant="ghost" className="w-full justify-start gap-2">
//                   <Camera className="h-5 w-5" />
//                   Camera
//                 </Button>
//               </Link>
//             </li>
//             <li>
//               <Button variant="ghost" className="w-full justify-start gap-2">
//                 <Settings className="h-5 w-5" />
//                 Settings
//               </Button>
//             </li> */}

//             {/* make this li to bottom bar */}

//           </ul>
//           <div className="border-t pt-2">
//               <SignedIn>                    
//                   <div className='flex items-center p-1 w-full'>
//                       <div className='rounded-md flex items-center justify-center w-full'>
//                           <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/" afterMultiSessionSingleSignOutUrl='/' /> 
//                           <div className="text-sm ml-2">
//                             <div className="font-bold">{user?.firstName} {user?.lastName}</div>
//                             <div className="text-gray-500 ">Your Plan : Free</div>
//                           </div>
//                           <div className="ml-auto">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
//                           </div>
//                       </div>                                        
                      
//                   </div>                               
//               </SignedIn>
//               {/* <SignedOut>
//                 <div className="flex items-center justify-content-center bg-gray-200 pl-3 pr-3 pt-1 pb-1 rounded-xl cursor-pointer">
//                   Sign In <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 ml-2 lucide lucide-ampersand-icon lucide-ampersand"><path d="M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"/><path d="M16 12h3"/></svg> Sign Up
//                 </div>
//               </SignedOut> */}
//           </div>
//         </nav>
//       </aside>

//       {/* Main content */}
      

//       <div className="flex flex-1 flex-col overflow-hidden mx-2">
        
//         {/* Header */}
//         <header className="flex h-16 items-center bg-gray-200 ">
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
//               <Menu className="h-5 w-5" />
//             </Button>

//           </div>
//           <div className="flex items-center font-bold">
//             <span className="text-gray-500 text-lg">{currentTab}</span>

//           </div>
//         </header>

//         {/* Main content area */}
//         <main className="flex-1 thin-scrollbar overflow-auto p-6 bg-white rounded-lg border-2 border-solid border-slate-200">

//           {
//             (currentTab == "home" || currentTab == "folder") ? <></> : 
            
//             <div className="flex">
//               <div className="p-2 bg-white cursor-pointer mb-2 flex overflow-x-auto whitespace-nowrap space-x-2 lg:w-full scrollbar-hide md:scrollbar-default overflow-hidden rounded-xl shadow-sm border-gray-100 dark:border-gray-800">
//                 <div className={`${ currentTab == "report" ? "bg-gray-50 font-semibold text-blue-600" : "text-gray-500 hover:scale-[1.05]"} hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl`} >
//                   <ScrollText className="w-4 h-4 mr-2"/> Report
//                 </div>  
//                 <div className={`${ currentTab == "chat" ? "bg-gray-50 font-semibold text-blue-600" : "text-gray-500 hover:scale-[1.05]"} hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl`}
//                 onClick={() => {
//                   setCurrentTab("chat")
//                 }}
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 lucide lucide-message-circle-more-icon lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg> Chat 
//                 </div>
//                 <div className={`${ currentTab == "flashcard" ? "bg-gray-50 font-semibold text-blue-600" : "text-gray-500 hover:scale-[1.05]"} hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl`}
//                 onClick={() => {
//                   setCurrentTab("flashcard")
//                 }}
//                 >
                
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 lucide lucide-sparkles-icon lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>Flashcard
//                 </div>
//                 <div className={`${ currentTab == "quizz" ? "bg-gray-50 font-semibold text-blue-600" : "text-gray-500 hover:scale-[1.05]"} hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl`}
//                 onClick={() => {
//                   setCurrentTab("quizz")
//                 }}
//                 >
//                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 lucide lucide-rainbow-icon lucide-rainbow"><path d="M22 17a10 10 0 0 0-20 0"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M10 17a2 2 0 0 1 4 0"/></svg> Quizz
//                 </div>      
//                 <div className={`${ currentTab == "transcript" ? "bg-gray-50 font-semibold text-blue-600" : "text-gray-500 hover:scale-[1.05]"} hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 lucide lucide-notepad-text-icon lucide-notepad-text"><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>Transcript
//                 </div>  
                
//               </div>

//               {/* <div className="cursor-pointer mb-5 flex rounded-full transition-transform hover:scale-[1.02] bg-white border-2 border-gray-200 items-center p-2">
//                 <div className="">
//                   <Dna className=""/>
//                 </div>
                
//               </div> */}
//             </div>
//           }

//           {/* Task grid */}
//           { (currentTab == "home" || currentTab == "folder")  ? <></> :
//             <>
//               <Popover>
//                 <PopoverTrigger>
//                   <div  className="mb-1 cursor-pointer text-sm font-semibold flex items-center justify-content-center "> <FolderPlus className="w-4 h-4 mr-2"/> 
//                   Add to folder</div>
//                 </PopoverTrigger>
//                 <PopoverContent className="">
//                   <div className="text-xs font-semibold">Add to exist folder</div>
//                   <div className=" max-h-48 overflow-y-auto mt-2 cursor-pointer scrollbar-hide">
//                     <FolderSpace/>
//                   </div>
//                   <div className="text-xs bg-gray-200 p-2 rounded-lg font-semibold mt-2 flex items-center justify-content-center cursor-pointer"><Plus className="w-4 h-4 mr-1"/>Create new</div>
                  
//                 </PopoverContent>
//               </Popover>
            
//             </>
//             }
          
//           { currentTab == 'folder' && <>

//               <div className="h-[100%] rounded-xl p-1 bg-white flex overflow-x-auto overflow-hidden scrollbar-hide space-x-2 p-2">
//                 <ResizablePanel initialWidth={60} minWidth={40} maxWidth={100}>
//                   <div className="h-full bg-gray-300 rounded-xl p-2">Panel 1 Content</div>
//                 </ResizablePanel>  
//                 <ResizablePanel initialWidth={60} minWidth={40} maxWidth={100}>
//                   <div className="h-full bg-gray-300 rounded-xl p-2">Panel 1 Content</div>
//                 </ResizablePanel> 
//                 <ResizablePanel initialWidth={60} minWidth={40} maxWidth={100}>
//                   <div className="h-full bg-gray-300 rounded-xl p-2">Panel 1 Content</div>
//                 </ResizablePanel> 
//                 <div className="flex-shrink-0 w-[300px]" aria-hidden="true"></div>   

//               </div>

//             </>
//             }


//           { currentTab == "chat" &&
//           <>
//             <div className="overflow-y-auto h-[75%] rounded-xl p-1 bg-white">
//               <div className="items-center justify-content-center lg:w-[50%] lg:mx-auto"> 

//                 <Chat currentSpace={currentSpace}/>

//               </div>
//             </div>
//             <div className="">
//               <div className="lg:w-[50%] lg:mx-auto h-fit"> 
                
//                 <div className="flex mb-1 cursor-pointer">
//                   <div className="text-white bg-black items-center justify-content-center pl-5 pr-5 pt-2 pb-2 rounded-xl transition-transform hover:scale-[1.02]">
//                     recomended chat
//                   </div>
//                   <div className="bg-gray-200 ml-auto items-center justify-content-center pl-5 pr-5 pt-2 pb-2 rounded-xl transition-transform hover:scale-[1.02]">
//                     <Send className="w-5 h-5"/>
//                   </div>
                  
//                 </div>
//                 <div className="flex">
//                   <Textarea placeholder="Your message..." className="resize-none border-none"/>
                  

//                 </div>
//               </div>
              
//             </div>
//           </> 
//           }

//           {
//             currentTab == "flashcard" &&
//             <>
//               <div className="scrollbar-hide md:scrollbar-default overflow-y-auto h-[80%] rounded-xl p-1">
//                 <div className="w-[100%] items-center justify-content-center"> 
                  
//                     <FLashCard/>

//                 </div>
//               </div>
//             </>
//           }

//           {
//             currentTab == "quizz" && 
//             <>
//               <div className="scrollbar-hide md:scrollbar-default overflow-y-auto h-[100%] rounded-xl p-1">
//                 <div className="w-[100%] items-center justify-content-center"> 
//                   <Quizz/>

//                 </div>
//               </div>
//             </>
//           }

//           {
//             currentTab == "home" && 
//             <>
            
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold flex items-center justify-content-center">                  
//                   <img src="/upload.png" className="w-10 h-10 rounded-xl mr-2"/>
                  
//                   Where your knowleagde begin
                  
//                 </h2>

//               </div>
//               <h1 className="text-sm block mb-5">Support up to 1GB per space</h1>
              
//               <div className="mt-5 mb-10">
//                 <Upload />
//               </div>
//               {/* <div className="mb-5 mt-5">
//                 {isYoutube ?
//                 <>
//                   <DragnDrop/>
//                 </> 
//                 : 
//                 <>
//                   <div className="border rounded-lg p-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <button onClick={() => {HandleYoutube()}} className="p-1 rounded-full hover:bg-gray-100" aria-label="Remove file">
//                             <X className="h-5 w-5 text-gray-500" />
//                         </button> 
//                     </div>
//                   </div>

//                 </>
//                 }
                
//               </div> */}
//               <h2 className="text-2xl font-bold flex items-center justify-content-center mb-1">
//                 <img src="/space.png" className="w-10 h-10 rounded-xl mr-2"/>
//                 Your Spaces
//               </h2>
//               <h1 className="text-sm block mb-5">Keep learning everyday !</h1>
//               <Space parent="homescreen" />
              
//               {/* <div 
//               className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//                 {tasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className="bg-gray-200 rounded-3xl p-4 flex flex-col h-40 transition-transform hover:scale-[1.02] cursor-pointer"
//                   >
//                     <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center mb-2">
//                       <task.icon className="text-white w-5 h-5" />

//                     </div>
//                     <div className="mt-auto">
//                       <h3 className="font-medium text-sm">{task.title}</h3>
//                       <p className="text-gray-500 text-xs mt-1">Day {task.day}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div> */}

//               {/* Stats section */}
//               <div className="mt-10">
//                 <h2 className="text-2xl font-bold mb-6 flex items-center justify-content-center">
//                   <img src="/userplan.png" className="w-10 h-10 rounded-xl mr-2"/>
//                   Your Plan
//                 </h2>
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//                   <div className="bg-white rounded-3xl shadow-sm">
//                     <h3 className="text-lg font-medium mb-2">Your spaces left</h3>
//                     <p className="text-3xl font-bold">15 Spaces</p>
//                     <p className="text-sm text-gray-500 mt-1">The total spaces you can create will reset next month</p>
//                   </div>
    
//                 </div>
//               </div>
              
//             </>
//           }

//         </main>
        
//       </div>
      

//       {/* Mobile navigation */}
      
//     </div>
//   )
// }

