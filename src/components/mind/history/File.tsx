import FileList from "@/services/Supabase/FileList"
import DateFormat from "@/components/mind/DateFormat"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { ExternalLink, Plus, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import PreviewPDF from "../file/PreviewPDF"

interface File {
    currentSpace : string,
    isSidebarCollapsed : boolean,
    handleIsSelectedFile : (value : boolean) => void,
}
const FileHistory = ({ currentSpace,isSidebarCollapsed,handleIsSelectedFile } : File) => {
    const [currentFileList,setCurrentFileList] = useState<any[]>([])
    // const [isSelectedFile,setIsSelectedFile] = useState<boolean>(false)
    const [selectedFile,setSelectedFile] = useState<number>(0)
    // const [selectedFileURL,setSelectedFileURL] = useState<string>('')
    
    useEffect(() => {
        const getFileList = async() => {
            const data = await FileList(currentSpace)
            setCurrentFileList(data)
        }
        getFileList()
    },[])

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

  return (
    <div className="h-full">
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
                        <div className="space-y-3">
                            {
                                selectedFile && file.id == selectedFile ?
                                // yes
                                <Card className="hover:shadow-md transition-shadow cursor-pointer">
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
                                    <div className="mt-2 whitespace-pre-line bg-gray-200 p-2 rounded-md max-h-">
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
                        <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" enable-background="new 0 0 56 64" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#8C181A" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"></path> <path fill="#6B0D12" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"></path> <path opacity="0.5" fill="#FFFFFF" enable-background="new " d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"></path> </g> <path fill="#FFFFFF" d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"></path> </g></svg>
                        </div>
                        </div>
                    )}
                </div>
            )
        })
    }
        {
            !selectedFile && !isSidebarCollapsed &&
            <Card className="hover:shadow-md transition-shadow cursor-pointer mt-5">
                <CardContent className="p-2 w-full">
                    <div className="flex items-center justify-content-center">
                        <h3 className="font-medium text-gray-800 overflow-x-auto">Add Object</h3>
                        <Plus className="w-4 h-4 ml-auto"/>
                    </div>
                </CardContent>
            </Card>
        }
    </div>
  )
}

export default FileHistory