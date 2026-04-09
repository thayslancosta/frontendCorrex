import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Correcao from './pages/Correcao'
import Revisao from './pages/Revisao'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/correcao" element={<Correcao />} />
        <Route path="/revisao" element={<Revisao />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App