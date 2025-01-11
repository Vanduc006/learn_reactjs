import React, { useRef, useState } from 'react'
import Earth from '@/components/uilayout/globe'
// import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
// import ScrollBaseAnimation from '@/components/uilayout/text-marquee';
// import TypingAnimation from '@/components/ui/typing-animation';
import { RandomizedTextEffect } from '@/components/uilayout/text-randomized';
import Blocks from '@/components/uilayout/beam';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
export default function PhatNguoi() {
    // const palettes = [
    //     ['#F9B409', '#F9D16A', '#2A687A', '#72A25E', '#C3B49E'],
    //     ['#C3E4FF', '#6EC3F4', '#EAE2FF', '#B9BEFF', '#B3B8F9'],
    //     ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900'],
    //     ['#FE4365', '#FC9D9A', '#F9CDAD', '#C8C8A9', '#83AF9B'],
    //   ];
    
    //   const [colorIndex, setColorIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    return (
    <main className="w-full h-screen bg-white text-black">
        {/* <div>TRA CỨU PHẠT NGUỘI</div> */}
        {/* <MeshGradientRenderer
        className='w-full h-full'
        colors={palettes[colorIndex]}
        onGradientClick={() =>
            setColorIndex(colorIndex === palettes.length - 1 ? 0 : colorIndex + 1)
        }
        speed={0.01}
        wireframe={true}
        backgroundColor={'#000000'}
        /> */}
        {/* <div className='h-[500px] grid mt-10 '>
            <ScrollBaseAnimation
            delay={500}
            baseVelocity={3}
            scrollDependent={true}
            clasname='tracking-[-0.07em] leading-[90%]'
            >
            Kiểm Tra Phạt Nguội Nhanh Chóng, Chính Xác Nhất
            </ScrollBaseAnimation>
        </div> */}
        
        <div className=' py-10 rounded-md'>
            <h1 className='font-departure text-4xl relative z-10 text-center h-[120px] md:h-auto leading-tight'>
                <RandomizedTextEffect text='Tra cứu phạt nguội nhanh chóng, chính xác' />
            </h1>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2 justify-self-center">
            <Input placeholder="Nhập biển số xe của bạn" className='border-solid border-slate-500' />
            <Button type="submit" className='rounded-[10px] border-solid border-slate-500' variant={'outline'}>Subscribe</Button>
        </div>
    </main>
    );
}