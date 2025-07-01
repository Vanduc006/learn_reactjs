import React, { createContext, useContext, useState } from 'react'

interface MindContext {
    spaceID : string,
    setSpaceID : ( text : string) => void,
    currentTab : string,
    setCurrentTab: ( text : string) => void,
    currentSpace : string,
    setCurrentSpace : ( text : string) => void,
    currentSourceLenght : number,
    setCurrentSourceLenght : ( number : number) => void,
    // spaceSession : string[],
    // setSpaceSession : string[],
}
const MindProviderContext = createContext<MindContext | undefined>(undefined)
export  const MindProvider:React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [spaceID,setSpaceID] = useState<string>('')
    const [currentTab,setCurrentTab] = useState<string>('chat')
    const [currentSpace,setCurrentSpace] = useState<string>('')
    const [currentSourceLenght,setCurrentSourceLenght] = useState<number>(0)
    // const [tab, setTab] = 
    // const [spaceSession,setSpaceSession] = useState<string[]>([])
    return (
        <MindProviderContext.Provider value={
            {
            spaceID,
            setSpaceID,
            currentTab,
            setCurrentTab,
            currentSpace,
            setCurrentSpace,
            currentSourceLenght,
            setCurrentSourceLenght
        }
        }>
            {children}
        </MindProviderContext.Provider>
    )
}

export const useMind = () => {
    const context = useContext(MindProviderContext)
    if (!context) throw new Error('Error sharing context')
    return context
}