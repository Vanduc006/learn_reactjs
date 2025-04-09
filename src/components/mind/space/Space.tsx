import { CircleEllipsis } from 'lucide-react'
import SpaceList from '@/services/Supabase/SpaceList'
import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DateFormat from '../DateFormat';
import BeatLoader from 'react-spinners/BeatLoader';
import supabase from '@/services/Supabase/ConnectSupabase';

// set gia tri current space
const Space = ({ setCurrentSpace }: { setCurrentSpace: React.Dispatch<React.SetStateAction<string | null>> }) => {
    const { user } = useUser()
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
        }
    },[observerOptions,loadingSpace,user])
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
    <div>
        {/* <div className="mb-2 text-sm flex p-1 hover:scale-[1.05] hover:bg-gray-50 rounded-xl cursor-pointer"> 
            <div className="mr-2 items-center justify-content-center p-1 cursor-pointer"><CircleEllipsis className="w-4 h-4 items-center justify-content-center"/> </div>
            <div className="overflow-hidden overflow-x-auto whitespace-nowrap scrollbar-hide">Learn how to build the fucking shiet mvp with reactjs</div>
        </div> */}
        <div>
            {spaceSession.map((space,index) => {
                
                return (
                    <div key={index} >
                        <div className={`${space.id == selectBackground ? "bg-gray-300 hover:bg-gray-300 hover:scale-[1]" : 'hover:bg-gray-50'} mb-2 text-sm flex p-1 hover:scale-[1.05] rounded-xl cursor-pointer`}> 
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
                            
                        <div className="overflow-hidden overflow-x-auto whitespace-nowrap scrollbar-hide" onClick={() => {
                            handleSpaceSelect(space.id);
                            setCurrentSpace(space.id);
                        }}>
                            {space.topic}</div>
                        </div>
                    </div>
                )
            })}
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