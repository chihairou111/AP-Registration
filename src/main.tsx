import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from "sonner"
import './index.css'
import Loginpage from './loginpage.tsx'
import Dashboard from "@/dashboard.tsx"
import Mainpage from './mainpage.tsx'
import RegisterPage from './registerpage.tsx';
import Registrationcard from "@/registrationcard.tsx";
import Registrationform from "@/registrationform.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster richColors />
      {/*<Routes>*/}
      {/*  <Route path="/" element={<Mainpage />} />*/}
      {/*  <Route path="/login" element={<Loginpage />} />*/}
      {/*  <Route path="/dashboard" element={<Dashboard />} />*/}
      {/*  <Route path="/register" element={<RegisterPage />} />*/}
      {/*</Routes>*/}
      {/*  <Registrationcard />*/}
        <Registrationform />
    </BrowserRouter>
  </StrictMode>,
)
