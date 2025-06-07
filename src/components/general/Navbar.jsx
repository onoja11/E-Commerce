import React, { useState, useEffect } from 'react';
import { PiBaseballCap } from "react-icons/pi";
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
  
} from 'lucide-react';
import AddToCart from './AddToCart';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      name: 'Black Snapback Cap',
      price: 39.99, 
      image: '../../../pexels-cottonbro-5119522.jpg',
    },
    {
      name: 'Blue Denim Cap',
      price: 29.99,
      image: '../../../pexels-dzeninalukac-1376049.jpg',
    },
  ]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { 
      name: 'Caps', 
      href: '/caps',
      icon: PiBaseballCap,
      // dropdown: [
      //   { name: 'Electronics', href: '#' },
      //   { name: 'Fashion', href: '#' },
      //   { name: 'Home & Garden', href: '#' },
      //   { name: 'Sports', href: '#' },
      //   { name: 'General', href: '#' },
      // ]
    },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-black to-slate-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-black to-slate-500 bg-clip-text text-transparent">
                koveCaps
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className={`flex items-center space-x-1 text-gray-700 hover:text-black p-2 rounded transition-colors duration-200 font-medium group
                      ${
                        isScrolled ?
                         `hover:bg-white/20`:
                         `hover:bg-slate-50`
                      }`}
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform " />
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                      {item.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-4 py-2 text-gray-700 hover:text-black hover:bg-slate-50 transition-colors duration-200"
                        >
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-black transition-all">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm placeholder-gray-400 w-32 focus:w-48 transition-all duration-300"
                />
              </div>

              {/* Cart */}
              <button className="relative cursor-pointer p-2 text-gray-600 hover:text-black hover:bg-slate-50 rounded-lg transition-all duration-200">
                <ShoppingBag className="w-5 h-5"  onClick={() => setIsCartOpen(true)} />
                <span className="absolute -top-1 -right-1  w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
                    <span className="relative">3</span>
                </span>
              </button>

              {/* User */}
              <button className="p-2 cursor-pointer text-gray-600 hover:text-black hover:bg-slate-50 rounded-lg transition-all duration-200">
                <a href="/login">
                <User className="w-5 h-5" />
                </a>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-black hover:bg-slate-50 rounded-lg transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Search */}
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                  <Search className="w-4 h-4 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none text-sm placeholder-gray-400 flex-1"
                  />
                </div>

                {/* Mobile Navigation Links */}
                {navItems.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-700 hover:text-slate-400 py-3 transition-colors duration-200"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </a>
                    {item.dropdown && (
                      <div className="ml-8 space-y-2 mt-2">
                        {item.dropdown.map((dropItem) => (
                          <a
                            key={dropItem.name}
                            href={dropItem.href}
                            className="block text-gray-600 hover:text-black py-1 transition-colors duration-200"
                          >
                            {dropItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                
              </div>
            </div>
          )}
        </div>
      </nav>
<AddToCart
 isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems} />
        
    </div>
  );
};

export default Navbar;