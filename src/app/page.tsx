'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShoppingBag, Star, Users, Zap, TrendingUp, Award, Truck, Shield, Heart, Eye, Search } from 'lucide-react';
import { useCartStore, Product } from '@/store/cartStore';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=8');
      const data = await response.json();
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: ShoppingBag,
      title: 'Premium Products',
      description: 'Curated selection of high-quality items from top brands'
    },
    {
      icon: Star,
      title: '5-Star Experience',
      description: 'Exceptional customer service and satisfaction guaranteed'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Quick delivery and instant checkout process'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of satisfied customers worldwide'
    }
  ];

  const categories = [
    { name: 'Electronics', icon: '📱', count: '1,200+ items' },
    { name: 'Fashion', icon: '👕', count: '800+ items' },
    { name: 'Home & Garden', icon: '🏠', count: '600+ items' },
    { name: 'Sports', icon: '⚽', count: '400+ items' },
    { name: 'Books', icon: '📚', count: '300+ items' },
    { name: 'Beauty', icon: '💄', count: '500+ items' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fashion Enthusiast',
      content: 'Amazing quality products and lightning-fast delivery. ShopSavvy has become my go-to shopping destination!',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=sarah'
    },
    {
      name: 'Mike Chen',
      role: 'Tech Reviewer',
      content: 'The electronics selection is incredible. Found exactly what I was looking for at great prices.',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=mike'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Home Decor Lover',
      content: 'Beautiful home items with premium quality. The liquid glass design makes shopping a pleasure.',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=emily'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
    },
  };

  const floatingVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
    },
  };

  return (
    <div className="min-h-screen mobile-container">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-center justify-center mobile-safe hero-section">
        {/* Minimal Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }}></div>
          
          {/* Apple-Style Floating Icons */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{
                          opacity: 1,
                          y: [0, -20, 0],
                          rotate: [0, 5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotate: 10,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                          }
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute top-1/3 left-1/5"
                      >
            <div className="w-14 h-14 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <ShoppingBag size={22} className="text-blue-400/90" />
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-1/2 right-1/4"
          >
            <div className="w-14 h-14 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <Heart size={22} className="text-pink-400/90" />
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 3, 0],
              scale: [1, 1.04, 1]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/3 left-1/3"
          >
            <div className="w-14 h-14 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <Star size={22} className="text-yellow-400/90" />
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 12, 0],
              rotate: [0, -3, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute top-1/4 right-1/5"
          >
            <div className="w-14 h-14 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <Zap size={22} className="text-purple-400/90" />
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 4, 0],
              scale: [1, 1.06, 1]
            }}
            transition={{ 
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute bottom-1/4 right-1/3"
          >
            <div className="w-14 h-14 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <Shield size={22} className="text-green-400/90" />
            </div>
          </motion.div>

                      {/* Additional Floating Icons - Hidden on Mobile */}
                      <motion.div
                        animate={{
                          y: [0, -12, 0],
                          rotate: [0, -3, 0],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{
                          duration: 7.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.5
                        }}
                        className="absolute top-1/5 right-1/6 hidden md:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Sparkles size={18} className="text-cyan-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 10, 0],
                          rotate: [0, 2, 0],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{
                          duration: 8.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3
                        }}
                        className="absolute bottom-1/5 left-1/6 hidden md:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-orange-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <TrendingUp size={18} className="text-orange-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -15, 0],
                          rotate: [0, -2, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 6.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.8
                        }}
                        className="absolute top-2/3 left-1/12 hidden md:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Users size={18} className="text-indigo-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 8, 0],
                          rotate: [0, 3, 0],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 9.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.8
                        }}
                        className="absolute top-1/6 left-2/3 hidden md:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Award size={18} className="text-emerald-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -6, 0],
                          rotate: [0, -4, 0],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{
                          duration: 7.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.2
                        }}
                        className="absolute bottom-1/3 left-1/2 hidden md:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-rose-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Truck size={18} className="text-rose-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 12, 0],
                          rotate: [0, 2, 0],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{
                          duration: 8.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.3
                        }}
                        className="absolute top-1/2 right-1/12 hidden md:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-violet-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Eye size={18} className="text-violet-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -9, 0],
                          rotate: [0, -1, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 6.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3.5
                        }}
                        className="absolute bottom-1/6 right-1/2 hidden md:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-amber-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Search size={18} className="text-amber-400/90" />
                        </div>
                      </motion.div>
        </div>

        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mobile-safe"
        >
          {/* Minimal Hero Content */}
          <motion.div
            variants={itemVariants}
            className="mb-8 md:mb-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-3 glass-button text-white px-6 py-3 ios-rounded-xl text-sm font-medium mb-8 shadow-lg shadow-green-500/20 spring-in"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
              <span className="text-white/90">Premium Shopping Experience</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-6 leading-tight"
            >
              <motion.span 
                className="gradient-text block"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.4, 
                  duration: 1.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
              >
                ShopSavvy
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed"
            >
              Discover premium products with our intuitive shopping experience
            </motion.p>

            {/* Apple-Style CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8 md:mt-8"
            >
                          <Link href="/categories">
                            <motion.button
                              whileHover={{
                                scale: 1.08,
                                y: -5,
                                rotateX: 5,
                                transition: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20
                                }
                              }}
                              whileTap={{ 
                                scale: 0.92,
                                transition: {
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 15
                                }
                              }}
                              className="glass-button px-10 py-5 ios-rounded-2xl text-white font-semibold text-lg flex items-center space-x-3 press-effect"
                            >
                  <ShoppingBag size={20} className="text-white" />
                  <span>Start Shopping</span>
                  <ArrowRight size={18} className="text-white" />
                </motion.button>
              </Link>
              
                          <Link href="/search">
                            <motion.button
                              whileHover={{
                                scale: 1.08,
                                y: -5,
                                rotateX: 5,
                                transition: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20
                                }
                              }}
                              whileTap={{ 
                                scale: 0.92,
                                transition: {
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 15
                                }
                              }}
                              className="glass-button px-10 py-5 ios-rounded-2xl text-white font-semibold text-lg flex items-center space-x-3 press-effect"
                            >
                  <Search size={20} className="text-white" />
                  <span>Search</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
                  <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 mobile-safe">
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          mass: 0.8,
                          staggerChildren: 0.1
                        }
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="max-w-6xl mx-auto mobile-safe"
                    >
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">ShopSavvy</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of online shopping with our innovative features and premium design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15,
                  scale: 1.05,
                  rotateY: 5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="glass-card ios-rounded-2xl p-4 md:p-6 text-center group card-hover"
              >
                <motion.div
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 glass-button ios-rounded-2xl mb-3 md:mb-4 mx-auto"
                >
                  <feature.icon size={24} className="md:size-8 text-white" />
                </motion.div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
        </div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-6 py-3 ios-rounded-xl text-sm font-medium mb-6 shadow-lg shadow-blue-500/20 spring-in"
            >
              <TrendingUp size={16} />
              <span>Trending Now</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our most popular and trending products, carefully selected for you.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card ios-rounded-2xl p-6 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-700 rounded"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -12,
                    scale: 1.05,
                    rotateX: 5,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 20
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card ios-rounded-2xl overflow-hidden group card-hover"
                >
                  <div className="relative">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                      />
                    </Link>
                    <div className="absolute top-4 right-4">
                      <div className="glass-button ios-rounded-xl px-3 py-1 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">
                          {product.rating.rate}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="glass-button w-8 h-8 ios-rounded-xl flex items-center justify-center text-white hover:bg-white/20 press-effect">
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-white">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-400">
                        {product.rating.count} reviews
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addItem(product)}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        className="flex-1 glass-button py-3 ios-rounded-xl text-white font-semibold flex items-center justify-center space-x-2 press-effect"
                      >
                        <ShoppingBag size={16} />
                        <span>Add to Cart</span>
                      </motion.button>
                      <Link href={`/product/${product.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          className="glass-button w-12 h-12 ios-rounded-xl flex items-center justify-center text-white press-effect"
                        >
                          <Eye size={16} />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-8 py-4 ios-rounded-2xl text-white font-semibold text-lg flex items-center space-x-2 mx-auto press-effect"
              >
                <span>View All Products</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-blue-900/50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Shop by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you're looking for.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15,
                  scale: 1.03,
                  rotateY: 3,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }
                }}
                whileTap={{ scale: 0.98 }}
                className="glass-card ios-rounded-2xl p-6 text-center group card-hover cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {category.count}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
                className="glass-card ios-rounded-2xl p-6 text-center group card-hover"
              >
                <motion.div 
                  className="text-3xl sm:text-4xl font-bold gradient-text mb-3"
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-6 py-3 ios-rounded-xl text-sm font-medium mb-6 shadow-lg shadow-purple-500/20 spring-in"
            >
              <Award size={16} />
              <span>Customer Reviews</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Our <span className="gradient-text">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  rotateY: 2,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }
                }}
                whileTap={{ scale: 0.98 }}
                className="glass-card ios-rounded-2xl p-8 card-hover"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 ios-rounded-xl mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-purple-900/50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why <span className="gradient-text">Trust</span> ShopSavvy?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card ios-rounded-2xl p-8 text-center card-hover"
            >
              <div className="w-16 h-16 glass-button ios-rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Secure Payments</h3>
              <p className="text-gray-300">
                Your payment information is encrypted and secure with industry-standard SSL protection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card ios-rounded-2xl p-8 text-center card-hover"
            >
              <div className="w-16 h-16 glass-button ios-rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Fast Delivery</h3>
              <p className="text-gray-300">
                Get your orders delivered quickly with our reliable shipping partners worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card ios-rounded-2xl p-8 text-center card-hover"
            >
              <div className="w-16 h-16 glass-button ios-rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Quality Guarantee</h3>
              <p className="text-gray-300">
                We stand behind every product with our 30-day money-back guarantee.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Experience the Future?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join thousands of satisfied customers and discover why ShopSavvy is the premium choice for online shopping.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/categories">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-button px-10 py-5 ios-rounded-2xl text-white font-semibold text-lg flex items-center space-x-3 mx-auto sm:mx-0 press-effect"
              >
                <span>Start Shopping</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            
            <Link href="/account">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-button px-10 py-5 ios-rounded-2xl text-white font-semibold text-lg mx-auto sm:mx-0 press-effect"
              >
                Create Account
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
