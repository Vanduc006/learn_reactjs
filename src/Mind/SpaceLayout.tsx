import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Menu, X, ScrollText, Shapes } from "lucide-react"
import { useMind } from "@/context/MindProvider"
// import Chat from "@/components/mind/Chat"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSearchParams } from "react-router-dom"
import ChatScreen from "./Tab/ChatScreen"
import { isOwnerSpace } from "@/services/Supabase/SpaceList"
import { useUser } from "@clerk/clerk-react"
import FileHistory from "@/components/mind/history/File"


export default function TwoSectionLayout() {
  const {user} = useUser()
  const {currentTab,setCurrentTab,currentSpace,setCurrentSpace} = useMind()
  const [searchParams] =  useSearchParams()
  const spaceID = searchParams.get('id')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  const [sidebarSize,setSidebarSize] = useState<string>('20%')
  const handleIsSelectedFile = ( value:boolean) => {
      console.log(value)
      if (value) {
        setSidebarSize('35%')
      } else {
        setSidebarSize('20%')
      }
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  useEffect(() => {
      const checkOwner = async() => {
        if ( user && spaceID ) {
          const data = await isOwnerSpace(user.id,spaceID)
          if ( data ) {
            setCurrentSpace(spaceID)
            setIsOwner(true)
          }

          if(!data) {
            setIsOwner(false)
            console.log(data)
          }
        }
      } 
      checkOwner()
  },[currentSpace,spaceID])


  if (isOwner === false) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-black">
      <div className="text-center">
        <div className="flex items-center justify-center">
          We can't find the space ID:
          <span className="font-bold text-red ml-2">
            {spaceID ?? 'Undefined'}
          </span>
        </div>
        <div className="mt-2 font-bold text-sm">
          Please ensure that you are the owner of this space.
        </div>

      </div>
    </div>


  );
}

if (isOwner === null) {
  return null
}

  return (
    <div className="flex h-full w-full">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileSidebar} />
      )}

      {/* Sidebar Section */}
      <div
        className={`
        ${isSidebarCollapsed ? "w-16" : "w-2/5"} 
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        fixed md:relative inset-y-0 left-0 z-50 bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out
        md:w-auto flex flex-col h-full
      `}
        style={{
          width: isSidebarCollapsed
            ? "4rem"
            : typeof window !== "undefined" && window.innerWidth < 768
              ? "20rem"
              : `${sidebarSize}`,
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-2.5 border-b border-gray-200 bg-white">
          {!isSidebarCollapsed && <h2 className="text-lg font-semibold text-gray-800">Space Object</h2>}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="md:hidden">
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Sidebar Content - Scrollable */}
        <div className="flex-1 p-2 overflow-y-auto">
          <FileHistory currentSpace={currentSpace} isSidebarCollapsed={isSidebarCollapsed} handleIsSelectedFile={handleIsSelectedFile}/>
        </div>
      </div>


      <div className="flex-1 flex flex-col bg-white min-h-full">
        <div className="sticky top-0 z-10 flex items-center justify-between p-2.5 border-b border-gray-200 bg-white">
          <div className="flex items-center w-full">
            <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="md:hidden flex-shrink-0">
              <Menu size={20} />
            </Button>
            <div className="flex items-center justify-content-center w-full gap-2 cursor-pointer">
                <div className={`${ currentTab == "report" ? "bg-gray-50 font-semibold text-blue-600" : "text-gray-500 hover:scale-[1.05]"} hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl shadow-sm border-gray-100 dark:border-gray-800`} >
                  <ScrollText className="w-4 h-4 mr-2"/> Report
                </div>  
                <div className={`${ currentTab == "chat" ? "bg-gray-50 font-semibold text-blue-600" : "text-gray-500 hover:scale-[1.05]"} hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl shadow-sm border-gray-100 dark:border-gray-800`}
                onClick={() => {
                  setCurrentTab("chat")
                }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 mr-2 lucide lucide-message-circle-more-icon lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg> Chat 
                </div>
                
                <div className={`text-gray-500 hover:scale-[1.05] lg:hidden flex hover:bg-gray-50 items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl shadow-sm border-gray-100 dark:border-gray-800`}
                >
                
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mr-2 lucide lucide-sparkles-icon lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg> */}
                    <Popover>
                        <PopoverTrigger className="flex items-center justify-content-center gap-2">
                            Tools
                            <Shapes  className="w-4 h-4"/>

                        </PopoverTrigger>
                        <PopoverContent>Place content for the popover here.</PopoverContent>
                    </Popover>
                </div>

                <div className="hidden lg:flex gap-2">
                {/* Flashcard */}
                    <div
                        className={`${currentTab === "flashcard"
                        ? "bg-gray-50 font-semibold text-blue-600"
                        : "text-gray-500 hover:scale-[1.05]"
                        } hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl shadow-sm border-gray-100 dark:border-gray-800`}
                        onClick={() => setCurrentTab("flashcard")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
                        Flashcard
                    </div>

                    {/* Quizz */}
                    <div
                        className={`${currentTab === "quizz"
                        ? "bg-gray-50 font-semibold text-blue-600"
                        : "text-gray-500 hover:scale-[1.05]"
                        } hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl shadow-sm border-gray-100 dark:border-gray-800`}
                        onClick={() => setCurrentTab("quizz")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 17a10 10 0 0 0-20 0"/><path d="M6 17a6 6 0 0 1 12 0"/><path d="M10 17a2 2 0 0 1 4 0"/></svg>
                        Quizz
                    </div>

                    {/* Transcript */}
                    <div
                        className={`${currentTab === "transcript"
                        ? "bg-gray-50 font-semibold text-blue-600"
                        : "text-gray-500 hover:scale-[1.05]"
                        } hover:bg-gray-50 flex items-center transition-all duration-200 px-2 py-1 lg:px-5 lg:py-2 rounded-xl shadow-sm border-gray-100 dark:border-gray-800`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v4"/><path d="M12 2v4"/><path d="M16 2v4"/><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M8 10h6"/><path d="M8 14h8"/><path d="M8 18h5"/></svg>
                        Transcript
                    </div>
                </div>

            </div>
            {/* <h2 className="text-lg font-semibold text-gray-800">Chat</h2> */}
          </div>
        </div>

        {/* Tab section */}
        <div className="flex-1 overflow-hidden">
          {currentTab == "chat" &&
          <div className="h-full">
            <ChatScreen/>
          </div>
          }
        </div>


      </div>
    </div>
  )
}
