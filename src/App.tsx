
import './global.css'
import { Route, Routes } from 'react-router-dom'

import PhatNguoi from './_root/page/PhatNguoi'
import FetchPhatNguoi from './_root/page/FetchPhatNguoi'
import Mind from './_root/page/Mind'
import NotFound from './_root/page/NotFound'
// import Dashboard from './Mind/page'
import { useUser } from '@clerk/clerk-react'
import MindAuth from './_auth/mind/MindAuth'
import BounceLoader from 'react-spinners/BounceLoader'
import TestGift from './_root/page/TestGift'
import DashLayout from './Mind/DashLayout'
import HomeSreen from './Mind/HomeSreen'
import SpaceLayout from './Mind/SpaceLayout'
// import PhotoBooth from './_root/page/PhotoBooth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className='min-h-screen bg-gray-200 flex flex-col'>
        <div className='flex-1 flex items-center justify-center bg-gray-200 text-black'>
          <img src="/favicon.svg" className="w-8 h-8 rounded-md mr-2"/>
          <div className='text-2xl font-bold flex items-center justify-center'>MIND 
            <BounceLoader size={20} className='ml-2' color='#4871f7'/> 
          </div>
        </div>
      </div>
    )
  }

  return isSignedIn ? <>{children}</> : <MindAuth />;
}

const App = () => {
  // const {user} = useUser()
  return (
  <main className=''> 

    <Routes>
      <Route path="/phatnguoi" element={<PhatNguoi />} />
      <Route path="/fetch" element={<FetchPhatNguoi/>}> </Route>
      <Route path="/mind" element={<Mind/>}> </Route>
      <Route path="/old" element={<Mind/>}> </Route>
      <Route path="*" element={<NotFound/>} ></Route>
      <Route path='/gift' element={<TestGift/>}></Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomeSreen/>} />
        <Route path='/space' element={<SpaceLayout/> } />

      </Route>
      {/* <Route path="/booth" element={<PhotoBooth/>} ></Route> */}
      


    </Routes>
  </main>
  )
}

export default App
