import { useState } from 'react'
import { Route , Routes } from 'react-router-dom'
import './App.css'
import './global.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='flex h-screen'>
      <Routes>
        {/* If user already login */}

        {/* If user not login */}
      </Routes>
    </main>
  )
}

export default App
