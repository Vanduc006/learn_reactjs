import { useState } from 'react';
// import Earth from '@/components/uilayout/globe';
// import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
// import TypingAnimation from '@/components/ui/typing-animation';
// import { RandomizedTextEffect } from '@/components/uilayout/text-randomized';
// import Blocks from '@/components/uilayout/beam';
import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Car } from 'lucide-react';
import { CarFront } from 'lucide-react';
import { Bike } from 'lucide-react';
import { Zap } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Github } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Linkedin } from 'lucide-react';
// import { Wallet } from 'lucide-react';
// import { ShieldAlert } from 'lucide-react';
// import { ReactLenis } from 'lenis/react';
import smoothscroll from 'smoothscroll-polyfill';
// import ScrollElement from '@/components/uilayout/scroll-element';
import { ScrollArea } from '@/components/ui/scroll-area';
// import Ripple from '@/components/ui/ripple';
// import { WarpBackground } from '@/components/ui/warp-background';
import SparklesText from '@/components/ui/sparkles-text';
// import ScrollProgress from '@/components/ui/scroll-progress';
// import ShineBorder from '@/components/ui/shine-border';
// import FetchPhatNguoi from './FetchPhatNguoi';
// import { Badge } from "@/components/ui/badge"
import Marquee from "react-fast-marquee";
import React from 'react';
// import { string } from 'zod';

// import axios from "axios";

// Initialize smooth scroll polyfill
smoothscroll.polyfill();

type ViolationType = {
  trang_thai: string;
  bien_kiem_sat: string;
  mau_bien: string;
  loai_phuong_tien: string;
  thoi_gian_vi_pham: string;
  dia_diem_vi_pham: string;
  hanh_vi_vi_pham: string | null;
  don_vi_phat_hien_vi_pham: string;
  noi_giai_quyet_vu_viec: string;
  so_dien_thoai: string;
  muc_phat?: string; // Optional because it's not present in all violations
};

type DataType = {
  biensoxe: string;
  totalViolations: number;
  is_new: boolean;
  handledCount: number;
  unhandledCount: number;
  updated_at: string;
  violations: ViolationType[];
  attempts: null | number;
  mdk: null | string;
  maubien: null | string;
  data_dangkiem: null | string;
  code: '1' | number;
};

