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
import EditProducts from "./pages/Admin/products/EditProducts";
import CategoryList from "./pages/Admin/categories/CategoryList";
import AddCategory from "./pages/Admin/categories/AddCategory";
import EditCategory from "./pages/Admin/categories/EditCategory";
import AdminRoute from "./pages/Auth/AdminRoute";
import SearchResults from "./pages/SearchResults";
import ProfilePage from "./pages/Auth/ProfilePage";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import OrdersPage from "./pages/Auth/OrderPage";
import ViewOrders from "./pages/Admin/orders/ViewOrders";
import OrderDetails from "./pages/Admin/orders/OrderDetails";


const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/caps" element={<Caps/>} />
        <Route path="/caps/:id" element={<Preview/>} />
        <Route path="/login" element={!token ? <Login/> : <Navigate to={'/'}/>} />
        <Route path="/register" element={!token ? <Register/> : <Navigate to={'/'}/>} />
        <Route path="/admin/create/product" element={<AdminRoute> <CreateProducts/></AdminRoute> } />
        <Route path="/admin/products" element={<AdminRoute><ViewProducts/> </AdminRoute>} />
        <Route path="/admin/product/:id" element={<AdminRoute><EditProducts/> </AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><CategoryList/></AdminRoute>} />
        <Route path="/admin/categories/add"  element={<AdminRoute><AddCategory/></AdminRoute>} />
        <Route path="/admin/categories/edit/:id"  element={<AdminRoute><EditCategory/></AdminRoute>} />
        <Route path="/admin/orders"  element={<AdminRoute><ViewOrders/></AdminRoute>} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>}/>
        <Route path="/admin/orders/view/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
      </Routes>
    <Footer/>
    </Router>
    </>
  
  )
}

export default App