import DateFormat from '@/components/mind/DateFormat'
import supabase from '@/services/Supabase/ConnectSupabase'
import { useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

const Icloud = () => {
    const {user} =  useUser()
    const [currentPassList,setCurrentPassList] = useState<any[]>([])
    const PassList = async() => {
        const {data,error} = await supabase
        .from('icloud')
        .select('*')
        .order("created_at",{ascending : false})
        if (error) {
            // setCurrentPassList([])
            return []
        }
        // setCurrentPassList(data)
        return data || []
    }

    useEffect(() => {
        const getPassList = async() => {
            const data = await PassList()
            setCurrentPassList(data)
        }
        getPassList()
    },[])

    const [newPass,setNewpass] = useState<string>('')
    const newPassword = async() => {
        await supabase
        .from('icloud')
        .insert({
            password : newPass,
        })
    }
  return (
    <div className='p-2 bg-white min-h-screen'>
        <div className='bg-gray-200 p-2 text-black sm:max-w-[50%] w-full mx-auto rounded-md'>
            {user?.id == 'user_2t7yeebNq2CPkLNrFmYNdJob43E' &&
            <div>
                <input value={newPass} onChange={(e) => setNewpass(e.target.value)} type="text" className='bg-gray-300 p-1 outline-none rounded-md' />
                <button
                onClick={() => newPassword()}
                 className='bg-black p-1 rounded-md text-white ml-2'>Save</button>
            </div>
            }
            Danh sach pass

            <div>
                {
                    currentPassList.map((pass,index) => {
                        return (
                            <div key={pass.id} >
                                {
                                    index == 0 ? 
                                    <div className=' items-center justify-content-center'>
                                        <div className='gap-2 flex items-center justify-content-center'>
                                            <div className='bg-green-400 px-3 rounded-md'>
                                                Moi nhat
                                            </div>
                                            <div className='font-mono'>
                                            {pass.password}

                                            </div>
                                        </div>
                                        <div className='text-sm text-gray-500'>
                                            <DateFormat utcTime={pass.created_at}/>

                                        </div> 
                                    </div>
                                    :

                                     <div className='flex items-center justify-content-center'>
                                            <div className='font-mono'>
                                                {pass.password}

                                            </div>
                                        <div className='ml-auto bg-black text-white px-5 py-1 rounded-md'>
                                            <DateFormat utcTime={pass.created_at}/>

                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Icloud