
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
// import PhotoBooth from './_root/page/PhotoBooth'

const App = () => {

  return (
  <main className='flex h-screen'> 

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
      {/* <Route path="/booth" element={<PhotoBooth/>} ></Route> */}
      


    </Routes>
  </main>
  )
}

export default App
