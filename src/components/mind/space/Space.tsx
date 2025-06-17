import { LibraryBig, Plus, X } from 'lucide-react'
import SpaceList, { deleteSpace } from '@/services/Supabase/SpaceList'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DateFormat from '../DateFormat';
import BeatLoader from 'react-spinners/BeatLoader';
import supabase from '@/services/Supabase/ConnectSupabase';
// import { useMind } from '@/context/MindProvider';
// import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import FolderList from '@/services/Supabase/FolderList';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import BounceLoader from 'react-spinners/BounceLoader';
type SpaceProps = {

    parent: string;
};
// set gia tri current space
const Space = ({ parent }: SpaceProps) => {
    const { user } = useUser()
    // const navigate =  useNavigate()
    // const { setCurrentSpace } = useMind()
    const [spaceSession, setSpaceSession] = useState<any[]>([])
    // const [loadingSpace, setLoadingSpace] = useState(false)
    const [moreSpace, setMoreSpace] = useState(true)
    const lastSpaceRef = useRef(null)
    const [lastCreatedAt, setLastCreatedAt] = useState(null);
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }
    async function CallSpaceList(clerkUserrId: string, cursor = null) {
        SpaceList(clerkUserrId, cursor).then((data) => {
            // setLoadingSpace(true)
            if (data.length < 20) {
                setMoreSpace(false)
            }
            if (data.length > 0) {
                setSpaceSession((prev) => [...prev, ...data])
                setLastCreatedAt(data[data.length - 1].created_at);
            }
            // setLoadingSpace(false)
        })
    }

    useEffect(() => {
        if (!user || !moreSpace) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
            CallSpaceList(user.id, lastCreatedAt);
            }
        }, observerOptions);

        const currentRef = lastSpaceRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [user, moreSpace, lastCreatedAt]);

    //hadle click space

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

    const [currentFolder, setCurrentFolder] = useState<string>('all')
    const [currentFolderList, setCurrentFolderList] = useState<any[]>([])

    useEffect(() => {
        if (user) {
            const getFolderList = async () => {
                const data = await FolderList(user.id)

                setCurrentFolderList(data)
            }

            getFolderList()
        }

    }, [])

    // const [dialogDeleteSpace,setDialogDeleteSpace] = useState<boolean>(false)
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [loadingDeleteSpace,setLoadingDeleteSpace] = useState<boolean>(false)
    const handleDeleteSpace = async() => {
        if (!deleteTarget) return
        setLoadingDeleteSpace(true)
        try {
            await deleteSpace(deleteTarget)
            // alert(`Delete space ID : ${spaceID} sucess`)
        } catch (error) {
            console.log('Delete space fail')
            // return
        }       
        setLoadingDeleteSpace(false) 
        // setDialogDeleteSpace(false)
        setDeleteTarget(null)
    }



    return (
        <div className='mt-2'>
            <div className="text-sm mb-2 font-bold flex items-center gap-2 overflow-x-auto whitespace-nowrap">

                <div
                    className={`rounded-xl p-2 cursor-pointer bg-gray-100`}
                >
                    <Plus className='w-4 h-4'/>
                </div>

                <div
                    className={`rounded-xl px-5 py-2 cursor-pointer ${currentFolder === 'all' ? 'bg-black text-white' : 'bg-gray-100'
                        }`}
                    onClick={() => setCurrentFolder('all')}
                >
                    All spaces
                </div>

                {currentFolderList.map((folder) => (
                    <div
                        key={folder.id}
                        className={`rounded-xl px-5 py-2 cursor-pointer ${currentFolder === folder.foldername ? 'bg-black text-white' : 'bg-gray-100'
                            }`}
                        onClick={() => setCurrentFolder(folder.foldername)}
                    >
                        {folder.foldername}
                    </div>
                ))}

            </div>


            <div>

                {parent == "homescreen" &&
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {spaceSession
                            .filter(space => currentFolder === 'all' || space.folder === currentFolder)
                            .map((space, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-200 rounded-3xl p-4 flex flex-col h-40 transition-transform hover:scale-[1.02] cursor-pointer"
                                    // onClick={() => handleSpaceSelect(space.id)}
                                >   

                                    <div className='flex text-sm gap-2 ml-auto'>
                                        {/* Delete */}
                                        {/* <div className='p-1 bg-red text-white rounded-md'
                                        onClick={() => {
                                            handleDeleteSpace(space.spaceid)
                                        }}
                                        >
                                            <X className='w-4 h-4'/>
                                        </div> */}
                                        <Dialog 
                                        open={deleteTarget === space.spaceid}
                                        onOpenChange={(open) => {
                                            if (!open) setDeleteTarget(null);
                                        }}
                                        >
                                            <DialogTrigger
                                                // onClick={() => {
                                                //     handleDeleteSpace(space.spaceid)
                                                // }}
                                                asChild
                                            >
                                                <div className='p-1 bg-red text-white rounded-md'
                                                onClick={() => setDeleteTarget(space.spaceid)}
                                                >
                                                    <X className='w-4 h-4'/>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className='bg-white text-black'>
                                                <DialogHeader>
                                                    <DialogTitle className='flex gap-2'>
                                                        Are you absolutely sure to delete space 
                                                        <div className='text-red font-bold'>{deleteTarget}</div> ?</DialogTitle>
                                                    <DialogDescription>
                                                        This action cannot be undone. This will permanently delete your space from our servers.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className='flex items-center justify-content-center gap-2 text-white'>
                                                    <button 
                                                    onClick={() => handleDeleteSpace()}
                                                    disabled={loadingDeleteSpace} 
                                                    className='gap-2 bg-red px-5 py-1 rounded-md shadow-md flex items-center justify-content-center'>
                                                        Yes delete it !
                                                        { loadingDeleteSpace && <BounceLoader size={15}/> }
                                                    </button>
                                                    <DialogClose asChild>
                                                        <button className='bg-green-500 px-5 py-1 rounded-md shadow-md'>Cancel</button>

                                                    </DialogClose>
                                                </div>
                                            </DialogContent>
                                        </Dialog>

                                        {/* Change */}
                                        <Popover
                                            open={openPopover === space.id}
                                            onOpenChange={(open) => {
                                                setOpenPopover(open ? space.id : null);
                                                if (open) setEditingValue(space.topic); // Gán value mỗi khi mở popover
                                            }}
                                            
                                        >
                                            <PopoverTrigger asChild >
                                                <div className='bg-white p-1 rounded-md'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>        
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

                                    </div>
                                    <Link to={`/space?id=${space.spaceid}`} className="w-full h-full">
                                        <div className='flex'>
                                            <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center mb-2">
                                                <LibraryBig className="text-white w-4 h-4" />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="font-medium text-sm">{space.topic}</h3>
                                            <p className="text-gray-500 text-xs mt-1">
                                                <DateFormat utcTime={space.created_at} />
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}

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