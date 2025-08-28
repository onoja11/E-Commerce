import React, { useState, useEffect } from 'react';
import { PiBaseballCap } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'; 
import axios from '../../api/axios'; 
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  User, 
  ChevronDown,
  Home,
  Package,
  Info,
  Phone,
  LogOut,
  UserCircle,
  LogIn,
  UserPlus,
  ChartBarStacked,
  ReceiptText,
} from 'lucide-react';
import AddToCart from './AddToCart';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { cart } = useCart();   // 🔥 use context cart here

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown-container')) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    if (token) {
      axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
    }
  }, [token]);

  const navItems = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Caps', to: '/caps', icon: PiBaseballCap },
    { name: 'About', to: '/about', icon: Info },
    { name: 'Contact', to: '/contact', icon: Phone },
  ];

  const authenticatedUserMenuItems = [
    { name: 'Profile', to: '/profile', icon: UserCircle },
    { name: 'Logout', to: '/logout', icon: LogOut, action: 'logout' },
  ];

  const authenticatedAdminMenuItems = [
    { name: 'Products', to: '/admin/products', icon: Package },
    { name: 'Orders', to: '/admin/orders', icon: ReceiptText },
    { name: 'Categories', to: '/admin/categories', icon: ChartBarStacked },
  ];

  const unauthenticatedUserMenuItems = [
    { name: 'Login', to: '/login', icon: LogIn },
    { name: 'Register', to: '/register', icon: UserPlus },
  ];

  const userMenuItems = token ? authenticatedUserMenuItems : unauthenticatedUserMenuItems;
  if (user && user.role === 'admin') {
    userMenuItems.unshift(...authenticatedAdminMenuItems);
  }

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem("token");
      window.location = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/50 text-black backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-black to-slate-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-black to-slate-500 bg-clip-text text-transparent">
                koveCaps
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`flex items-center space-x-1 text-gray-700 hover:text-black p-2 rounded transition-colors duration-200 font-medium group
                    ${isScrolled ? 'hover:bg-white/20' : 'hover:bg-slate-50'}`}
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
            <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-black transition-all">
  <Search className="w-4 h-4 text-gray-400 mr-2" />
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?query=${searchQuery}`);
      }
    }}
  >
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="bg-transparent outline-none text-sm placeholder-gray-400 w-32 focus:w-48 transition-all duration-300"
    />
  </form>
</div>


              {/* Cart */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer p-2 text-gray-600 hover:text-black hover:bg-slate-50 rounded-lg transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
                    <span className="relative">{cart.length}</span>
                  </span>
                )}
              </button>
              {user && <span className="font-medium hidden md:block">{user.name}</span>}

              {/* User Dropdown */}
              <div className="relative user-dropdown-container">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center space-x-1 p-2 text-gray-600 hover:text-black rounded-lg transition-all duration-200 group ${
                    isScrolled ? 'hover:bg-white/20' : 'hover:bg-slate-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isUserDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {userMenuItems.map((item) => (
                      <div key={item.name}>
                        {item.action === 'logout' ? (
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </button>
                        ) : (
                          <Link
                            to={item.to}
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-black hover:bg-slate-50 transition-colors duration-200"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-black hover:bg-slate-50 rounded-lg transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <AddToCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default Navbar;
