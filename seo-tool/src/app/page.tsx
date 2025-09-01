
'use client';

import { useState } from 'react';
import { Search, Github, BarChart3, Globe, Menu, X, Star, Zap, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOAnalyzer from '@/components/SEOAnalyzer';
import GitHubIntegration from '@/components/GitHubIntegration';

type Tab = 'seo' | 'github' | 'tools';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

const tabVariants = {
  inactive: {
    scale: 1,
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgb(107, 114, 128)"
  },
  active: {
    scale: 1.05,
    backgroundColor: "rgb(219, 234, 254)",
    color: "rgb(29, 78, 216)",
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] as const
    }
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgb(243, 244, 246)",
    transition: {
      duration: 0.2
    }
  }
};

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('seo');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'seo' as Tab, label: 'SEO Analyzer', icon: Search, description: 'Comprehensive website analysis' },
    { id: 'github' as Tab, label: 'GitHub Integration', icon: Github, description: 'Repository optimization' },
    { id: 'tools' as Tab, label: 'Advanced Tools', icon: BarChart3, description: 'Professional insights' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'seo':
        return (
          <motion.div
            key="seo"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SEOAnalyzer />
          </motion.div>
        );
      case 'github':
        return (
          <motion.div
            key="github"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GitHubIntegration />
          </motion.div>
        );
      case 'tools':
        return (
          <motion.div
            key="tools"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center border border-blue-200">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block mb-6"
              >
                <BarChart3 className="h-16 w-16 text-blue-600 mx-auto" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Advanced SEO Tools & Analytics
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Professional-grade SEO analysis tools built by KhuzaimaAftab-crypto, 
                showcasing expertise in full-stack development, blockchain technology, 
                and modern web optimization techniques.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Performance Optimization</h3>
                  <p className="text-sm text-gray-600">Advanced techniques for speed and efficiency</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Blockchain Integration</h3>
                  <p className="text-sm text-gray-600">Web3 and cryptocurrency optimization</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-lg border-2 border-yellow-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Star className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Elite Development</h3>
                  <p className="text-sm text-gray-600">Top-tier full-stack solutions</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <motion.div 
              className="flex items-center space-x-3"
              variants={itemVariants}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Globe className="h-10 w-10 text-blue-600" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SEO Tool Pro
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  by KhuzaimaAftab-crypto
                </p>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    variants={tabVariants}
                    initial="inactive"
                    animate={activeTab === tab.id ? "active" : "inactive"}
                    whileHover="hover"
                    className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 shadow-lg'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="text-left">
                      <div>{tab.label}</div>
                      <div className="text-xs opacity-75">{tab.description}</div>
                    </div>
                  </motion.button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t bg-white/90 backdrop-blur-md overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={`w-full px-4 py-3 rounded-xl text-sm font-medium flex items-center space-x-3 transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <div className="text-left">
                        <div>{tab.label}</div>
                        <div className="text-xs opacity-75">{tab.description}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </motion.main>

      {/* Enhanced Footer */}
      <motion.footer 
        className="bg-white/80 backdrop-blur-md border-t border-white/20 mt-16"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <motion.div
              className="flex justify-center space-x-6 mb-6"
              variants={containerVariants}
            >
              {[
                { name: 'React.js', level: 95 },
                { name: 'Blockchain', level: 90 },
                { name: 'Node.js', level: 92 },
                { name: 'TypeScript', level: 88 }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="text-sm font-medium text-gray-700">{skill.name}</div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.1 + 1, duration: 1 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{skill.level}%</div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="space-y-2">
              <p className="text-gray-600 font-medium">
                Professional SEO Tool - Advanced website analysis and optimization
              </p>
              <motion.p 
                className="text-gray-500"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Built by{' '}
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  KhuzaimaAftab-crypto
                </span>{' '}
                - Elite Full Stack & Blockchain Developer
              </motion.p>
              <p className="text-sm text-gray-400">
                Specializing in React, Next.js, TypeScript, Smart Contracts, DeFi, and Modern Web Technologies
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
