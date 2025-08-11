import About from "./pages/About";
import Footer from "./components/general/Footer";
import Navbar from "./components/general/Navbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Caps from "./pages/Caps";
import Preview from "./pages/Preview";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashboard";


const App = () => {
  const token = localStorage.getItem("token");
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/caps" element={<Caps/>} />
        <Route path="/preview" element={<Preview/>} />
        <Route path="/login" element={!token ? <Login/> : <Navigate to={'/'}/>} />
        <Route path="/register" element={!token ? <Register/> : <Navigate to={'/'}/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    <Footer/>
    </>
  
  )
}

export default App