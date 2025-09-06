import { useEffect, useState } from 'react'
import Product from './useProduct'
import { Button } from '@/components/ui/button'
import { useMobile } from '@/hooks/use-mobile'
import { VoiceRecorder } from '@/components/ui/voice-recorder'

const Bubble = () => {
    const isMobile = useMobile()
    const [isMinimized, setIsMinimized] = useState(false)
    const [recordings, setRecordings] = useState<{ blob: Blob; url: string; timestamp: Date }[]>([])

    const handleRecordingComplete = (audioBlob: Blob, audioUrl: string) => {
        setRecordings(prev => [...prev, { 
            blob: audioBlob, 
            url: audioUrl, 
            timestamp: new Date() 
        }])
        console.log('Recording completed:', { audioBlob, audioUrl })
    }

    if (isMinimized) {
        return (
            <div 
                className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-3 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg"
                onClick={() => setIsMinimized(false)}
            >
                🎤
            </div>
        )
    }

    return (
        <div className={`fixed z-50 flex flex-col ${
            isMobile 
                ? "inset-0 p-4" 
                : "bottom-4 right-4 w-80"
        }`}>
            {/* Minimize button */}
            <Button
                onClick={() => setIsMinimized(true)}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full w-8 h-8 p-0"
            >
                ✕
            </Button>
            
            {/* Voice Recorder */}
            <VoiceRecorder 
                onRecordingComplete={handleRecordingComplete}
                maxDuration={120} // 2 minutes
                className="mb-4"
            />
            
            {/* Recordings List */}
            {recordings.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-lg">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Recordings</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {recordings.slice(-3).reverse().map((recording, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <span className="text-xs text-gray-600">
                                    {recording.timestamp.toLocaleTimeString()}
                                </span>
                                <audio 
                                    controls 
                                    src={recording.url} 
                                    className="h-8 w-32"
                                    style={{ height: '32px' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}


const RealtimeAPI = () => {
    const [product,setProduct] = useState<any[]>([])
    useEffect(() => {
        setProduct(Product)
    },[])
  return (
    <div className='flex flex-col bg-gray-200 min-h-screen p-4 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        { product.length !== 0 && product.map((productidx, index) => {
            return (
            <div key={productidx.id || index} className='bg-white rounded-md p-4'>
                <div className='text-black w-fit ml-auto bg-green-200 px-2 py-1 rounded-md text-sm'>Discount {productidx.discount} %</div>

                <div className='text-black'>{productidx.name}</div>
                <img src={productidx.img} alt="" className=''/>
                <div className='text-red'>{productidx.currentPrice}</div>
            </div>
            )
        })

        }
    <Bubble/>

    </div>
  )
}

export default RealtimeAPI