import { CircleEllipsis, LibraryBig } from 'lucide-react'
import SpaceList from '@/services/Supabase/SpaceList'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DateFormat from '../DateFormat';
import BeatLoader from 'react-spinners/BeatLoader';
import supabase from '@/services/Supabase/ConnectSupabase';
import { useMind } from '@/context/MindProvider';
// import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
type SpaceProps = {

    parent: string;
};
// set gia tri current space
const Space = ({ parent }: SpaceProps) => {
    const { user } = useUser()
    // const navigate =  useNavigate()
    const { setCurrentSpace } = useMind()
    const [spaceSession, setSpaceSession] = useState<any[]>([])
    const [loadingSpace, setLoadingSpace] = useState(false)
    const [moreSpace, setMoreSpace] = useState(true)
    const lastSpaceRef = useRef(null)
    const [lastCreatedAt, setLastCreatedAt] = useState(null);
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }
    async function CallSpaceList(clerkUserrId:string, cursor =  null) {
        SpaceList(clerkUserrId,cursor).then(( data ) => {
            setLoadingSpace(true)
            if (data.length < 20) {
                setMoreSpace(false)
            }
            if (data.length > 0) {
                setSpaceSession((prev) => [...prev,...data])
                setLastCreatedAt(data[data.length - 1].created_at);
            }
            setLoadingSpace(false)
        })
    }
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            setLoadingSpace(entry.isIntersecting)  
        },observerOptions)
        if (lastSpaceRef.current) {
            observer.observe(lastSpaceRef.current)
        }
        if (loadingSpace && user ) {
            const clerkUserId = user?.id
            if (!moreSpace) {
                return
            }
            else {
                CallSpaceList(clerkUserId,lastCreatedAt)
            }
        }
        return () => {
            // if ( spaceSession.length == 0) {
            //     console.log('ok')
            // }
        }
    },[observerOptions])
    //hadle click space

    const [selectBackground, setSelectBackground] = useState<string>('');
    const handleSpaceSelect = (id: string) => {
        setCurrentSpace(id); // Cập nhật currentSpace khi chọn
        setSelectBackground(id);
        
    };

    // handle change
    // const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
    const [openPopover, setOpenPopover] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState<string>(''); // lưu value đang sửa

    const handleSave = async (id: number) => {
        const inputValue = editingValue.trim();
        if (!inputValue) return;
      
        const { error } = await supabase
          .from('space')
          .update({ topic: inputValue })
          .eq('id', id);
      
        if (!error) {
          // 🔥 Thêm đoạn cập nhật state tại đây
          setSpaceSession((prevSpaces) =>
            prevSpaces.map((space) =>
              space.id === id ? { ...space, topic: inputValue } : space
            )
          );
      
          setOpenPopover(null);
        } else {
          console.error(error);
        }
    };
      
    

  return (
    <div className='mt-2'>
        
        <div>
            {parent == "dash" && 
                <div>

                    {spaceSession.map((space,index) => {
                
                        return (
                            <div>
                                
                                    <div key={index} >
                                        <div className={`${space.id == selectBackground ? "bg-gray-300 hover:bg-gray-300 font-bold" : 'hover:bg-gray-100 hover:scale-[1.06]'} mb-2 text-sm flex p-1 rounded-xl cursor-pointer`}> 
                                        <Popover 
                                        open={openPopover === space.id} 
                                        onOpenChange={(open) => {
                                            setOpenPopover(open ? space.id : null);
                                            if (open) setEditingValue(space.topic); // Gán value mỗi khi mở popover
                                        }}
                                        >
                                            <PopoverTrigger asChild>
                                                <div className="mr-2 items-center justify-content-center p-1 cursor-pointer hover:scale-[1.09]">
                                                    <CircleEllipsis className="w-4 h-4 items-center justify-content-center" />
                                                </div>
                                            </PopoverTrigger>

                                            <PopoverContent className="mx-auto lg:w-[90%]">
                                                <div className="text-black text-sm flex">
                                                <div className="font-bold">Time :</div>
                                                <DateFormat utcTime={space.created_at} />
                                                </div>

                                                <div className="mt-2">
                                                <div className="text-black text-sm flex font-bold mb-1">Change name</div>
                                                <input
                                                    type="text"
                                                    value={editingValue}
                                                    onChange={(e) => setEditingValue(e.target.value)}
                                                    className="border-2 border-black rounded-md p-1 w-full"
                                                />
                                                </div>

                                                <div
                                                className="text-center mt-2 cursor-pointer bg-gray-200 p-1 rounded-md hover:bg-gray-300 transition"
                                                onClick={() => handleSave(space.id)}
                                                >
                                                Save
                                                </div>
                                            </PopoverContent>
                                            </Popover>
                                        
                                        
                                        <div className="overflow-hidden overflow-x-auto whitespace-nowrap scrollbar-hide" >
                                            {/* <div
                                                onClick={() => {
                                                    handleSpaceSelect(space.id);
                                                    setCurrentSpace(space.id);
                                                    // setTab('chat')
                                                }}
                                            >
                                                {space.topic}
                                            </div> */}
                                            <Link to={`/space?id=${space.id}`}>
                                                {space.topic}
                                            </Link>
                                            
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        )
                    })}
                </div>
            }

            {parent == "homescreen" && 
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {spaceSession.map((space,index) => {
                        return (
                            <div key={index} 
                            className="bg-gray-200 rounded-3xl p-4 flex flex-col h-40 transition-transform hover:scale-[1.02] cursor-pointer"
                            onClick={() => {
                                // console.log('click')
                                // console.log(space.id)
                                handleSpaceSelect(space.id);
                                setCurrentSpace(space.id);
                                // setTab("chat")
                            }}
                            >
                                <Link to={`/space?id=${space.id}`}>
                                    <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center mb-2">
                                        <LibraryBig className='text-white w-4 h-4'/>
                                    </div>
                                    <div className="mt-auto">
                                        <h3 className="font-medium text-sm">{space.topic}</h3>
                                        <p className="text-gray-500 text-xs mt-1"><DateFormat utcTime={space.created_at} /></p>
                                    </div> 
                                </Link>

                            </div>
                        )
                    })}
                </div>
            }
            
        </div>
        

        <div ref={lastSpaceRef}>
            {moreSpace && 
                <p className='flex items-center text-sm'>  
                    Getting your space    
                    <BeatLoader
                        color='#4871f7'
                        className='ml-2'
                        loading={true}
                        size={10}
                    />
                </p>}
        </div>
        
    </div>
  )
}

export default Space