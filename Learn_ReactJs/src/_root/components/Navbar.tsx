import { Button } from "@/components/ui/button"
import { FaBars } from "react-icons/fa6";
import React, { useState } from 'react'

const Navbar = () => {
  let Links =[
    {name:"Tạo ảnh",link:"/#"},
    {name:"Khám phá",link:"/#"},
    {name:"Nhiều hơn",link:"/#"},
    {name:"Tài khoản",link:"/#"},
  ];
  let [open,setOpen]=useState(false);
return (

    <div className='md:flex items-center justify-between py-4 md:px-10 px-7 bg-white'>
      <div className='font-bold text-2xl cursor-pointer flex items-center'>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
        </span>
        IMASIS
      </div>
      
      <div onClick={()=>setOpen(!open)} className='absolute right-8 top-3 cursor-pointer md:hidden'>
        <Button name={open ? 'close':'menu'}><FaBars /></Button>     
      </div>
      
      <ul className={`md:flex md:items-center md:pb-0 pb-12 md:bg-white bg-slate-100 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        {
          Links.map((link)=>(
            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
              
              <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
            </li>
          ))
        }
        
        <a href="sign-in" className='md:ml-8 md:my-0'>
        <Button >Login</Button>
        </a>
      </ul>
      

    </div>

)
}

export default Navbar