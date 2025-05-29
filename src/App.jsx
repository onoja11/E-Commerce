import About from "./About";
import Footer from "./components/general/Footer";
import Navbar from "./components/general/Navbar";
import Home from "./home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    <Footer/>
    </>
  
  )
}

export default App