import About from "./pages/About";
import Footer from "./components/general/Footer";
import Navbar from "./components/general/Navbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Caps from "./pages/Caps";
import Preview from "./pages/Preview";


const App = () => {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/caps" element={<Caps/>} />
        <Route path="/preview" element={<Preview/>} />
      </Routes>
    </Router>
    <Footer/>
    </>
  
  )
}

export default App