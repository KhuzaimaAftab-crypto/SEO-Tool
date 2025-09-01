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
    backgroundColor: "rgba(51, 65, 85, 0.5)",
    color: "rgb(148, 163, 184)"
  },
  active: {
    scale: 1.05,
    backgroundColor: "rgb(59, 130, 246)",
    color: "rgb(248, 250, 252)",
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] as const
    }
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgb(71, 85, 105)",
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
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 text-center border border-slate-700 shadow-xl sm:p-6 md:p-8">
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
                className="inline-block mb-4 sm:mb-6"
              >
                <BarChart3 className="h-8 w-8 text-blue-400 mx-auto sm:h-12 sm:w-12 md:h-16 md:w-16" />
              </motion.div>
              <h2 className="text-lg font-bold text-slate-100 mb-2 sm:text-xl md:text-2xl">
                Advanced SEO Tools & Analytics
              </h2>
              <p className="text-xs text-slate-300 mb-4 max-w-2xl mx-auto sm:text-sm md:text-base sm:mb-6">
                Professional-grade SEO analysis tools built by KhuzaimaAftab-crypto, 
                showcasing expertise in full-stack development, blockchain technology, 
                and modern web optimization techniques.
              </p>
              
              <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-3 sm:gap-4 md:gap-6 md:mt-6">
                <motion.div 
                  className="bg-slate-800/50 p-3 rounded-xl shadow-lg border border-slate-700 backdrop-blur-sm sm:p-4 md:p-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <TrendingUp className="h-5 w-5 text-emerald-400 mx-auto mb-2 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                  <h3 className="font-semibold text-slate-100 mb-1 text-xs sm:text-sm md:text-base">Performance Optimization</h3>
                  <p className="text-xs text-slate-400 sm:text-xs md:text-sm">Advanced techniques for speed and efficiency</p>
                </motion.div>
                
                <motion.div 
                  className="bg-slate-800/50 p-3 rounded-xl shadow-lg border border-slate-700 backdrop-blur-sm sm:p-4 md:p-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Zap className="h-5 w-5 text-violet-400 mx-auto mb-2 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                  <h3 className="font-semibold text-slate-100 mb-1 text-xs sm:text-sm md:text-base">Blockchain Integration</h3>
                  <p className="text-xs text-slate-400 sm:text-xs md:text-sm">Web3 and cryptocurrency optimization</p>
                </motion.div>
                
                <motion.div 
                  className="bg-slate-800/50 p-3 rounded-xl shadow-lg border border-slate-700 backdrop-blur-sm sm:p-4 md:p-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Star className="h-5 w-5 text-amber-400 mx-auto mb-2 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                  <h3 className="font-semibold text-slate-100 mb-1 text-xs sm:text-sm md:text-base">Elite Development</h3>
                  <p className="text-xs text-slate-400 sm:text-xs md:text-sm">Top-tier full-stack solutions</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-12 h-12 bg-blue-500/10 rounded-full sm:w-16 sm:h-16 md:w-20 md:h-20"
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
          className="absolute top-1/3 right-10 w-8 h-8 bg-violet-500/10 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16"
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
          className="absolute bottom-1/4 left-1/4 w-6 h-6 bg-emerald-500/10 rounded-full sm:w-8 sm:h-8 md:w-12 md:h-12"
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
        className="bg-slate-800/80 backdrop-blur-md shadow-xl border-b border-slate-700 sticky top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 py-1 md:py-2">
            <motion.div 
              className="flex items-center space-x-2"
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
                <Globe className="h-6 w-6 text-blue-400 sm:h-8 sm:w-8" />
              </motion.div>
              <div>
                <h1 className="text-base font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent sm:text-lg md:text-xl">
                  SEO Tool Pro
                </h1>
                <p className="text-[0.6rem] text-slate-400 font-medium hidden sm:block md:text-xs">
                  by KhuzaimaAftab-crypto
                </p>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1 lg:space-x-2">
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
                    className={`px-2 py-1.5 rounded-lg text-[0.6rem] font-medium flex flex-col items-center space-y-1 transition-all duration-200 lg:px-3 lg:py-2 lg:text-xs xl:text-sm lg:flex-row lg:space-y-0 lg:space-x-2 ${
                      activeTab === tab.id
                        ? 'shadow-lg'
                        : 'hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                    <div className="text-center lg:text-left">
                      <div>{tab.label}</div>
                      <div className="text-[0.5rem] opacity-75 hidden lg:block xl:text-xs">{tab.description}</div>
                    </div>
                  </motion.button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700"
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
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
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
              className="md:hidden border-t border-slate-700 bg-slate-800/90 backdrop-blur-md overflow-hidden"
            >
              <div className="px-3 py-2 space-y-1.5">
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
                      className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-slate-100'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <div className="text-left">
                        <div>{tab.label}</div>
                        <div className="text-[0.6rem] opacity-75">{tab.description}</div>
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
        className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 relative z-10"
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
        className="bg-slate-800/80 backdrop-blur-md border-t border-slate-700 mt-8 sm:mt-10 md:mt-12"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="text-center space-y-2 sm:space-y-3">
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6"
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
                  className="text-center min-w-[50px] sm:min-w-[60px] md:min-w-[80px]"
                >
                  <div className="text-[0.6rem] font-medium text-slate-300 sm:text-xs md:text-sm">{skill.name}</div>
                  <div className="w-10 h-1 bg-slate-700 rounded-full mt-1 overflow-hidden mx-auto sm:w-12 sm:h-1.5 md:w-16 md:h-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.1 + 1, duration: 1 }}
                    />
                  </div>
                  <div className="text-[0.5rem] text-slate-500 mt-1 hidden sm:block md:text-xs">{skill.level}%</div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="space-y-1.5">
              <p className="text-slate-300 font-medium text-xs sm:text-sm md:text-base">
                Professional SEO Tool - Advanced website analysis and optimization
              </p>
              <motion.p 
                className="text-slate-400 text-[0.6rem] sm:text-xs md:text-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Built by{' '}
                <span className="font-semibold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  KhuzaimaAftab-crypto
                </span>{' '}
                - Elite Full Stack & Blockchain Developer
              </motion.p>
              <p className="text-[0.5rem] text-slate-500 hidden sm:block md:text-xs">
                Specializing in React, Next.js, TypeScript, Smart Contracts, DeFi, and Modern Web Technologies
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}