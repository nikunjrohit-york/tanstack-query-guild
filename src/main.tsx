import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.tsx'
import ReactQueryProvider from './providers/ReactQueryProvider.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReactQueryProvider>
            <App />
            <Toaster richColors position="top-right" />
        </ReactQueryProvider>
    </StrictMode>,
)
