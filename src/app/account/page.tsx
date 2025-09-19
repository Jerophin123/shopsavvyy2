'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  UserCircle,
  Edit3,
  Save,
  X
} from 'lucide-react';
import Avatar from '@/components/Avatar';
import { useAuthStore } from '@/store/authStore';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });
  
  const router = useRouter();
  const { user, isAuthenticated, login, register, logout, updateProfile } = useAuthStore();

  // Initialize profile data when user is loaded
  useState(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        success = await register(formData.name, formData.email, formData.password);
      }

      if (success) {
        router.push('/');
      } else {
        setError(isLogin ? 'Invalid credentials' : 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen py-2 sm:py-4 lg:py-8 px-2 sm:px-4 lg:px-6 xl:px-8 mobile-container">
        <div className="max-w-4xl mx-auto mobile-safe">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4 sm:mb-6 lg:mb-8"
          >
            <div className="glass-card ios-rounded-2xl p-3 sm:p-6 lg:p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center space-x-2 glass-button text-white px-3 sm:px-6 py-2 sm:py-3 ios-rounded-xl text-xs sm:text-sm font-medium mb-3 sm:mb-6 shadow-lg shadow-blue-500/20 spring-in"
              >
                <UserCircle size={12} className="sm:w-4 sm:h-4" />
                <span>User Profile</span>
              </motion.div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight px-1">
                Welcome back, <span className="gradient-text block sm:inline">{user.name}</span>
              </h1>
              <p className="text-xs sm:text-sm lg:text-base xl:text-xl text-gray-300 px-1">
                Manage your account settings and preferences.
              </p>
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 xl:gap-8"
          >
            {/* Profile Info */}
            <motion.div variants={itemVariants} className="glass-card ios-rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8">
              <div className="flex flex-col gap-3 mb-3 sm:mb-4 lg:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Profile Information</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="xl"
                  />
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">{user.name}</h3>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-400 break-all px-2">{user.email}</p>
                    {!isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        onClick={() => setIsEditing(true)}
                        className="glass-button px-3 py-2 ios-rounded-lg text-white flex items-center justify-center space-x-2 press-effect w-auto mx-auto mt-3 min-h-[36px]"
                      >
                        <Edit3 size={14} />
                        <span className="text-xs font-medium">Edit Profile</span>
                      </motion.button>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isEditing && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleProfileUpdate}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="w-full glass-input px-4 py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="w-full glass-input px-4 py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          type="submit"
                          disabled={loading}
                          className="w-full glass-button px-4 py-3 ios-rounded-xl text-white font-medium press-effect disabled:opacity-50 text-sm min-h-[44px]"
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="glass-button px-4 py-3 ios-rounded-xl text-white font-medium press-effect flex items-center justify-center min-h-[44px]"
                        >
                          <X size={18} />
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Account Actions */}
            <motion.div variants={itemVariants} className="glass-card ios-rounded-2xl p-3 sm:p-4 lg:p-6 xl:p-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 lg:mb-6">Account Actions</h2>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={() => router.push('/cart')}
                  className="w-full glass-button p-4 ios-rounded-xl text-white flex items-center space-x-3 press-effect min-h-[60px]"
                >
                  <UserCircle size={20} className="flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-medium text-sm">View Cart</div>
                    <div className="text-xs text-gray-400">Manage your shopping cart</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={() => router.push('/categories')}
                  className="w-full glass-button p-4 ios-rounded-xl text-white flex items-center space-x-3 press-effect min-h-[60px]"
                >
                  <UserCircle size={20} className="flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-medium text-sm">Browse Products</div>
                    <div className="text-xs text-gray-400">Explore our product catalog</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={handleLogout}
                  className="w-full glass-button p-4 ios-rounded-xl text-red-400 flex items-center space-x-3 press-effect min-h-[60px]"
                >
                  <UserCircle size={20} className="flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-medium text-sm">Sign Out</div>
                    <div className="text-xs text-red-300">Logout from your account</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 sm:py-4 lg:py-8 px-2 sm:px-4 lg:px-6 xl:px-8 mobile-container">
      <div className="max-w-md mx-auto mobile-safe">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-6 lg:mb-8"
        >
          <div className="glass-card ios-rounded-2xl p-3 sm:p-6 lg:p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-3 sm:px-6 py-2 sm:py-3 ios-rounded-xl text-xs sm:text-sm font-medium mb-3 sm:mb-6 shadow-lg shadow-blue-500/20 spring-in"
            >
              {isLogin ? <LogIn size={12} className="sm:w-4 sm:h-4" /> : <UserPlus size={12} className="sm:w-4 sm:h-4" />}
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            </motion.div>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight px-1">
              {isLogin ? 'Welcome Back' : 'Join ShopSavvy'}
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-300 px-1">
              {isLogin 
                ? 'Sign in to your account to continue shopping' 
                : 'Create your account to start your premium shopping experience'
              }
            </p>
          </div>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card ios-rounded-2xl p-3 sm:p-6 lg:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-white font-medium mb-2 text-sm">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full glass-input pl-10 pr-4 py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-white font-medium mb-2 text-sm">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full glass-input pl-10 pr-4 py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2 text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full glass-input pl-10 pr-10 py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
                  placeholder="Enter your password"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white glass-button w-8 h-8 ios-rounded-lg flex items-center justify-center press-effect"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </motion.button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-white font-medium mb-2 text-sm">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full glass-input pl-10 pr-4 py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[44px]"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-button bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 ios-rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              type="submit"
              disabled={loading}
              className="w-full glass-button px-4 py-3 ios-rounded-xl text-white font-semibold press-effect disabled:opacity-50 text-sm min-h-[44px]"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}
              className="glass-button px-4 py-3 ios-rounded-xl text-blue-400 hover:text-blue-300 font-medium mt-2 press-effect text-sm min-h-[44px] w-full"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