// type Whatcode = {
//   code: string;
// }
// async function GetData() {
//   // try {
//   //   const response = await fetch('https://ducvan-backend.onrender.com/phatnguoi?bienso=63B02028');
//   //   if (!response.ok) {
//   //       throw new Error(`HTTP error! Status: ${response.status}`);
//   //   }
//   //   const data = await response.json() // Assuming the server returns JSON
//   //   console.log('Response Data:', data);
//   // } catch (error) {
//   //   console.error('Error fetching data:', error);
//   // }
//   const response = await fetch('https://ducvan-backend.onrender.com/phatnguoi?bienso=63B02028');
//   const data = await response.json();
//   console.log(data)
// }
export default function PhatNguoi() {
  // GetData()
  const [data, setData] = useState< DataType | null>(null);
  const [input, setInput] = useState< string | string>('');
  const isPunish = 'ĐÃ XỬ PHẠT'
  const fetchData = async(license_plate: string) => {
    const url = 'https://ducvan-backend.onrender.com/phatnguoi?bienso='+license_plate
    const response = await fetch(url);
    const data = await response.json();
    const jsonData: DataType = data
    // const jsonData: DataType = {
    //   biensoxe: "63B-020.28",
    //   totalViolations: 2,
    //   is_new: true,
    //   handledCount: 1,
    //   unhandledCount: 1,
    //   updated_at: "2025-01-06 09:45:29",
    //   violations: [
    //     {
    //       trang_thai: "ĐÃ XỬ PHẠT",
    //       bien_kiem_sat: "63B02028",
    //       mau_bien: "Nền màu vàng, chữ và số màu đen",
    //       loai_phuong_tien: "Ô tô",
    //       thoi_gian_vi_pham: "10:48, 01/04/2023",
    //       dia_diem_vi_pham: "Km1762+150, Quốc lộ 1A - Bình Thuận",
    //       hanh_vi_vi_pham:
    //         "12321.5.3.a.01.Điều khiển xe chạy quá tốc độ quy định từ 05 km/h đến dưới 10 km/h",
    //       don_vi_phat_hien_vi_pham:
    //         "ĐỘI TT, ĐTGQTNGT VÀ XLVP - PHÒNG CSGT BÌNH THUẬN",
    //       noi_giai_quyet_vu_viec:
    //         "\\n 1. ĐỘI TT, ĐTGQTNGT VÀ XLVP - PHÒNG CSGT BÌNH THUẬN\\nĐịa chỉ: 115 Tôn Đức Thắng, TP. Phan Thiết\\nSố điện thoại liên hệ: 0693428184\\n2. Đội Cảnh sát giao thông, Trật tự - Công an huyện Chợ Gạo - Tỉnh Tiền Giang\\nĐịa chỉ: huyện Chợ Gạo\\n",
    //       so_dien_thoai: "0693428184",
    //       muc_phat:
    //         "Theo Nghị định 100/2019/NĐ-CP, mức phạt cho lỗi điều khiển xe chạy quá tốc độ quy định từ 05 km/h đến dưới 10 km/h là 800,000-1,000,000 đồng đối với xe ô tô.",
    //     },
    //     {
    //       trang_thai: "CHƯA XỬ PHẠT",
    //       bien_kiem_sat: "63B-020.28",
    //       mau_bien: "Nền mầu trắng, chữ và số màu đen",
    //       loai_phuong_tien: "Ô tô",
    //       thoi_gian_vi_pham: "17:48, 10/07/2019",
    //       dia_diem_vi_pham: "Bạc Liêu",
    //       hanh_vi_vi_pham: null,
    //       don_vi_phat_hien_vi_pham: "Đội 5, Công an  Bạc Liêu",
    //       noi_giai_quyet_vu_viec:
    //         "\\n1. Đội 5, Công an  Bạc Liêu\\nĐịa chỉ: 593 Đường Trần Phú, Khóm 1, Phường 7, TP Bạc Liêu\\nSố điện thoại liên hệ: 02913678988\\n",
    //       so_dien_thoai: "02913678988",
    //     },
    //   ],
    //   attempts: null,
    //   mdk: null,
    //   maubien: null,
    //   data_dangkiem: null,
    //   code: 1,
    // };

    setData(jsonData);

    // console.log(jsonData.code)
  };
  // const motorbikeRegex = /^\d{2}[A-Z]{1,2}\d{4,5}$/; // Xe máy
  // const carRegex = /^\d{2}[A-Z]\d{4,5}$/;            // Ô tô
  // const electricVehicleRegex = /^\d{2}E\d{4,5}$/;    // Xe điện
  const Filter = () => {
    // if (motorbikeRegex.test(input)) {
    //   console.log("Xe máy");
    // } else if (carRegex.test(input)) {
    //   console.log("Ô tô");
    // } else if (electricVehicleRegex.test(input)) {
    //   console.log("Xe điện");
    // } else {
    //   console.log("Biển số không hợp lệ");
    // }
    console.log(input)
    fetchData(input)
  }
  // const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string>("");
  const handleSelect = (vehicle: string) => {
    setSelected(vehicle);
  };
  const Whatcode = data?.code
  
  return (
   
      <main className="min-h-screen w-full  h-screen overflow-x-hidden overflow-y-auto bg-[#f0e6dc] ">

        {/* Background set on main, ensuring it covers the viewport */}
        <div className='rounded-md m-5 text-[#263381] items-center justify-content-center'>
          <h1 className='text-xl relative z-10 text-center md:h-auto leading-tight font-bold md:text-4xl'>
            {/* <RandomizedTextEffect text="Tra Cứu Phạt Nguội" loopDelay={5000} /> */}
            <SparklesText text="Tra Cứu Phạt Nguội" className='text-3xl md:text-5xl' sparklesCount={10}/>
          </h1>
        </div>

        <div className="flex items-center justify-center md:m-0 m-5 cursor-pointer text-black">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
          {/* <p>Chi bien so da dinh danh</p> */}
          <Input
            placeholder="Nhập biển số xe của bạn"
            className="border-solid border-2"
            value={input ?? ""} // Default to an empty string if input is null
            onChange={(e) => setInput(e.target.value)}
          />
            <div className="flex overflow-x-auto whitespace-nowrap space-x-4 mt-2">
              
              <div
                className={`flex items-center text-xs md:text-base border-2 rounded-[10px] p-2 ${
                  selected === "car" ? "border-[#263381]" : "border-slate-200"
                }`}
                onClick={() => handleSelect("car")}
              >
                <CarFront className="mr-2 h-4 w-4" /> Ôtô
              </div>

              <div
                className={`flex items-center text-xs md:text-base border-2 rounded-[10px] p-2 ${
                  selected === "bike" ? "border-[#263381]" : "border-slate-200"
                }`}
                onClick={() => handleSelect("bike")}
              >
                <Bike className="mr-2 h-4 w-4" /> Xe Máy
              </div>
              <div
                className={`flex items-center text-xs md:text-base border-2 rounded-[10px] p-2 ${
                  selected === "electric-bike" ? "border-[#263381]" : "border-slate-200"
                }`}
                onClick={() => handleSelect("electric-bike")}
              >
                <Zap className="mr-2 h-4 w-4" /> Xe Máy Điện
              </div>
              <div
                className={`flex items-center text-xs md:text-base border-2 rounded-[10px] p-2 ${
                  selected === "auto-vehicle" ? "border-[#263381]" : "border-slate-200"
                }`}
                onClick={() => handleSelect("auto-vehicle")}
              >
                Tự phân loại
              </div>

            </div>


            <div className='group relative cursor-pointer p-2 border bg-white overflow-hidden text-black text-center font-semibold rounded-[10px] w-full mt-2' onClick={Filter}>
              <span className='translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block'>
                Tra Cứu
              </span>
              <div className='flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300'>
                <span >Tra Cứu</span>
                <ArrowRight />
              </div>
              <div className='absolute group-hover:h-full group-hover:w-full rounded-lg bg-black scale-[1] dark:group-hover:bg-[#e7cb6e] group-hover:bg-[#263381] group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] '></div>
            </div>

            <div className='mt-2 flex'>
                Made by Ducnv 💖 
                <p className='ml-auto flex'>
                  <a href="https://github.com/vanduc006" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                  </a>
                  <a href="https://instagram.com/_ducnv" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-4 w-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/duc-nv-54a5b8332/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                  </a>
                </p>
            </div>
            
          </div>
        </div>
        
      {/* Display the two scrollable areas */}
      {data && (
          // {data.code === 1 ? }
          <div> 
            {Whatcode === 1 ?
            <>
              <div className="flex items-center justify-center md:m-0 m-5 text-black">
                  <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-2 mt-2">
                  
                      <div className=''>
                    
                          {/* <ScrollBaseAnimation
                          baseVelocity={10}
                          clasname='font-bold leading-[90%] text-xl'
                          >
                              
    
                          </ScrollBaseAnimation> */}
                          <Marquee>
                            <p className='text-xl'>Biển số {input} phát hiện {data.totalViolations} <span className='mr-3'>lỗi</span> </p>
                          </Marquee>
                      </div>
                  </div>
              </div>
              {data.violations.map((violations,index) => (
                <div className="flex items-center justify-center md:m-0 m-5 cursor-pointer text-black">
                  <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8 mt-2">
                    <div className="">
                      {isPunish === violations.trang_thai ? <p className="bg-green-300 rounded-[10px] p-1 p-1 pl-2 pr-2 mb-2">Đã xử phạt</p> : <p className="bg-red rounded-[10px] p-1 pl-2 pr-2 mb-2 ">Chưa xử phạt</p> }
                      <div className="flex">
                        <p className="p-1">Lỗi {index + 1} - Vi phạm lúc {violations.thoi_gian_vi_pham} </p>
                      </div>
                      <ScrollArea className="h-[300px] rounded-md border p-4 mt-2 max-width whitespace-pre-wrap">
                        <p>&#x2022; Phát hiện vi phạm tại : <span className='text-[#263381]'>{violations.dia_diem_vi_pham}</span> </p> 
                        <p>&#x2022; Hành vi vi phạm : <span className='text-[#263381]'>{violations.hanh_vi_vi_pham || 'Không xác định'}</span> </p> 
                        <p>&#x2022; Đơn vị phụ trách : <span className='text-[#263381]'>{violations.don_vi_phat_hien_vi_pham}</span></p> 
                        <p>&#x2022; ĐT liên hệ : <span className='text-[#263381]'>{violations.so_dien_thoai}</span></p> 
                        <p>
                          &#x2022; Địa điểm nộp phạt:
                          {violations.noi_giai_quyet_vu_viec.split('\\n').map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                              <p className='ml-5 mt-0 text-[#263381]'>
                                {line.trim()}
                                <br/>
                              </p>
                              
                            </React.Fragment>
                          ))}
                        </p>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              
              ))}
            </> 
              : 
            <>
              <div className="flex items-center justify-center md:m-0 m-5 cursor-pointer text-black">
                  <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-2 mt-2">
                  
                      <div className=''>
                    
                          {/* <ScrollBaseAnimation
                          baseVelocity={10}
                          clasname='font-bold leading-[90%] text-xl'
                          >
                              
    
                          </ScrollBaseAnimation> */}
                          <Marquee>
                            <p className='text-xl'>Không có dữ liệu phạt nguội về biển số {input} 🎉</p>
                          </Marquee>
                      </div>
                </div>
              </div>
              <div className="flex items-center justify-center md:m-0 m-5 cursor-pointer text-black">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-2 mt-2">
                  <p className='text-center'>
                    Chúc bạn tham gia giao thông an toán nha!
                  </p>
                </div>
              </div>              
            </> }
             
          </div>        
        )}         



        
      </main>
    
  );
}