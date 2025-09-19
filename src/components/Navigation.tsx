'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Home,
  Grid3X3,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import Avatar from '@/components/Avatar';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  const { getTotalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const totalItems = getTotalItems();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/cart', label: 'Cart', icon: ShoppingCart, badge: totalItems },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 0.8
      }}
                  className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 mobile-safe">
        <div className="flex items-center justify-between h-[70px] md:h-16">
          {/* Mobile Hamburger Menu - Left */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white glass-button p-2 ios-rounded-lg"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>

          {/* Logo - Center on mobile, Left on desktop */}
          <Link href="/" className="flex items-center space-x-2 md:order-first">
            <div className="text-xl md:text-2xl font-bold gradient-text">
              ShopSavvy
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 glass-button px-4 py-2 ios-rounded-lg"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                  {isMounted && item.badge && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
                      }}
                      className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center bounce-animation"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <motion.form 
              onSubmit={handleSearch} 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input px-4 py-2 pr-10 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <motion.button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                <Search size={20} />
              </motion.button>
            </motion.form>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <Link
                    href="/account"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 glass-button px-4 py-2 ios-rounded-lg"
                  >
                    <Avatar
                      src={user?.avatar}
                      alt={user?.name || 'User'}
                      size="sm"
                    />
                    <span>{user?.name}</span>
                  </Link>
                </motion.div>
                <motion.button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 glass-button px-4 py-2 ios-rounded-lg"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                <Link
                  href="/account"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 glass-button px-4 py-2 ios-rounded-lg"
                >
                  <User size={20} />
                  <span>Account</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Search and Cart - Right */}
          <div className="md:hidden flex items-center space-x-1">
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 hover:text-white glass-button p-2 ios-rounded-lg"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
            >
              <Search size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              className="relative"
            >
              <Link href="/cart" className="text-gray-300 hover:text-white glass-button p-2 ios-rounded-lg flex items-center justify-center">
                <ShoppingCart size={18} />
                {isMounted && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30 
                    }}
                    className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center bounce-animation text-[10px] font-medium"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
            </motion.button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
                          className="md:hidden py-4 glass-card backdrop-blur-xl ios-rounded-xl mt-2"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input px-4 py-2 pr-10 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <Search size={20} />
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
                          className="md:hidden glass-card backdrop-blur-xl ios-rounded-xl mt-2 overflow-hidden"
            >
              <div className="px-4 py-2 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 px-3 ios-rounded-lg hover:bg-white/10 transition-all duration-300 card-hover"
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                      {isMounted && item.badge && item.badge > 0 && (
                        <motion.span 
                          className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-auto bounce-animation"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="border-t border-white/10 pt-2">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/account"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                      >
                        <Avatar
                          src={user?.avatar}
                          alt={user?.name || 'User'}
                          size="sm"
                        />
                        <span>{user?.name}</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-colors duration-200 w-full text-left"
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/account"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    >
                      <User size={20} />
                      <span>Account</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
