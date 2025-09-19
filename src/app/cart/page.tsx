'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  CreditCard,
  Package,
  Truck
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/account');
      return;
    }
    router.push('/checkout');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="glass-card ios-rounded-2xl p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center space-x-2 glass-button text-white px-6 py-3 ios-rounded-xl text-sm font-medium mb-6 shadow-lg shadow-blue-500/20 spring-in"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-sm shadow-blue-400/50"></div>
                <ShoppingCart size={16} />
                <span>Shopping Cart</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Your <span className="gradient-text">Cart</span> is Empty
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
              </p>
            </div>
          </motion.div>

          {/* Empty Cart Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="glass-card ios-rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/categories">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    className="glass-button px-8 py-4 ios-rounded-2xl text-white font-semibold text-lg flex items-center space-x-2 press-effect"
                  >
                    <Package size={20} />
                    <span>Browse Products</span>
                  </motion.button>
                </Link>
                
                <Link href="/search">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    className="glass-button px-8 py-4 ios-rounded-2xl text-white font-semibold text-lg flex items-center space-x-2 press-effect"
                  >
                    <span>Search Products</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="glass-card ios-rounded-2xl p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-6 py-3 ios-rounded-xl text-sm font-medium mb-6 shadow-lg shadow-blue-500/20 spring-in"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-sm shadow-blue-400/50"></div>
              <ShoppingCart size={16} />
              <span>Shopping Cart ({getTotalItems()} items)</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Your <span className="gradient-text">Cart</span>
            </h1>
            <p className="text-xl text-gray-300">
              Review your items and proceed to checkout.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    layout
                    exit={{ opacity: 0, x: -100 }}
                    className="glass-card ios-rounded-2xl p-6 card-hover"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover ios-rounded-lg"
                        />
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {item.category}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-xl font-bold text-white">
                            ${item.price}
                          </span>
                          <span className="text-gray-400">
                            ${(item.price * item.quantity).toFixed(2)} total
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25
                            }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="glass-button w-8 h-8 ios-rounded-lg flex items-center justify-center text-white press-effect"
                          >
                            <Minus size={16} />
                          </motion.button>
                          
                          <span className="text-white font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25
                            }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="glass-button w-8 h-8 ios-rounded-lg flex items-center justify-center text-white press-effect"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          onClick={() => removeItem(item.id)}
                          className="glass-button w-8 h-8 ios-rounded-lg flex items-center justify-center text-red-400 press-effect"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Cart Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <div className="glass-card ios-rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/categories">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                      className="glass-button px-6 py-3 ios-rounded-xl text-white font-medium flex items-center space-x-2 press-effect"
                    >
                      <ArrowLeft size={20} />
                      <span>Continue Shopping</span>
                    </motion.button>
                  </Link>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    onClick={clearCart}
                    className="glass-button px-6 py-3 ios-rounded-xl text-red-400 font-medium flex items-center space-x-2 press-effect"
                  >
                    <Trash2 size={20} />
                    <span>Clear Cart</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card ios-rounded-2xl p-6 sticky top-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                onClick={handleCheckout}
                className="w-full glass-button px-6 py-4 ios-rounded-xl text-white font-semibold flex items-center justify-center space-x-2 mb-4 press-effect"
              >
                <CreditCard size={20} />
                <span>{isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}</span>
              </motion.button>

              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Secure checkout powered by</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="glass-button px-3 py-1 ios-rounded-lg text-white text-sm font-medium">
                    Stripe
                  </div>
                  <div className="glass-button px-3 py-1 ios-rounded-lg text-white text-sm font-medium">
                    SSL
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Truck size={16} />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 text-sm mt-2">
                  <Package size={16} />
                  <span>30-day return policy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
