
import './global.css'
import { Route, Routes } from 'react-router-dom'
// import SignInForm from './_auth/form/SignInForm'
// import Home from './_root/page/Home'
// import SignUpForm from './_auth/form/SignUpForm'
// import AuthLayout from './_auth/AuthLayout'
// import RootLayout from './_root/RootLayout'
// import GenImage from './_root/page/GenImage'
import PhatNguoi from './_root/page/PhatNguoi'
import FetchPhatNguoi from './_root/page/FetchPhatNguoi'
import Mind from './_root/page/Mind'
import NotFound from './_root/page/NotFound'
import Dashboard from './_root/page/Mind/page'
import { useUser } from '@clerk/clerk-react'
import MindAuth from './_auth/mind/MindAuth'
import BounceLoader from 'react-spinners/BounceLoader'
// import PhotoBooth from './_root/page/PhotoBooth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className='min-h-screen bg-gray-200 flex flex-col'>
        <div className='flex-1 flex items-center justify-center bg-gray-200 text-black'>
          <div className='text-2xl font-bold flex items-center justify-center'>MIND <BounceLoader size={20} className='ml-2' color='#4871f7'/> </div>
        </div>
      </div>
    )
  }

  return isSignedIn ? <>{children}</> : <MindAuth />;
}

const App = () => {
  const {user} = useUser()
  return (
  <main className=''> 

    <Routes>
      
      {/* <Route element={<AuthLayout/>}>
        <Route path='sign-in' element={<SignInForm/>}/>
        
        <Route path='sign-up' element={<SignUpForm/>}/>
      </Route>
  
      
      <Route element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='gen-pic' element={<GenImage/>}/>
        
      </Route> */}

      <Route path="/phatnguoi" element={<PhatNguoi />} />
      <Route path="/fetch" element={<FetchPhatNguoi/>}> </Route>
      <Route path="/mind" element={<Mind/>}> </Route>
      <Route path="/" element={<Mind/>}> </Route>
      <Route path="*" element={<NotFound/>} ></Route>
      
      <Route
        path="/ver2"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/booth" element={<PhotoBooth/>} ></Route> */}
      


    </Routes>
  </main>
  )
}

export default App
