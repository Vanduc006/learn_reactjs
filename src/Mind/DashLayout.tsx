import { SignedIn, UserButton} from "@clerk/clerk-react"

import { Link, Outlet } from "react-router-dom"

const DashLayout = () => {

  return (
    <div className="flex h-screen bg-gray-200 text-gray-900">

      <div className="flex flex-1 flex-col overflow-hidden mx-2">
        <header className="flex h-16 items-center bg-gray-200 ">

          <div className="flex items-center font-bold">
            <Link to={'/'}>

              <h2 className="text-2xl text-black cursor-pointer flex items-center justify-content-center" >
                <img src="/favicon.svg" className="w-8 h-8 rounded-md mr-2"/>
                MIND
              </h2>
            </Link>
              
            

          </div>

          <div className="ml-auto">
            <SignedIn>                    
                  <div className='flex items-center p-1 w-full'>
                      <div className='rounded-md flex items-center justify-center w-full gap-2'>
                          <div className="px-5 py-1 rounded-full bg-black text-white flex items-center justify-center cursor-pointer">
                            
                            Your Plan
                          </div>
                          <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/" afterMultiSessionSingleSignOutUrl='/' /> 

                      </div>                                        
                      
                  </div>                               
              </SignedIn>
          </div>
        </header>

        <main className="flex-1 thin-scrollbar overflow-auto bg-white rounded-lg">
          <Outlet/>
        </main>
        
      </div>
    </div>
  )
}
export default DashLayout