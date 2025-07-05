import FileList from "@/services/Supabase/FileList"
import DateFormat from "@/components/mind/DateFormat"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { ExternalLink, Plus, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import PreviewPDF from "../file/PreviewPDF"
import { useUser } from "@clerk/clerk-react"
import S3Storage from "@/services/AWS/S3Storage"
import { v4 as uuidv4 } from 'uuid';
// import BounceLoader from "react-spinners/BounceLoader"
import DotLoader from "react-spinners/DotLoader"
import { cn } from "@/lib/utils"
import { useMind } from "@/context/MindProvider"
// import { useMind } from "@/context/MindProvider"

interface FileHistory {
    currentSpace : string,
    isSidebarCollapsed : boolean,
    handleIsSelectedFile : (value : boolean) => void,
    // handleSourceObject : (value : number) => void,
}
const FileHistory = ({ currentSpace,isSidebarCollapsed,handleIsSelectedFile,
    // handleSourceObject 
} : FileHistory) => {
    const {user} = useUser()
    const {currentSourceLenght,setCurrentSourceLenght} = useMind()
    // const {currentSpace} = useMind()
    const [currentFileList,setCurrentFileList] = useState<any[]>([])
    // const [isSelectedFile,setIsSelectedFile] = useState<boolean>(false)
    const [selectedFile,setSelectedFile] = useState<number>(0)
    // const [selectedFileURL,setSelectedFileURL] = useState<string>('')
    // const [currentSourceObject,setCurrentSourceObject] = useState<number>(0)
    
    useEffect(() => {
        const getFileList = async () => {
            const data = await FileList(currentSpace)
            const dataWithIsSource = data.map(item => ({
            ...item,
            isSource: true,
            }))
            setCurrentFileList(dataWithIsSource)
        }
        getFileList()
    }, [])

    useEffect(() => {
        const count = currentFileList.filter(item => item.isSource).length;
        // setCurrentSourceObject(count);
        setCurrentSourceLenght(count)
    }, [currentFileList]);

    const handleToggleSource = (id : number) => {
        setCurrentFileList(prev =>
            prev.map(item =>
            item.id === id ? { ...item, isSource: !item.isSource } : item
            )
        )
    }

    const [presinedURL,setPresignedURL] = useState<string>('')
    const getPresigned = async (key: string) => {
        const params = new URLSearchParams()
        params.append('key', key)
        params.append('timeout', '60')
        const res = await fetch(
            'https://api.imasis.id.vn/upload/presigned?' + params.toString(),
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            }
        )
        const data = await res.json()

        if (data.url) {
            // window.open(data.url, "_blank")
            setPresignedURL(data.url)
            // setSelectedFileURL(data.url)
        }
    }


    useEffect(() => {
        handleIsSelectedFile(selectedFile !== 0)
    }, [selectedFile])

    // useEffect(() => {
    //     handleSourceObject()
    // },[])

    //same with Upload.tsx
    const [uploadListDialog,setUpLoadListDialog] = useState<boolean>(false)
    const [currentFileType, setCurrentFileType] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [loandingUpload,setLoadingUpload] = useState<boolean>(false)
    const handleUpload = (type : string) => {
        // handleNewSpace(`${genSpaceID()}`)
        if (fileInputRef.current) {
            let accept = ""
            switch (type) {
                case 'pdf':
                    accept = 'application/pdf'
                    setCurrentFileType('pdf')
                    break

                case 'audio':
                    accept = 'audio/*'   
                    setCurrentFileType('audio/')
                    break
            }
            fileInputRef.current.accept = accept
            fileInputRef.current.click()
        }  
    }

    const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        // console.log(files)
        if ( files && currentFileType) {
            Array.from(files).map(file => {
                if ( !file.type.includes(currentFileType) ) {
                    // console.log(currentFileType)
                    // console.log(file.type)
                    return
                }
                // setSelectedFiles([file])
                setSelectedFiles((prev) => [...prev,file])
                // console.log(file.size)                
            })
            console.log(selectedFiles)
        }
        // setUpLoadListDialog(true)
    }

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prev => {
          const newFiles = prev.filter((_, i) => i !== index);
          
          // Bonus: Nếu không còn file nào, reset luôn currentFileType
          if (newFiles.length === 0) {
            setCurrentFileType(null);
          }
      
          return newFiles;
        });
      
    };

    const handleFormdata = async() => {
        setLoadingUpload(true)
        selectedFiles.forEach(async(file,index) => {
            const formData = new FormData()
            
            let fileKey = user?.id + '/' + uuidv4() + '-' + file.name
            fileKey = fileKey.replace(/\s/g, '')
            
            // const data = await S3Storage(currentSpace,fileKey,formatFileSize(file.size),"60")
            // if (!data) {
            //     console.log('Presigned post fail')
            //     return
            // }

            const data = await S3Storage(file,user?.id,'pdf',currentSpace,fileKey,file.name)    
            if (!data) {
                console.log('Presigned post fail')
                return
            }
            Object.entries(data.url.fields).forEach(([key, value]) => {
                if (typeof value === 'string') {
                    formData.append(key, value);  // value is guaranteed to be a string now
                } else {
                    console.error(`Invalid field value type for key ${key}`);
                }
            });
            formData.append('file',file)

            const respone = await fetch(data.url.url,{
                method: "POST",
                body: formData,
            })
            console.log(respone)
            if (respone.status == 204) {
                handleRemoveFile(index)
            }
        })
        // selectedFiles.forEach(async (file,index) => {
        //     // n = n + 1
            
        //     const formData = new FormData()
        //     let fileKey = user?.id + '/' + uuidv4() + '-' + file.name
        //     fileKey = fileKey.replace(/\s/g, '')
        //     const data = await S3Storage(currentSpace,fileKey,formatFileSize(file.size),"60")
        //     if (!data) {
        //         console.log('Presigned post fail')
        //         return
        //     }

        //     Object.entries(data.url.fields).forEach(([key, value]) => {
        //         if (typeof value === 'string') {
        //             formData.append(key, value);  // value is guaranteed to be a string now
        //         } else {
        //             console.error(`Invalid field value type for key ${key}`);
        //         }
        //     });
        //     formData.append('file',file)

        //     const respone = await fetch(data.url.url,{
        //         method: "POST",
        //         body: formData,
        //     })
        //     console.log(respone)

        //     if (respone.status == 204) {

        //         handleRemoveFile(index)
        //     }
        // });


    }

    useEffect(() => {
        console.log('HOOK')
        if ( selectedFiles.length > 0) {
            setUpLoadListDialog(true)
        }

        if (selectedFiles.length == 0) {
            setLoadingUpload(false)
        }

    },[selectedFiles])
    
    const [allType,setAllType] = useState<boolean>(true)
    // const [sourceList,setSourceList] = useState<any[]>([])
    // const filterSource = () => {
    //     currentFileList.map((file) => {
    //         {
    //             file.isSource ? setSourceList({
    //                 fileID : file.id,
    //             })
    //         }
    //     })
    // }
    // const handleUploadListDialogChange = () => {}

  return (
    <div className="h-full">
        {
            !selectedFile && !isSidebarCollapsed &&
            // user select then show dialog list upload remove when respone status is 402
            <Card className="hover:shadow-md transition-shadow cursor-pointer my-2">
                <CardContent className="p-2 w-full">
                    <input 
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                    />
                    <div 
                    className="flex items-center justify-content-center"
                    onClick={() => {
                        handleUpload("pdf")
                        // handleNewSpace()
                    }}>

                        <h3 className="font-medium text-gray-800 overflow-x-auto">Add Object</h3>
                        <Plus className="w-4 h-4 ml-auto"/>
                    </div>
                </CardContent>

            </Card>
        }

        <Dialog open={uploadListDialog} onOpenChange={() => setUpLoadListDialog}>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <DialogTitle className="text-gray-500">
                        File(s) you have uploaded
                    </DialogTitle>
                </DialogHeader>
                <div>
                    {
                        selectedFiles.map((file,index) => {
                            return (
                                <div key={index} className="text-sm flex items-center justify-content-center">
                                    <div className="flex font-semibold "> 
                                        {file.type.includes("pdf") && (<svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" enable-background="new 0 0 56 64" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#8C181A" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"></path> <path fill="#6B0D12" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"></path> <path opacity="0.5" fill="#FFFFFF" enable-background="new " d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"></path> </g> <path fill="#FFFFFF" d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"></path> </g></svg>)}
                                        {file.type.includes("audio") && (<svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.151.012c-2.802 0-5.073 2.272-5.073 5.073v53.842c0 2.802 2.272 5.073 5.073 5.073h45.774c2.803 0 5.075-2.271 5.075-5.073v-38.606l-18.903-20.309h-31.946z" fill="#379FD3"></path> <path d="M56 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z" fill="#2987C8"></path> <path d="M37.097.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z" opacity=".5" fill="#ffffff"></path> <path d="M29.798 34.036l-14.165 1.814v13.438c-.738-.205-1.628-.243-2.531-.064-2.009.394-3.325 1.702-2.938 2.918.386 1.215 2.325 1.88 4.333 1.48 1.764-.348 2.994-1.397 3.005-2.473h.002v-10.74l10.422-1.288v8.306c-.75-.212-1.655-.251-2.572-.068-2.03.399-3.357 1.718-2.969 2.947.389 1.229 2.35 1.897 4.379 1.499 1.849-.366 3.116-1.494 3.031-2.621v-15.148z" fill="#ffffff"></path> </g> </g></svg>)}
                                        {file.type.includes("video") && (<svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.15.011c-2.801 0-5.072 2.272-5.072 5.074v53.841c0 2.803 2.272 5.074 5.072 5.074h45.775c2.802 0 5.075-2.271 5.075-5.074v-38.606l-18.904-20.309h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#8E4C9E"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#713985"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M24.531 45.529c0 .368-.163.736-.449.981-.205.163-5.255 4.417-11.839 7.095-.164.062-.327.103-.511.103-.225 0-.47-.062-.675-.184-.348-.205-.593-.573-.613-.981-.021-.144-.307-3.456-.307-7.014s.286-6.87.307-6.993c.021-.408.266-.776.613-1.002.205-.122.43-.184.675-.184.164 0 .348.041.511.103 6.584 2.678 11.634 6.932 11.839 7.115.286.225.449.593.449.961z" fill="#ffffff"></path> </g></svg>)}
                                        {file.type.includes("image") && (<svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.125.042c-2.801 0-5.072 2.273-5.072 5.074v53.841c0 2.803 2.271 5.073 5.072 5.073h45.775c2.801 0 5.074-2.271 5.074-5.073v-38.604l-18.904-20.311h-31.945z" fill="#49C9A7"></path> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#37BB91"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M10.119 53.739v-20.904h20.906v20.904h-20.906zm18.799-18.843h-16.691v12.6h16.691v-12.6zm-9.583 8.384l3.909-5.256 1.207 2.123 1.395-.434.984 5.631h-13.082l3.496-3.32 2.091 1.256zm-3.856-3.64c-.91 0-1.649-.688-1.649-1.538 0-.849.739-1.538 1.649-1.538.912 0 1.65.689 1.65 1.538 0 .85-.738 1.538-1.65 1.538z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"></path> </g></svg>)}
                                        
                                        
                                        {file.name}
                                    </div>
                                    {
                                        loandingUpload && 
                                        <div className="ml-auto">
                                            <DotLoader size={20} className='mr-2' color='#4871f7'/> 
                                        </div>
                                    }
                                    {/* <div 
                                    onClick={() => handleRemoveFile(index)}
                                    className="p-1 bg-red cursor-pointer rounded-md text-white ml-auto">
                                        Remove
                                    </div> */}
                                </div>
                            )
                        })
                    }
                </div>
                <DialogFooter className="">
                    <button 
                    onClick={() => {
                        setSelectedFiles([])
                        setUpLoadListDialog(false)
                    }}
                    className="cursor-pointer bg-red text-white px-2 py-1 rounded-md">Cancel</button>
                    <button 
                    disabled={loandingUpload}
                    className="cursor-pointer bg-black text-white px-2 py-1 rounded-md"
                    onClick={() => {
                        handleFormdata()
                    }}>Process</button>

                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Number source object for context */}
        {
            !isSidebarCollapsed &&
            <div>
                <div className="border-t flex items-center justify-content-center gap-1 text-sm text-gray-500">
                    {currentSourceLenght}
                    {currentSourceLenght == 1 || currentSourceLenght == 0 ?
                    <div>source is</div> : <div>sources are</div>
                    }
                    selected
                </div>
                {
                    !allType ?
                    <div
                    className="cursor-pointer text-sm font-bold"
                    onClick={(e) => {
                        e.stopPropagation()
                        // setCurrentFileList(prev =>
                        //     prev.map(item =>
                        //     item.id === id ? { ...item, isSource: !item.isSource } : item
                        //     )
                        // )
                        setCurrentFileList(prev =>
                            prev.map(item => ({
                                ...item,
                                isSource: true,
                            }))
                        )
                        setAllType(true)
                    }}>
                        Select All
                    </div>
                    : 
                    <div
                    className="cursor-pointer text-sm font-bold"
                    onClick={(e) => {
                        e.stopPropagation()
                        // setCurrentFileList(prev =>
                        //     prev.map(item =>
                        //     item.id === id ? { ...item, isSource: !item.isSource } : item
                        //     )
                        // )
                        setCurrentFileList(prev =>
                            prev.map(item => ({
                                ...item,
                                isSource: false,
                            }))
                        )
                        setAllType(false)
                    }}
                    >Unselect All</div>
                }
            </div>


        }

        

    {
        currentFileList.map((file) => {
            let text = file.extract
            // Convert \n to actual newlines
            const formattedText = text.split('\\n').map((line:any, index:any) => (
                <div key={index}>{line}</div>
            ))

            return (
                <div key={file.id} >
                    {!isSidebarCollapsed ? (
                        <div className="space-y-3 my-2">
                            {
                                selectedFile && file.id == selectedFile ?
                                // yes
                                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <div 
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleToggleSource(file.id)
                                    }}
                                    className={cn("mt-1 ml-1 w-3 h-3 rounded-sm shadow-md",
                                        `${file.isSource ? "bg-green-500" : "bg-gray-500"}`
                                    )}/>
                                    <CardContent className="p-4 w-full">
                                        
                                    <div className="flex items-center justify-content-center">
                                        <h3 className="font-medium text-gray-800 overflow-x-auto">{file.name}</h3>
                                        {
                                            selectedFile !==0 &&
                                            <div className="flex gap-2 ml-auto">
                                                <Dialog>
                                                    {/* <DialogTrigger className="flex items-center justify-content-center bg-gray-200 rounded-xl hover:scale-[1.02]">
                                                        
                                                        <div className="bg-black text-white p-1 rounded-md">
                                                        Preview 
                                                        </div>
                                                    </DialogTrigger>          */}
                                                    <DialogTrigger>
                                                        <div className="p-1 text-white rounded-md bg-red hover:text-black"
                                                            onClick={() => {
                                                                // e.stopPropagation();
                                                                getPresigned(file.key)
                                                                // window.open("https://example.com", "_blank");
                                                            }}
                                                            >
                                                                <ExternalLink className="w-4 h-4"/>
                                                        </div>
                                                    </DialogTrigger>
                                                    <DialogContent className="h-[90%] rounded-xl sm:w-full w-[90%] mx-auto sm:m-0 text-black bg-gray-200 border-none p-1 bg-gray-50 overflow-hidden overflow-x-auto overflow-y-auto scrollbar-hide">
                                                        <DialogTitle className="text-sm font-semibold">{file.name}</DialogTitle>
                                                        <DialogDescription className="">
                                                            {
                                                                presinedURL !== '' && <PreviewPDF File={presinedURL}/>
                                                            }
                                                            {/* <PreviewPDF File={file} /> */}
                                                        </DialogDescription>
                                                    </DialogContent>
                                                </Dialog>
                                                
                                                <div className="p-1 text-white rounded-md bg-red hover:text-black"
                                                onClick={(e) => {
                                                    // console.log('click')
                                                    // setIsSelectedFile(false)
                                                    e.stopPropagation();
                                                    setSelectedFile(0)
                                                }}
                                                >
                                                    <X className="w-4 h-4"/>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {/* <p className="text-sm text-gray-600 mt-1">
                                        <DateFormat utcTime={file.created_at} />
                                    </p> */}
                                    {
                                        file.id == selectedFile && 
                                    <div className="mt-2 whitespace-pre-line bg-gray-200 p-2 rounded-md max-h-200 markdown overflow-x-auto">
                                        {formattedText}
                                    </div>
                                    }
                                    </CardContent>
                                </Card>  
                                :

                                // not
                                <Card className="hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => {
                                    // setIsSelectedFile(true)
                                    // handleIsSelectedFile(isSelectedFile)
                                    setSelectedFile(file.id)

                                }}>
                                    
                                    <div 
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleToggleSource(file.id)
                                    }}
                                    className={cn("mt-1 ml-1 w-3 h-3 rounded-sm shadow-md",
                                        `${file.isSource ? "bg-green-500" : "bg-gray-500"}`
                                    )}/>
                                    

                                    <CardContent className="p-4 w-full">
                                        <div className="flex items-center justify-content-center">
                                            <h3 className="font-medium text-gray-800 overflow-x-auto">{file.name}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            <DateFormat utcTime={file.created_at} />
                                        </p>
                                    </CardContent>
                                </Card>

                            }      
                        </div>
                    ) : (
                        <div className="flex flex-col items-center my-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" enable-background="new 0 0 56 64" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#8C181A" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"></path> <path fill="#6B0D12" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"></path> <path opacity="0.5" fill="#FFFFFF" enable-background="new " d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"></path> </g> <path fill="#FFFFFF" d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"></path> </g></svg>
                            </div>
                        </div>
                    )}
                </div>
            )
        })
    }
        
    </div>
  )
}

export default FileHistory


