import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Correcao from './pages/Correcao'
import Revisao from './pages/Revisao'
import Turmas from './pages/Turmas'
import Alunos from './pages/Alunos'
import Criterios from './pages/Criterios'

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
        <Route path="/turmas" element={<Turmas />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/criterios" element={<Criterios />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App