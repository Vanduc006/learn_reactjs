import Chat from "@/components/mind/Chat"
import { useMind } from "@/context/MindProvider"
const ChatScreen = () => {
    const { currentSpace} = useMind()
  return (
    <div className="flex-1 p-4 space-y-4 min-h-0 overflow-y-auto">
        <div className="overflow-y-auto h-[75%] rounded-xl">
            <div className="items-center justify-content-center lg:w-[50%] lg:mx-auto"> 

                <Chat currentSpace={currentSpace}/>
                <div className="sticky bottom-0 p-4">
                    fff
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatScreen