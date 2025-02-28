
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { viVN } from '@clerk/localizations'
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ClerkProvider 
    
      publishableKey={PUBLISHABLE_KEY} 
      localization={viVN}

    >
      <App />
    </ClerkProvider>
  
  </BrowserRouter>
)
