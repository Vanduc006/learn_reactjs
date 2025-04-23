
import { useEffect } from "react"
import { ToastContainer, Zoom, toast } from 'react-toastify';

const WrongFile = ({numfile} : {numfile : number}) => {
    let content = ''
    // console.log(numfile)
    // const [content,setContent] = useState<string>('error with toast')
    if (numfile > 1) {
        content = numfile + " files are wrong"
        return
    }
    
    content = numfile + " file is wrong"
    useEffect(() => {
        console.log('show')
        toast.error(content, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Zoom,
        });
    })
  return (<ToastContainer

    position="top-center"
    autoClose={1000}
    limit={5}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition={Zoom}
    />)
}

export default WrongFile