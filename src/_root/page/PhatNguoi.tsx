import { useState } from 'react';
// import Earth from '@/components/uilayout/globe';
// import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
import ScrollBaseAnimation from '@/components/uilayout/text-marquee';
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
// import { ReactLenis } from 'lenis/react';
import smoothscroll from 'smoothscroll-polyfill';
// import ScrollElement from '@/components/uilayout/scroll-element';
import { ScrollArea } from '@/components/ui/scroll-area';
// import Ripple from '@/components/ui/ripple';
// import { WarpBackground } from '@/components/ui/warp-background';
import SparklesText from '@/components/ui/sparkles-text';
// import ScrollProgress from '@/components/ui/scroll-progress';
// import ShineBorder from '@/components/ui/shine-border';

// Initialize smooth scroll polyfill
smoothscroll.polyfill();

export default function PhatNguoi() {
  // const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (vehicle: string) => {
    setSelected(vehicle);
  };

  return (
   
      <main className="min-h-screen w-full  h-screen overflow-x-hidden overflow-y-auto bg-slate-100 ">

        {/* Background set on main, ensuring it covers the viewport */}
        <div className='rounded-md m-5 text-[#263381] items-center justify-content-center'>
          <h1 className='text-xl relative z-10 text-center md:h-auto leading-tight font-bold md:text-4xl'>
            {/* <RandomizedTextEffect text="Tra Cứu Phạt Nguội" loopDelay={5000} /> */}
            <SparklesText text="Tra Cứu Phạt Nguội" className='text-3xl md:text-5xl' sparklesCount={10}/>
          </h1>
        </div>

        <div className="flex items-center justify-center md:m-0 m-5 cursor-pointer text-black">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
            <Input placeholder="Nhập biển số xe của bạn" className='border-solid border-2' />
            <div className="flex flex-row items-center space-x-4 mt-2">

              <div
                className={`flex items-center text-sm md:text-base border-2 rounded-[10px] p-2 ${
                  selected === "car" ? "border-[#263381]" : "border-slate-200"
                }`}
                onClick={() => handleSelect("car")}
              >
                <CarFront className="mr-2 h-4 w-4" /> Ôtô
              </div>
              <div
                className={`flex items-center text-sm md:text-base border-2 rounded-[10px] p-2 ${
                  selected === "bike" ? "border-[#263381]" : "border-slate-200"
                }`}
                onClick={() => handleSelect("bike")}
              >
                <Bike className="mr-2 h-4 w-4" /> Xe Máy
              </div>
              <div
                className={`flex items-center text-sm md:text-base border-2 rounded-[10px] p-2 ${
                  selected === "electric-bike" ? "border-[#263381]" : "border-slate-200"
                }`}
                onClick={() => handleSelect("electric-bike")}
              >
                <Zap className="mr-2 h-4 w-4" /> Xe Máy Điện
              </div>
            </div>


            <div className='group relative cursor-pointer p-2 border bg-white overflow-hidden text-black text-center font-semibold rounded-[10px] w-full mt-2'>
              <span className='translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block'>
                Tra Cứu
              </span>
              <div className='flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300'>
                <span>Tra Cứu</span>
                <ArrowRight />
              </div>
              <div className='absolute group-hover:h-full group-hover:w-full rounded-lg bg-black scale-[1] dark:group-hover:bg-[#e7cb6e] group-hover:bg-[#263381] group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%] '></div>
            </div>
          </div>
        </div>
        
      {/* Display the two scrollable areas */}
    
        <div className="flex items-center justify-center md:m-0 m-5 cursor-pointer text-black">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8 mt-2">

                <div className='grid place-content-center'>
                  
                    <ScrollBaseAnimation
                    baseVelocity={10}
                    clasname='font-bold leading-[90%] text-xl'
                    >
                        Biển số ABC1234 Phát Hiện 2 Lỗi 😥

                    </ScrollBaseAnimation>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-center md:m-0 m-5 cursor-pointer text-black">
              <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8  mt-2">
                  <div className='grid place-content-center'>
                  Lỗi 1 - Vi phạm lúc 10:48, 01/04/2023
                      <ScrollArea className="h-[300px] rounded-md border p-4 mt-2">

                      Theo Nghị định 100/2019/NĐ-CP, mức phạt cho lỗi điều khiển xe chạy quá tốc độ quy định từ 05 km/h đến dưới 10 km/h là 800,000-1,000,000 đồng đối với xe ô tô.

                      Điều này có nghĩa là, khi bạn điều khiển xe của mình trên đường, bạn cần tuân thủ tốc độ tối đa cho phép. Đối với mỗi khu vực, tốc độ tối đa cho phép có thể khác nhau và thường được ghi trên các biển báo giao thông. Nếu bạn điều khiển xe của mình nhanh hơn tốc độ quy định từ 05 km/h đến dưới 10 km/h, bạn sẽ bị phạt theo quy định trên.

                      Ví dụ, nếu tốc độ quy định trên một con đường là 60 km/h và bạn điều khiển xe ở tốc độ 65 km/h đến dưới 70 km/h, bạn sẽ bị phạt 800,000-1,000,000 đồng.

                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.
                      Việc không tuân thủ tốc độ tối đa quy định không chỉ gây ra hậu quả về mặt pháp lý, mà còn gây nguy hiểm cho người điều khiển và những người khác trên đường.       
                      </ScrollArea>
                  </div>
              </div>
        </div>
        
      </main>
    
  );
}