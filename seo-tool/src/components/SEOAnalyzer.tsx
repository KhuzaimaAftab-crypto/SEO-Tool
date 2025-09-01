'use client';

import { useState } from 'react';
import { Search, ExternalLink, AlertCircle, CheckCircle, Globe, TrendingUp, Eye, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOAnalysis } from '@/types';
import { cn } from '@/lib/utils';

const SEOAnalysisCard = ({ analysis }: { analysis: SEOAnalysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100 overflow-hidden relative"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 pointer-events-none" />
      
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between relative z-10"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Globe className="h-6 w-6 text-blue-600" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">SEO Analysis Results</h2>
            <p className="text-sm text-gray-500">Comprehensive website audit</p>
          </div>
        </div>
        
        <motion.div 
          className={cn("px-6 py-3 rounded-2xl text-lg font-bold flex items-center space-x-2 shadow-lg", getScoreBg(analysis.score))}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <TrendingUp className={cn("h-5 w-5", getScoreColor(analysis.score))} />
          <span className={getScoreColor(analysis.score)}>Score: {analysis.score}/100</span>
        </motion.div>
      </motion.div>

      {/* URL */}
      <motion.div 
        className="flex items-center space-x-3 text-gray-600 bg-gray-50 p-4 rounded-xl relative z-10"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <ExternalLink className="h-5 w-5 text-blue-500" />
        <a 
          href={analysis.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-blue-600 transition-colors font-medium flex-1 truncate"
        >
          {analysis.url}
        </a>
        <Eye className="h-4 w-4 text-gray-400" />
      </motion.div>

      {/* Score Progress Circle */}
      <motion.div 
        className="flex justify-center relative z-10"
        variants={itemVariants}
      >
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className={cn("text-transparent")}
              stroke="url(#scoreGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              initial={{ strokeDasharray: '0 100' }}
              animate={{ strokeDasharray: `${analysis.score} 100` }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={cn("stop-color-opacity-100", getScoreGradient(analysis.score).split(' ')[0].replace('from-', 'text-'))} />
                <stop offset="100%" className={cn("stop-color-opacity-100", getScoreGradient(analysis.score).split(' ')[2].replace('to-', 'text-'))} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className={cn("text-3xl font-bold", getScoreColor(analysis.score))}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
            >
              {analysis.score}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Basic Info */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
        variants={itemVariants}
      >
        <motion.div 
          className="space-y-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Page Title</span>
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <p className="text-gray-800 font-medium">
              {analysis.title || 'No title found'}
            </p>
            {analysis.title && (
              <motion.p 
                className="text-sm text-blue-600 mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {analysis.title.length} characters
                {analysis.title.length >= 30 && analysis.title.length <= 60 ? 
                  <span className="text-green-600 ml-2">✓ Optimal</span> : 
                  <span className="text-yellow-600 ml-2">⚠ Needs improvement</span>
                }
              </motion.p>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="space-y-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Meta Description</span>
          </h3>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <p className="text-gray-800">
              {analysis.description || 'No description found'}
            </p>
            {analysis.description && (
              <motion.p 
                className="text-sm text-purple-600 mt-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {analysis.description.length} characters
                {analysis.description.length >= 120 && analysis.description.length <= 160 ? 
                  <span className="text-green-600 ml-2">✓ Optimal</span> : 
                  <span className="text-yellow-600 ml-2">⚠ Needs improvement</span>
                }
              </motion.p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Headings Structure */}
      <motion.div 
        className="space-y-4 relative z-10"
        variants={itemVariants}
      >
        <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Headings Structure</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {Object.entries(analysis.headings).map(([tag, headings], index) => (
            <motion.div 
              key={tag} 
              className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl text-center border border-green-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="font-bold text-green-700 text-lg">{tag.toUpperCase()}</div>
              <motion.div 
                className="text-2xl font-bold text-green-600 mt-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
              >
                {headings.length}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Images, Links, and other metrics... */}
      {/* ... rest of the existing content with animations ... */}
      
      {/* Issues and Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {analysis.issues.length > 0 && (
          <motion.div 
            className="space-y-3"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span>Issues Found</span>
            </h3>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <ul className="space-y-2">
                {analysis.issues.map((issue, index) => (
                  <motion.li 
                    key={index} 
                    className="text-sm text-red-700 flex items-start space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <span className="text-red-500 mt-1 font-bold">•</span>
                    <span className="font-medium">{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {analysis.suggestions.length > 0 && (
          <motion.div 
            className="space-y-3"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Improvement Suggestions</span>
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <ul className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <motion.li 
                    key={index} 
                    className="text-sm text-green-700 flex items-start space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <span className="text-green-500 mt-1 font-bold">✓</span>
                    <span className="font-medium">{suggestion}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default function SEOAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await fetch('/api/seo-analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze URL');
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Input Section */}
      <motion.div 
        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-blue-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Website SEO Analysis
          </h2>
          <p className="text-gray-600 mb-6">
            Advanced SEO auditing tool by <span className="font-semibold text-blue-600">KhuzaimaAftab-crypto</span> - 
            Elite Full Stack & Blockchain Developer
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex-1 relative">
            <motion.div
              className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              animate={{ scale: url ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Globe className="h-5 w-5 text-gray-400" />
            </motion.div>
            <motion.input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg bg-white/80 backdrop-blur-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          
          <motion.button
            onClick={handleAnalyze}
            disabled={loading || !url.trim()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 font-semibold text-lg shadow-lg transition-all duration-200"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Analyze Website</span>
              </>
            )}
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Comprehensive SEO Audit</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Performance Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Optimization Recommendations</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <AlertCircle className="h-6 w-6 text-red-500" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-red-800">Analysis Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <div>
                <h3 className="font-semibold text-blue-800">Analyzing Your Website</h3>
                <p className="text-blue-700">Performing comprehensive SEO audit... This may take a few moments.</p>
              </div>
            </div>
            
            <motion.div 
              className="mt-4 bg-blue-200 rounded-full h-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SEOAnalysisCard analysis={analysis} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}