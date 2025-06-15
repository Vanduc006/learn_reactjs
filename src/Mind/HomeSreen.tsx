// import React from 'react'

import Upload from "@/components/mind/file/Upload"
import Space from "@/components/mind/space/Space"

const HomeSreen = () => {


  return (
    <div className="mx-auto p-6">
      <h2 className="text-2xl font-bold flex items-center justify-content-center">                  
          <img src="/upload.png" className="w-10 h-10 rounded-xl mr-2"/>        
            Where your knowleagde begin
      </h2>
          
      <h1 className="text-sm block mb-5">Support up to 1GB per space</h1>
      
      <div className="mt-5 mb-10">
        <Upload />
      </div>

      <h2 className="text-2xl font-bold flex items-center justify-content-center mb-1">
        <img src="/space.png" className="w-10 h-10 rounded-xl mr-2"/>
        Your Spaces
      </h2>
      <h1 className="text-sm block mb-5">Keep learning everyday !</h1>

      <Space parent="homescreen" />



    </div>
  )
}

export default HomeSreen