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
import FolderList, { newFolder } from '@/services/Supabase/FolderList';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select1,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    const [addToFolder,setAddToFolder] = useState<string>('')
    const handleSave = async(id: number) => {
        console.log(addToFolder)
        const inputValue = editingValue.trim();

        if (inputValue) {
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
        }

        if (addToFolder) {
            const {error} = await supabase
            .from('space')
            .update({folder : addToFolder})
            .eq('id',id)
            if (!error) {
                setSpaceSession((prevSpaces) => 
                    prevSpaces.map((space) => 
                        space.id === id ? {...space, folder: addToFolder} : space
                    )
                )
            }


        }


    };

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

    const [currentFolder, setCurrentFolder] = useState<string>('all')
    const [currentFolderList, setCurrentFolderList] = useState<any[]>([])
    const [newFolderName,setNewFolderName] = useState<string>('')
    const [loandingNewFolder,setLoadingNewFolder] = useState<boolean>(false)
    const [newFolderColor,setNewFolderColor] = useState<string>('white')

    const colorList = [
        { name: 'white', class: 'bg-white' },
        { name: 'black', class: 'bg-black' },
        { name: 'yellow-200', class: 'bg-yellow-200' },
        { name: 'slate-500', class: 'bg-slate-500' },
        { name: 'blue-500', class: 'bg-blue-500' },
        { name: 'rose-500', class: 'bg-rose-500' },
        { name: 'pink-500', class: 'bg-pink-500' },
    ];

    const handleNewFolder = async() => {
        // setLoadingNewFolder(true)
        try {
            if (newFolderName == '') {
                alert('Please type name for new folder')
            }
            else {
                await newFolder(user?.id,newFolderName,newFolderColor)
            }
        } catch (error) {
            console.log(error)
        }
        setLoadingNewFolder(true)
    }

    const handleRemoveFolderToSpace = async(id: number) => {
        const {error} = await supabase
        .from('space')
        .update({folder : null})
        .eq('id',id)
        if(!error) {
            setSpaceSession((prevSpaces) => 
                prevSpaces.map((space) => 
                    space.id === id ? {...space, folder: null} : space
                )
            )
        }
    }

    useEffect(() => {
        if (user) {
            const getFolderList = async () => {
                const data = await FolderList(user.id)
                setCurrentFolderList(data)
            }
            getFolderList()
        }

    }, [loandingNewFolder])


    return (
        <div className='mt-2'>
            <div className="text-sm mb-2 font-bold flex items-center gap-2 overflow-x-auto whitespace-nowrap">

                <Dialog>
                    <DialogTrigger 
                    className="rounded-xl p-2 cursor-pointer bg-gray-100"
                    >
                        <Plus className='w-4 h-4'/>
                    </DialogTrigger>
                    <DialogContent className='bg-white text-black'>
                        <DialogHeader>
                            <DialogTitle>
                                Create new folder
                            </DialogTitle>
                            
                        </DialogHeader>
                        <div>
                            <input value={newFolderName} type="text" placeholder='Type name new folder here ...' className='outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 w-full' onChange={(e) => setNewFolderName(e.target.value)}/>
                            <div className='bg-gray-200 p-2 rounded-md mt-3'>
                                <div className='text-sm font-bold'>Select color</div>
                                <div className="flex mt-1 gap-3">
                                    {colorList.map((color) => (
                                    <div
                                        key={color.name}
                                        className={`
                                        w-5 h-5 rounded-md shadow-md cursor-pointer ${color.class}
                                        ${newFolderColor === color.class ? 'outline outline-2 outline-blue-500' : ''}
                                        `}
                                        onClick={() => setNewFolderColor(color.class)}
                                    ></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <DialogFooter className='flex gap-2'>
                            {
                                loandingNewFolder ? 
                                <DialogClose 
                                onClick={() => setLoadingNewFolder(false)}
                                className='bg-red px-5 py-1 rounded-md text-white'>
                                    Close
                                </DialogClose>
                                :
                                <button 
                                onClick={() => handleNewFolder()}
                                className='bg-black px-5 py-1 rounded-md text-white' disabled={loandingNewFolder} 
                                >
                                    Create
                                </button> 
                            }
                        </DialogFooter>


                    </DialogContent>
                </Dialog>

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
                        className={`rounded-xl px-5 py-2 cursor-pointer ${currentFolder === folder.foldername ? 'bg-black text-white' : `${folder.customize}`
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

                                                <div className="mt-2">
                                                    <div className="text-black text-sm flex font-bold my-2">Change name</div>
                                                    <input
                                                        type="text"
                                                        value={editingValue}
                                                        onChange={(e) => setEditingValue(e.target.value)}
                                                        className="border-2 border-black rounded-md p-1 w-full"
                                                    />
                                                    <div className="text-black text-sm flex font-bold my-2">Add/Change Folder</div>
                                                    <Select1 
                                                        onValueChange={(value) => {
                                                            // console.log("Selected folder:", value)
                                                            setAddToFolder(value)
                                                        }}
                                                        // onValueChange={(value) => setAddToFolder(value)}
                                                        // value={space.folder ?? ""}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            {
                                                                space.folder == null ? 
                                                                <SelectValue placeholder='Add to folder'/> 
                                                                :
                                                                <SelectValue placeholder={space.folder} />


                                                            }
                                                        </SelectTrigger>
                                                        <SelectContent className='bg-white text-black w-full'>
                                                            <SelectGroup>
                                                            {/* <SelectLabel>{space.folder}</SelectLabel> */}
                                                            {
                                                                currentFolderList.map((folder) => {
                                                                    return (
                                                                        <SelectItem 
                                                                        key={folder.id}
                                                                        
                                                                        value={folder.foldername}>{folder.foldername}</SelectItem>

                                                                    )
                                                                })
                                                            }
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select1>
                                                {/* {
                                                    space.folder !== null ? 
                                                    <div className='ml-auto bg-gray-500 text-white px-2 rounded-md'>
                                                        {space.folder}
                                                    </div> 
                                                    :
                                                    <div className='ml-auto text-black '>
                                                        Add to folder
                                                    </div>
                                                } */}
                                                </div>
                                                {
                                                    space.folder && 
                                                    <div
                                                        className="text-center mt-2 cursor-pointer bg-red p-1 rounded-md hover:bg-red-500 text-white transition"
                                                        onClick={() => handleRemoveFolderToSpace(space.id)}
                                                    >
                                                        Remove from {space.folder}
                                                    </div>
                                                }


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
                                            <div className="text-gray-500 text-xs mt-1">
                                                <DateFormat utcTime={space.created_at} />

                                            </div>
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