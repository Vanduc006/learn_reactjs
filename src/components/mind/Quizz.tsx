import QuizList from '@/services/Supabase/QuizList';
import { useUser } from '@clerk/clerk-react';
import { CircleDashed } from 'lucide-react';
import { useEffect, useState, useRef} from 'react'
import QuizComponent from './QuizView';
import DateFormat from './DateFormat';
import BeatLoader from 'react-spinners/BeatLoader';

const Quizz = () => {
    
    const { user } = useUser();
    const [QuizzSession, setQuizzSession] = useState<any[]>([]);
    const [loadingQuizz,setLoadingQuizz] = useState(false)
    const [moreQuizz,setMoreQuizz] = useState(true)
    const lastQuizzRef = useRef(null)
    const [lastCreatedAt, setLastCreatedAt] = useState(null); 
    const [selectedQuizz,setSelectedQuizz] = useState<any[]>([]);
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    };
    const [selectedQuiz,setSelectedQuiz] = useState(true)

    async function CallQUizzList(clerkUserrId:string, cursor =  null) {
        
        QuizList(clerkUserrId,cursor).then(( data ) => {
            setLoadingQuizz(true)
            if (data.length < 10) {
                setMoreQuizz(false)              
            }
            if (data.length > 0) {
                setQuizzSession((prev) => [...prev,...data])
                // console.log(QuizzSession)
                setLastCreatedAt(data[data.length - 1].created_at);
                
            }
            setLoadingQuizz(false)
        })
    }


    // useEffect(() => {
    //     if ( user ) {
    //         CallQuizzList(user?.id)
    //         // console.log(QuizzSession)
    //     }
    // },[user])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries
            setLoadingQuizz(entry.isIntersecting)
        },observerOptions)
        if (lastQuizzRef.current) {
            observer.observe(lastQuizzRef.current)
        }
        if (loadingQuizz && user) {
            const clerkUserId = user?.id
            if (!moreQuizz) {
                return
            }
            else {
                CallQUizzList(clerkUserId,lastCreatedAt)
            }
        }
        return () => {

        }
    },[observerOptions,loadingQuizz,user])

  return (
    <div>
        {selectedQuiz ? 
                                    
            <div className=''>
                {QuizzSession.map((quizz,index) => {
                    return (
                        <div className='mb-2 rounded-xl p-2 cursor-pointer drop-shadow-xl bg-blue-500' key={index}> 

                            <div className='flex'>
                                <p className='bg-slate-300 pl-3 pr-3 p-1 rounded-xl mr-2'>{quizz.major}</p>
                                {/* <p className='bg-slate-300 pl-3 pr-3 p-1 rounded-xl mr-2'>{quizz.badge}</p> */}
                            </div>
                            <div className='mt-2 text-white flex items-center justify-content-center'>
                                <CircleDashed className='w-4 h-4 items-center justify-content-center mr-1'/>
                                {quizz.title}
                            </div>
                            <div className='mt-2 text-white flex items-center justify-content-center'>
                                <CircleDashed className='w-4 h-4 items-center justify-content-center mr-1'/>
                                <DateFormat utcTime={quizz.created_at}/>
                            </div>
                            <div className='mt-5 text-center bg-slate-300 rounded-xl p-2'
                            onClick={() => {
                                setSelectedQuiz(false)    
                                setSelectedQuizz(quizz.questions)
                            }}
                            >Let's do</div>
                        </div>
                    )
                })}
                {/* <div className='mb-2 rounded-xl p-2 cursor-pointer drop-shadow-xl bg-[#4871f7]'> 

                    <div className='flex'>
                        <p className='bg-slate-300 pl-3 pr-3 p-1 rounded-xl mr-2'>Tech</p>
                    </div>
                    <div className='mt-2 text-white flex items-center justify-content-center'>
                        <CircleDashed className='w-4 h-4 items-center justify-content-center mr-1'/>
                        New games from Bytedance
                    </div>
                    <div className='mt-2 text-white flex items-center justify-content-center'>
                        <CircleDashed className='w-4 h-4 items-center justify-content-center mr-1'/>
                        07 Mar  03:13:41
                    </div>
                    <div className='mt-5 text-center bg-slate-300 rounded-xl p-2'
                    onClick={() => {
                        setSelectedQuiz(false)    
                    }}
                    >Let's do</div>
                </div> */}
                <div ref={lastQuizzRef}>
                    {moreQuizz && 
                        <p className='flex items-center '>      
                            <BeatLoader
                                color='#4871f7'
                                className=''
                                loading={true}
                                size={10}
                            />
                        </p>
                    }
                </div>
            </div>
            
            :

            <div className=''>
                <div
                onClick={() => {
                    setSelectedQuiz(true)
                }}
                className='bg-white w-fit p-2 rounded-xl mb-2'
                >Back to quiz list</div>
                {/* <div>
                    {selectedQuizz}
                </div> */}
                <QuizComponent quizData={selectedQuizz}/>
            </div>
        }
    </div>
  )
}

export default Quizz