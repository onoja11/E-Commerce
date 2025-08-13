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
import CreateProducts from "./pages/Admin/products/CreateProducts";
import ViewProducts from "./pages/Admin/products/ViewProducts";
import CategoryList from "./pages/Admin/categories/CategoryList";
import AddCategory from "./pages/Admin/categories/AddCategory";
import AdminRoute from "./pages/Auth/AdminRoute";


const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={ <Home/>} />
        {/* <Route path="*" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/caps" element={<Caps/>} />
        <Route path="/preview" element={<Preview/>} />
        <Route path="/login" element={!token ? <Login/> : <Navigate to={'/'}/>} />
        <Route path="/register" element={!token ? <Register/> : <Navigate to={'/'}/>} />
        <Route path="/admin/create/product" element={<AdminRoute> <CreateProducts/></AdminRoute> } />
        <Route path="/admin/products" element={<AdminRoute><ViewProducts/> </AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><CategoryList/></AdminRoute>} />
        <Route path="/admin/categories/add"  element={<AdminRoute><AddCategory/></AdminRoute>} />
      </Routes>
    <Footer/>
    </Router>
    </>
  
  )
}

export default App