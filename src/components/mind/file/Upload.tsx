
import React, { useRef, useState } from "react";
import PreviewAudio from "./PreviewAudio";
// import PreviewPDF from "./PreviewPDF";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';
import PreviewVideo from "./PreviewVideo";
import PreviewPDF from "./PreviewPDF";
import PreviewImage from "./PreviewImage";
import WrongFile from "./WrongFile";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from 'uuid';
import S3Storage from "@/services/AWS/S3Storage";
import DotLoader from 'react-spinners/DotLoader'
import { Plus } from "lucide-react";
import { newSpace } from "@/services/Supabase/SpaceList";
import { useMind } from "@/context/MindProvider";
import { useNavigate } from "react-router-dom";
// import ProgressBar from "@ramonak/react-progress-bar";
// type UploadProps = {
//     setTab: React.Dispatch<React.SetStateAction<string | null>>;
// };
const Upload = (
    // {setTab} : UploadProps
) => {
    const { user } = useUser()
    const navigate = useNavigate()
    const { setCurrentSpace,currentSpace } = useMind()
    // const animatedComponents = makeAnimated();
    // const list_languages_sp = [
    //     {"value":"Auto","label":'🤖 MIND detect'},
    //     {"value":"VN","label":"🇻🇳 Vietnam"},
    //     { "value": "CN", "label": "🇨🇳 China" },
    //     { "value": "EN", "label": "🇬🇧 English" },
    //     { "value": "FR", "label": "🇫🇷 France" },
    //     { "value": "JP", "label": "🇯🇵 Japan" },
    //     { "value": "TH", "label": "🇹🇭 Thailand" },
    //     { "value": "DE", "label": "🇩🇪 Đức" },
    //     { "value": "ES", "label": "🇪🇸 Tây Ban Nha" }
    // ]
    const [currentFileType, setCurrentFileType] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [filesLeft, setFilesLeft] = useState<number>(10)
    const [wrongFiles, setWrongFiles ] = useState<File[]>([])
    const [totalSize, setTotalSize ] = useState<number>(1048576)
    const [uploadDialog,setUploadDialog] = useState<boolean>(false)

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

    console.log(currentFileType)
    console.log(filesLeft)

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prev => {
          const newFiles = prev.filter((_, i) => i !== index);
          
          // Bonus: Nếu không còn file nào, reset luôn currentFileType
          if (newFiles.length === 0) {
            setCurrentFileType(null);
          }
      
          return newFiles;
        });
      
        setFilesLeft(prev => prev + 1);
    };

    const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        setWrongFiles([])
        // console.log(files)
        if ( files && currentFileType) {
            Array.from(files).map(file => {
                if ( !file.type.includes(currentFileType) ) {
                    // console.log(currentFileType)
                    // console.log(file.type)
                    setWrongFiles((prev) => [...prev,file])
                    return
                }
                setSelectedFiles((prev) => [...prev,file])
                // console.log(file.size)
                setTotalSize(totalSize - file.size)
                
            })
            // console.log(selectedFiles)
        }
        
        
    }
    // const [uploadStatus, setUploadStatus] = useState<string>('waiting respone')
    const handleFormdata = async() => {
        try {
            const generatedID = `${genSpaceID()}`;
            setCurrentSpace(generatedID)
            await handleNewSpace(generatedID);     
        } catch (error) {
            console.log('Create new space fail !')
            return
        }
        // set current space to new ID

        setUploadDialog(true)
        selectedFiles.forEach(async (file,index) => {
            // n = n + 1
            
            const formData = new FormData()
            
            let fileKey = user?.id + '/' + uuidv4() + '-' + file.name
            fileKey = fileKey.replace(/\s/g, '')
            
            const data = await S3Storage(currentSpace,fileKey,formatFileSize(file.size),"60")
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
        });


    }
    const handleUploadDialogChange = () => {
        setUploadDialog(!uploadDialog)
    }

    // const handleTest = async() => {
    //     try {
    //         const respone = await fetch('https://psychic-palm-tree-9gq4p4wqpgq3pwxq-3000.app.github.dev/upload', {
    //             method : "GET",
    //             credentials: 'include',
    //         })
    //         const data = await respone.json()
    //         console.log(data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    function formatFileSize(bytes: number): string {
        if (bytes === 0) return "0 Bytes"
      
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
      
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    const genSpaceID = () => {
        return Math.floor(10000000 + Math.random() * 90000000);
    }

    const handleNewSpace = async(id : string) => {
        // const newID = genSpaceID()
        await newSpace(user?.id,"United Space",`${id}`)
        // setCurrentSpace(`${newID}`)
    }

    // const handleOpenSpace = () => {
    //     if (currentSpace) {
    //         navigate(`/space?id=${currentSpace}`)
    //     }
    // }

  return (
    <div>
        <div className="cursor-pointer text-sm text-white flex gap-2 mt-5 overflow-y-auto scrollbar-hide rounded-full">
            <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={handleFileChange}
            />
            <div 
            onClick={() => {
                handleUpload("pdf")
                // handleNewSpace()
            }}
            className="gap-2 flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-gray-200 text-black rounded-full text-sm ">
                {/* <svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" enable-background="new 0 0 56 64" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#8C181A" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"></path> <path fill="#6B0D12" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"></path> <path opacity="0.5" fill="#FFFFFF" enable-background="new " d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"></path> </g> <path fill="#FFFFFF" d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"></path> </g></svg> */}
                <Plus className="w-4 h-4"/>
                Create new
            </div>

            {/* <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-gray-200 text-black rounded-full text-sm">
            <svg className="w-5 h-5 mr-2"viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.112.011c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.272 5.074 5.073 5.074h45.775c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.904-20.31h-31.945z" fill-rule="evenodd" clip-rule="evenodd" fill="#3C8CEA"></path> <path d="M10.133 37.439h21.564v2.059h-21.564zm0 4.801h21.564v2.057h-21.564zm0 4.801h21.564v2.057h-21.564zm0 4.8h12.233v2.058h-12.233z" fill="#ffffff"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.96 20.377v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#2D6FE4"></path> <path d="M37.058.025v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> </g></svg>
                Documents
            </div>

            <div 
            onClick={() => {
                handleUpload("audio")
            }}
            className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-gray-200 text-black rounded-full text-sm">
                <svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.151.012c-2.802 0-5.073 2.272-5.073 5.073v53.842c0 2.802 2.272 5.073 5.073 5.073h45.774c2.803 0 5.075-2.271 5.075-5.073v-38.606l-18.903-20.309h-31.946z" fill="#379FD3"></path> <path d="M56 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z" fill="#2987C8"></path> <path d="M37.097.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z" opacity=".5" fill="#ffffff"></path> <path d="M29.798 34.036l-14.165 1.814v13.438c-.738-.205-1.628-.243-2.531-.064-2.009.394-3.325 1.702-2.938 2.918.386 1.215 2.325 1.88 4.333 1.48 1.764-.348 2.994-1.397 3.005-2.473h.002v-10.74l10.422-1.288v8.306c-.75-.212-1.655-.251-2.572-.068-2.03.399-3.357 1.718-2.969 2.947.389 1.229 2.35 1.897 4.379 1.499 1.849-.366 3.116-1.494 3.031-2.621v-15.148z" fill="#ffffff"></path> </g> </g></svg>
                Records
            </div>

            <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-gray-200 text-black rounded-full text-sm">
                <svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.15.011c-2.801 0-5.072 2.272-5.072 5.074v53.841c0 2.803 2.272 5.074 5.072 5.074h45.775c2.802 0 5.075-2.271 5.075-5.074v-38.606l-18.904-20.309h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#8E4C9E"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#713985"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M24.531 45.529c0 .368-.163.736-.449.981-.205.163-5.255 4.417-11.839 7.095-.164.062-.327.103-.511.103-.225 0-.47-.062-.675-.184-.348-.205-.593-.573-.613-.981-.021-.144-.307-3.456-.307-7.014s.286-6.87.307-6.993c.021-.408.266-.776.613-1.002.205-.122.43-.184.675-.184.164 0 .348.041.511.103 6.584 2.678 11.634 6.932 11.839 7.115.286.225.449.593.449.961z" fill="#ffffff"></path> </g></svg>
                Videos
            </div>

            <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-gray-200 text-black rounded-full text-sm">
                <svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.106 0c-2.802 0-5.073 2.272-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.903-20.31h-31.945z" fill-rule="evenodd" clip-rule="evenodd" fill="#45B058"></path> <path d="M20.306 43.197c.126.144.198.324.198.522 0 .378-.306.72-.703.72-.18 0-.378-.072-.504-.234-.702-.846-1.891-1.387-3.007-1.387-2.629 0-4.627 2.017-4.627 4.88 0 2.845 1.999 4.879 4.627 4.879 1.134 0 2.25-.486 3.007-1.369.125-.144.324-.233.504-.233.415 0 .703.359.703.738 0 .18-.072.36-.198.504-.937.972-2.215 1.693-4.015 1.693-3.457 0-6.176-2.521-6.176-6.212s2.719-6.212 6.176-6.212c1.8.001 3.096.721 4.015 1.711zm6.802 10.714c-1.782 0-3.187-.594-4.213-1.495-.162-.144-.234-.342-.234-.54 0-.361.27-.757.702-.757.144 0 .306.036.432.144.828.739 1.98 1.314 3.367 1.314 2.143 0 2.827-1.152 2.827-2.071 0-3.097-7.112-1.386-7.112-5.672 0-1.98 1.764-3.331 4.123-3.331 1.548 0 2.881.467 3.853 1.278.162.144.252.342.252.54 0 .36-.306.72-.703.72-.144 0-.306-.054-.432-.162-.882-.72-1.98-1.044-3.079-1.044-1.44 0-2.467.774-2.467 1.909 0 2.701 7.112 1.152 7.112 5.636.001 1.748-1.187 3.531-4.428 3.531zm16.994-11.254l-4.159 10.335c-.198.486-.685.81-1.188.81h-.036c-.522 0-1.008-.324-1.207-.81l-4.142-10.335c-.036-.09-.054-.18-.054-.288 0-.36.323-.793.81-.793.306 0 .594.18.72.486l3.889 9.992 3.889-9.992c.108-.288.396-.486.72-.486.468 0 .81.378.81.793.001.09-.017.198-.052.288z" fill="#ffffff"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M56.001 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z" fill="#349C42"></path> <path d="M37.098.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z" opacity=".5" fill="#ffffff"></path> </g> </g></svg>
                CSV 
                <svg className="ml-2 w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.112.006c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#45B058"></path><path d="M19.429 53.938c-.216 0-.415-.09-.54-.27l-3.728-4.97-3.745 4.97c-.126.18-.324.27-.54.27-.396 0-.72-.306-.72-.72 0-.144.035-.306.144-.432l3.89-5.131-3.619-4.826c-.09-.126-.145-.27-.145-.414 0-.342.288-.72.721-.72.216 0 .432.108.576.288l3.438 4.628 3.438-4.646c.127-.18.324-.27.541-.27.378 0 .738.306.738.72 0 .144-.036.288-.127.414l-3.619 4.808 3.891 5.149c.09.126.125.27.125.414 0 .396-.324.738-.719.738zm9.989-.126h-5.455c-.595 0-1.081-.486-1.081-1.08v-10.317c0-.396.324-.72.774-.72.396 0 .721.324.721.72v10.065h5.041c.359 0 .648.288.648.648 0 .396-.289.684-.648.684zm6.982.216c-1.782 0-3.188-.594-4.213-1.495-.162-.144-.234-.342-.234-.54 0-.36.27-.756.702-.756.144 0 .306.036.433.144.828.738 1.98 1.314 3.367 1.314 2.143 0 2.826-1.152 2.826-2.071 0-3.097-7.111-1.386-7.111-5.672 0-1.98 1.764-3.331 4.123-3.331 1.548 0 2.881.468 3.853 1.278.162.144.253.342.253.54 0 .36-.307.72-.703.72-.145 0-.307-.054-.432-.162-.883-.72-1.98-1.044-3.079-1.044-1.44 0-2.467.774-2.467 1.909 0 2.701 7.112 1.152 7.112 5.636 0 1.748-1.188 3.53-4.43 3.53z" fill="#ffffff"></path><path d="M55.953 20.352v1h-12.801s-6.312-1.26-6.127-6.707c0 0 .207 5.707 6.002 5.707h12.926z" fill-rule="evenodd" clip-rule="evenodd" fill="#349C42"></path><path d="M37.049 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.801l-18.905-20.352z" opacity=".5" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"></path></g></svg>
                XLS
            </div>

            <div 
            className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-gray-200 text-black rounded-full text-sm">
                <svg className="w-5 h-5 mr-2" viewBox="0 -7 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Youtube-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-200.000000, -368.000000)" fill="#CE1312"> <path d="M219.044,391.269916 L219.0425,377.687742 L232.0115,384.502244 L219.044,391.269916 Z M247.52,375.334163 C247.52,375.334163 247.0505,372.003199 245.612,370.536366 C243.7865,368.610299 241.7405,368.601235 240.803,368.489448 C234.086,368 224.0105,368 224.0105,368 L223.9895,368 C223.9895,368 213.914,368 207.197,368.489448 C206.258,368.601235 204.2135,368.610299 202.3865,370.536366 C200.948,372.003199 200.48,375.334163 200.48,375.334163 C200.48,375.334163 200,379.246723 200,383.157773 L200,386.82561 C200,390.73817 200.48,394.64922 200.48,394.64922 C200.48,394.64922 200.948,397.980184 202.3865,399.447016 C204.2135,401.373084 206.612,401.312658 207.68,401.513574 C211.52,401.885191 224,402 224,402 C224,402 234.086,401.984894 240.803,401.495446 C241.7405,401.382148 243.7865,401.373084 245.612,399.447016 C247.0505,397.980184 247.52,394.64922 247.52,394.64922 C247.52,394.64922 248,390.73817 248,386.82561 L248,383.157773 C248,379.246723 247.52,375.334163 247.52,375.334163 L247.52,375.334163 Z" id="Youtube"> </path> </g> </g> </g></svg>
                Youtube
            </div>


            <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-gray-200 text-black rounded-full text-sm">
                <svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.125.042c-2.801 0-5.072 2.273-5.072 5.074v53.841c0 2.803 2.271 5.073 5.072 5.073h45.775c2.801 0 5.074-2.271 5.074-5.073v-38.604l-18.904-20.311h-31.945z" fill="#49C9A7"></path> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#37BB91"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M10.119 53.739v-20.904h20.906v20.904h-20.906zm18.799-18.843h-16.691v12.6h16.691v-12.6zm-9.583 8.384l3.909-5.256 1.207 2.123 1.395-.434.984 5.631h-13.082l3.496-3.32 2.091 1.256zm-3.856-3.64c-.91 0-1.649-.688-1.649-1.538 0-.849.739-1.538 1.649-1.538.912 0 1.65.689 1.65 1.538 0 .85-.738 1.538-1.65 1.538z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"></path> </g></svg>
                Images
            </div>

            <div className="flex items-center justify-center pl-5 pr-5 pt-2 pb-2 bg-gray-200 text-black rounded-full text-sm">
                <svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.112-.004c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#E34221"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#DC3119"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M14.964 49.011h-3.331v4.141c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.298c0-.594.486-1.081 1.08-1.081h3.745c2.413 0 3.763 1.657 3.763 3.619 0 1.963-1.387 3.619-3.763 3.619zm-.181-5.906h-3.15v4.573h3.15c1.423 0 2.395-.936 2.395-2.287 0-1.349-.972-2.286-2.395-2.286zm11.197 5.906h-3.332v4.141c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.298c0-.594.486-1.081 1.08-1.081h3.746c2.412 0 3.763 1.657 3.763 3.619 0 1.963-1.387 3.619-3.763 3.619zm-.18-5.906h-3.151v4.573h3.151c1.423 0 2.395-.936 2.395-2.287-.001-1.349-.972-2.286-2.395-2.286zm14.112 0h-3.277v10.047c0 .414-.324.738-.756.738-.414 0-.738-.324-.738-.738v-10.047h-3.259c-.36 0-.647-.288-.647-.684 0-.361.287-.648.647-.648h8.03c.36 0 .648.288.648.685.001.359-.288.647-.648.647z" fill="#ffffff"></path> </g></svg>
                Slides
            </div> */}
        </div>
        <div className=" mt-2">
        {/* <div className="flex text-white ">
            <div className="font-bold text-xl">
                Create new
            </div>
            
            <div className="sm:ml-auto mt-2 sm:w-fit w-full">
                <div className="text-black flex font-semibold sm:w-fit w-full">
                    <Select
                        className='border-none bg-gray-200 rounded-full sm:w-fit w-full'
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[list_languages_sp[0]]}
                        // isMulti
                        options={list_languages_sp}
                    />
                </div>
            </div>
        </div> */}
        {/* <div className="text-sm text-white  mt-2">
            
            <ProgressBar 
                completed={60}
                bgColor="#000"
                height="15px"
                borderRadius="20px"
                baseBgColor="#ffffff"
                labelColor="#ffffff"
                animateOnRender
                maxCompleted={100}
            />
        </div> */}

        

        <div className="">
            { wrongFiles.length > 0 && 
                <div>
                    {currentFileType && <WrongFile numfile={wrongFiles.length}/>}  
                </div>
            }

            { selectedFiles.length > 0 &&       
                <div className="text-sm bg-gray-200 rounded-xl mt-2 p-2">
                    
                    {selectedFiles.map((file,index) => {
           
                        return (
                            <div key={index}>
                                {/* {file.name} */}
                                <div className="p-1">
                                    <div className="flex items-center">
                                        <div className="flex font-semibold "> 
                                            {file.type.includes("pdf") && (<svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" enable-background="new 0 0 56 64" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#8C181A" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"></path> <path fill="#6B0D12" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"></path> <path opacity="0.5" fill="#FFFFFF" enable-background="new " d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"></path> </g> <path fill="#FFFFFF" d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"></path> </g></svg>)}
                                            {file.type.includes("audio") && (<svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.151.012c-2.802 0-5.073 2.272-5.073 5.073v53.842c0 2.802 2.272 5.073 5.073 5.073h45.774c2.803 0 5.075-2.271 5.075-5.073v-38.606l-18.903-20.309h-31.946z" fill="#379FD3"></path> <path d="M56 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z" fill="#2987C8"></path> <path d="M37.097.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z" opacity=".5" fill="#ffffff"></path> <path d="M29.798 34.036l-14.165 1.814v13.438c-.738-.205-1.628-.243-2.531-.064-2.009.394-3.325 1.702-2.938 2.918.386 1.215 2.325 1.88 4.333 1.48 1.764-.348 2.994-1.397 3.005-2.473h.002v-10.74l10.422-1.288v8.306c-.75-.212-1.655-.251-2.572-.068-2.03.399-3.357 1.718-2.969 2.947.389 1.229 2.35 1.897 4.379 1.499 1.849-.366 3.116-1.494 3.031-2.621v-15.148z" fill="#ffffff"></path> </g> </g></svg>)}
                                            {file.type.includes("video") && (<svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.15.011c-2.801 0-5.072 2.272-5.072 5.074v53.841c0 2.803 2.272 5.074 5.072 5.074h45.775c2.802 0 5.075-2.271 5.075-5.074v-38.606l-18.904-20.309h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#8E4C9E"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#713985"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M24.531 45.529c0 .368-.163.736-.449.981-.205.163-5.255 4.417-11.839 7.095-.164.062-.327.103-.511.103-.225 0-.47-.062-.675-.184-.348-.205-.593-.573-.613-.981-.021-.144-.307-3.456-.307-7.014s.286-6.87.307-6.993c.021-.408.266-.776.613-1.002.205-.122.43-.184.675-.184.164 0 .348.041.511.103 6.584 2.678 11.634 6.932 11.839 7.115.286.225.449.593.449.961z" fill="#ffffff"></path> </g></svg>)}
                                            {file.type.includes("image") && (<svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.125.042c-2.801 0-5.072 2.273-5.072 5.074v53.841c0 2.803 2.271 5.073 5.072 5.073h45.775c2.801 0 5.074-2.271 5.074-5.073v-38.604l-18.904-20.311h-31.945z" fill="#49C9A7"></path> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#37BB91"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M10.119 53.739v-20.904h20.906v20.904h-20.906zm18.799-18.843h-16.691v12.6h16.691v-12.6zm-9.583 8.384l3.909-5.256 1.207 2.123 1.395-.434.984 5.631h-13.082l3.496-3.32 2.091 1.256zm-3.856-3.64c-.91 0-1.649-.688-1.649-1.538 0-.849.739-1.538 1.649-1.538.912 0 1.65.689 1.65 1.538 0 .85-.738 1.538-1.65 1.538z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"></path> </g></svg>)}
                                            
                                            
                                            {file.name}
                                        </div>

                                        <div className="gap-2 ml-auto flex items-center justify-content-center">
                                            <Dialog>
                                                <DialogTrigger className="flex items-center justify-content-center bg-gray-200 rounded-xl hover:scale-[1.02]">
                                                    
                                                    <div className="bg-black text-white p-1 rounded-md">
                                                    Preview 
                                                    </div>

                                                </DialogTrigger>
                                                {file.type.includes("pdf") && (
                                                    <DialogContent className="h-[90%] rounded-xl sm:w-full w-[90%] mx-auto sm:m-0 text-black bg-gray-200 border-none p-1 bg-gray-50 overflow-hidden overflow-x-auto overflow-y-auto scrollbar-hide">
                                                        <DialogTitle className="text-sm font-semibold">{file.name}</DialogTitle>
                                                        <DialogDescription className="">
                                                            <PreviewPDF File={file} />
                                                        </DialogDescription>

                                                    </DialogContent>
                                                )}

                                                {file.type.includes("image") && (
                                                    <DialogContent className="h-[90%] sm:w-full w-[90%] mx-auto sm:m-0 text-black bg-gray-200 border-none p-1 bg-gray-50 overflow-hidden overflow-x-auto overflow-y-auto scrollbar-hide">
                                                        <DialogTitle className="text-sm font-semibold">{file.name}</DialogTitle>
                                                        <DialogDescription className="">
                                                            <PreviewImage File={file} />
                                                        </DialogDescription>
                                                    </DialogContent>
                                                )}
                    
                                                {file.type.includes("audio") && (
                                                    <DialogContent className="sm:w-full w-[90%] mx-auto sm:m-0 rounded-md text-black bg-gray-200 border-none p-1 bg-gray-50 overflow-hidden overflow-x-auto overflow-y-auto scrollbar-hide">
                                                        <DialogTitle className="text-sm font-semibold">{file.name}</DialogTitle>
                                                        <DialogDescription className="">
                                                            <div className="rounded-xl">
                                                                <PreviewAudio File={file} />
                                                                {/* <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-auto" /> */}
                                                            </div>
                                                        </DialogDescription>
                                                    </DialogContent>
                                                )}

                                                {file.type.includes("video") && (
                                                    <DialogContent className="sm:w-full h-[90%] w-[90%] mx-auto sm:m-0 rounded-md text-black bg-gray-200 border-none p-1 bg-gray-50 overflow-hidden overflow-x-auto overflow-y-auto scrollbar-hide">
                                                        <DialogTitle className="text-sm font-semibold">{file.name}</DialogTitle>
                                                        <DialogDescription className="">
                                                            <div className="rounded-xl overflow-y-auto scrollbar-hide ">
                                                                <PreviewVideo File={file} />
                                                                {/* <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-auto" /> */}
                                                            </div>
                                                        </DialogDescription>
                                                    </DialogContent>
                                                )}


                                            </Dialog>
                                            <div 
                                            onClick={() => handleRemoveFile(index)}
                                            className="p-1 bg-red cursor-pointer rounded-md text-white">
                                                Remove
                                            </div>
                                        
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-gray-500">
                                        {formatFileSize(file.size)}
                                    </div>

                                </div>

                            </div>             
                        )
                    })}
                </div>
            }
        </div>



        <Dialog open={uploadDialog} onOpenChange={() => {handleUploadDialogChange()}}>
            <DialogContent className="mx-auto bg-white text-black max-h-[50%] overflow-auto scrollbar-hide">
                <div className="font-bold border-b">Uploading progress</div>
                { selectedFiles.length > 0 &&       
                <div className="text-sm">
                    
                    {selectedFiles.map((file,index) => {
           
                        return (
                            <div key={index}>
                                {/* {file.name} */}
                                <div className="mb-2">
                                    <div className="flex items-center">
                                        <DotLoader size={20} className='mr-2' color='#4871f7'/> 

                                        <div className="flex font-semibold "> 
                                            {file.type.includes("pdf") && (<svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64" enable-background="new 0 0 56 64" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#8C181A" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"></path> <path fill="#6B0D12" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"></path> <path opacity="0.5" fill="#FFFFFF" enable-background="new " d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"></path> </g> <path fill="#FFFFFF" d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"></path> </g></svg>)}
                                            {file.type.includes("audio") && (<svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.151.012c-2.802 0-5.073 2.272-5.073 5.073v53.842c0 2.802 2.272 5.073 5.073 5.073h45.774c2.803 0 5.075-2.271 5.075-5.073v-38.606l-18.903-20.309h-31.946z" fill="#379FD3"></path> <path d="M56 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z" fill="#2987C8"></path> <path d="M37.097.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z" opacity=".5" fill="#ffffff"></path> <path d="M29.798 34.036l-14.165 1.814v13.438c-.738-.205-1.628-.243-2.531-.064-2.009.394-3.325 1.702-2.938 2.918.386 1.215 2.325 1.88 4.333 1.48 1.764-.348 2.994-1.397 3.005-2.473h.002v-10.74l10.422-1.288v8.306c-.75-.212-1.655-.251-2.572-.068-2.03.399-3.357 1.718-2.969 2.947.389 1.229 2.35 1.897 4.379 1.499 1.849-.366 3.116-1.494 3.031-2.621v-15.148z" fill="#ffffff"></path> </g> </g></svg>)}
                                            {file.type.includes("video") && (<svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.15.011c-2.801 0-5.072 2.272-5.072 5.074v53.841c0 2.803 2.272 5.074 5.072 5.074h45.775c2.802 0 5.075-2.271 5.075-5.074v-38.606l-18.904-20.309h-31.946z" fill-rule="evenodd" clip-rule="evenodd" fill="#8E4C9E"></path> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#713985"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M24.531 45.529c0 .368-.163.736-.449.981-.205.163-5.255 4.417-11.839 7.095-.164.062-.327.103-.511.103-.225 0-.47-.062-.675-.184-.348-.205-.593-.573-.613-.981-.021-.144-.307-3.456-.307-7.014s.286-6.87.307-6.993c.021-.408.266-.776.613-1.002.205-.122.43-.184.675-.184.164 0 .348.041.511.103 6.584 2.678 11.634 6.932 11.839 7.115.286.225.449.593.449.961z" fill="#ffffff"></path> </g></svg>)}
                                            {file.type.includes("image") && (<svg className="w-5 h-5 mr-2" viewBox="-4 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd" clip-rule="evenodd"> <path d="M5.125.042c-2.801 0-5.072 2.273-5.072 5.074v53.841c0 2.803 2.271 5.073 5.072 5.073h45.775c2.801 0 5.074-2.271 5.074-5.073v-38.604l-18.904-20.311h-31.945z" fill="#49C9A7"></path> <path d="M55.977 20.352v1h-12.799s-6.312-1.26-6.129-6.707c0 0 .208 5.707 6.004 5.707h12.924z" fill="#37BB91"></path> <path d="M37.074 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.799l-18.903-20.352z" opacity=".5" fill="#ffffff"></path> </g> <path d="M10.119 53.739v-20.904h20.906v20.904h-20.906zm18.799-18.843h-16.691v12.6h16.691v-12.6zm-9.583 8.384l3.909-5.256 1.207 2.123 1.395-.434.984 5.631h-13.082l3.496-3.32 2.091 1.256zm-3.856-3.64c-.91 0-1.649-.688-1.649-1.538 0-.849.739-1.538 1.649-1.538.912 0 1.65.689 1.65 1.538 0 .85-.738 1.538-1.65 1.538z" fill-rule="evenodd" clip-rule="evenodd" fill="#ffffff"></path> </g></svg>)}

                                            {file.name}
                                        </div>

                                    </div>
                                    {/* <div className="text-sm font-bold text-gray-500">
                                        {formatFileSize(file.size)}
                                    </div> */}

                                </div>

                            </div>             
                        )
                    })}
                </div>
            }
            
            <div className="px-5 pt-2 pb-2 bg-gray-200 text-sm font-bold w-fit rounded-md cursor-pointer hover:bg-gray-500 hover:text-white hover:scale-[1.09]"
            onClick={(e:any) => {
                console.log('Navigate to:', currentSpace)
                e.stopPropagation()
                navigate(`/space?id=${currentSpace}`)
                // handleUploadDialogChange()
                // handleOpenSpace()
                
                // setTab('chat')
            }}
            >Open Space</div>
            

            </DialogContent>
        </Dialog>

        {/* { uploadStatus == 'waiting respone' && 
        <div className="text-black">
            {uploadStatus}
        </div>}  */}



    </div>
    {selectedFiles.length > 0 &&         
        <div className="bg-[#4871f7] font-semibold text-sm cursor-pointer p-2 text-white mt-2 rounded-md w-fit text-black w-fit ml-auto" 
            onClick={() => handleFormdata()}>
            Upload & Create space
        </div>

    }
    </div>
    
  )
}

export default Upload