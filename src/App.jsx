import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Login'
import CustomerRegister from './pages/customerRegister'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary-lightest flex flex-col">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer-register" element={<CustomerRegister />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App