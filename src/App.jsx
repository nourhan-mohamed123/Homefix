import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Login'
import CustomerRegister from './pages/customerRegister'
import ProviderRegister from './pages/ProviderRegister'
import ProviderDashboard from './pages/ProviderDashboard'
import ProviderSettings from './pages/ProviderSettings'

const LayoutWrapper = ({ children }) => {
    const location = useLocation();
    const hideLayout = ['/login', '/register', '/customer-register', '/provider-register'].includes(location.pathname);
    return (
        <div className="min-h-screen bg-primary-lightest flex flex-col">
            {!hideLayout && <Navbar />}
            <main className="flex-1">
                {children}
            </main>
            {!hideLayout && <Footer />}
        </div>
    );
};
function App() {
    return (
        <Router>
            <LayoutWrapper>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/customer-register" element={<CustomerRegister />} />
                    <Route path="/provider-register" element={<ProviderRegister />} />
                    <Route path="/provider-dashboard" element={<ProviderDashboard />} />
                    <Route path="/provider-settings" element={<ProviderSettings />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </LayoutWrapper>
        </Router>
    )
}

export default App;