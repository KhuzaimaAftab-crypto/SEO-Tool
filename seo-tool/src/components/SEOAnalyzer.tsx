import { motion } from 'framer-motion';
import { 
  Globe, 
  TrendingUp, 
  ExternalLink, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  Search,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SEOAnalysis } from '@/types';

const SEOAnalysisCard = ({ analysis }: { analysis?: SEOAnalysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-900/50';
    if (score >= 60) return 'bg-amber-900/50';
    return 'bg-rose-900/50';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-emerald-600';
    if (score >= 60) return 'from-amber-500 to-orange-600';
    return 'from-rose-500 to-rose-600';
  };

  const getScoreBorder = (score: number) => {
    if (score >= 80) return 'border-emerald-700';
    if (score >= 60) return 'border-amber-700';
    return 'border-rose-700';
  };

  // If no analysis is provided, show a form to enter a URL
  if (!analysis) {
    return (
      <motion.div 
        className="bg-slate-800/50 rounded-xl shadow-xl p-6 space-y-6 border border-slate-700 overflow-hidden relative backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Globe className="h-12 w-12 text-blue-400 mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-100 mb-2">SEO Analysis Tool</h2>
          <p className="text-slate-400 mb-6">Enter a website URL to analyze its SEO performance</p>
          
          <div className="max-w-md mx-auto">
            <div className="flex space-x-2">
              <input
                type="url"
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-700/50 text-slate-100 placeholder-slate-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-slate-100 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Analyze</span>
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-700">
            <BarChart3 className="h-8 w-8 text-blue-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-slate-100 text-center mb-1">Comprehensive Analysis</h3>
            <p className="text-slate-400 text-sm text-center">Detailed SEO metrics and insights</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-700">
            <TrendingUp className="h-8 w-8 text-emerald-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-slate-100 text-center mb-1">Performance Metrics</h3>
            <p className="text-slate-400 text-sm text-center">Page speed and optimization scores</p>
          </div>
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-700">
            <Globe className="h-8 w-8 text-violet-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-slate-100 text-center mb-1">Technical SEO</h3>
            <p className="text-slate-400 text-sm text-center">Crawling, indexing, and mobile optimization</p>
          </div>
        </div>
      </motion.div>
    );
  }

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
      className="bg-slate-800/50 rounded-xl shadow-xl p-3 space-y-4 border border-slate-700 overflow-hidden relative backdrop-blur-sm sm:p-4 md:p-6"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 via-transparent to-slate-900/30 pointer-events-none" />
      
      {/* Header */}
      <motion.div 
        className="flex flex-col items-center justify-between relative z-10 gap-3 sm:flex-row sm:gap-4"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-2 sm:space-x-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Globe className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
          </motion.div>
          <div>
            <h2 className="text-base font-bold text-slate-100 sm:text-lg md:text-xl">SEO Analysis Results</h2>
            <p className="text-xs text-slate-400 sm:text-sm">Comprehensive website audit</p>
          </div>
        </div>
        
        <motion.div 
          className={cn("px-3 py-1.5 rounded-lg text-sm font-bold flex items-center space-x-1.5 shadow-md border w-full sm:w-auto justify-center", getScoreBg(analysis.score), getScoreBorder(analysis.score))}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <TrendingUp className={cn("h-3.5 w-3.5", getScoreColor(analysis.score))} />
          <span className={getScoreColor(analysis.score)}>Score: {analysis.score}/100</span>
        </motion.div>
      </motion.div>

      {/* URL */}
      <motion.div 
        className="flex items-center space-x-2 text-slate-300 bg-slate-700/50 p-2.5 rounded-lg relative z-10 border border-slate-700 sm:p-3 md:p-4"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <ExternalLink className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 sm:h-4 sm:w-4" />
        <a 
          href={analysis.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-blue-300 transition-colors font-medium flex-1 truncate text-xs sm:text-sm"
        >
          {analysis.url}
        </a>
        <Eye className="h-3.5 w-3.5 text-slate-500 flex-shrink-0 sm:h-4 sm:w-4" />
      </motion.div>

      {/* Score Progress Circle */}
      <motion.div 
        className="flex justify-center relative z-10"
        variants={itemVariants}
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
          <svg className="w-20 h-20 transform -rotate-90 sm:w-24 sm:h-24 md:w-32 md:h-32" viewBox="0 0 36 36">
            <path
              className="text-slate-700"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className={cn("text-transparent")}
              stroke="url(#scoreGradient)"
              strokeWidth="2.5"
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
              className={cn("text-xl font-bold", getScoreColor(analysis.score))}
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
        className="grid grid-cols-1 gap-3 relative z-10 sm:grid-cols-2 sm:gap-4"
        variants={itemVariants}
      >
        <motion.div 
          className="space-y-2.5"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-semibold text-slate-100 flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full sm:w-2 sm:h-2"></div>
            <span className="text-xs sm:text-sm">Page Title</span>
          </h3>
          <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 p-2.5 rounded-lg border border-slate-700 sm:p-3 md:p-4">
            <p className="text-slate-200 font-medium text-xs sm:text-sm">
              {analysis.title || 'No title found'}
            </p>
            {analysis.title && (
              <motion.p 
                className="text-[0.6rem] mt-1.5 font-medium sm:text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {analysis.title.length} characters
                {analysis.title.length >= 30 && analysis.title.length <= 60 ? 
                  <span className="text-emerald-400 ml-1.5 flex items-center sm:ml-2">
                    <CheckCircle className="h-2.5 w-2.5 inline mr-1 sm:h-3 sm:w-3" />
                    Optimal
                  </span> : 
                  <span className="text-amber-400 ml-1.5 flex items-center sm:ml-2">
                    <AlertCircle className="h-2.5 w-2.5 inline mr-1 sm:h-3 sm:w-3" />
                    Needs improvement
                  </span>
                }
              </motion.p>
            )}
          </div>
        </motion.div>

        <motion.div 
          className="space-y-2.5"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-semibold text-slate-100 flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full sm:w-2 sm:h-2"></div>
            <span className="text-xs sm:text-sm">Meta Description</span>
          </h3>
          <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 p-2.5 rounded-lg border border-slate-700 sm:p-3 md:p-4">
            <p className="text-slate-200 text-xs sm:text-sm">
              {analysis.description || 'No description found'}
            </p>
            {analysis.description && (
              <motion.p 
                className="text-[0.6rem] mt-1.5 font-medium sm:text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {analysis.description.length} characters
                {analysis.description.length >= 120 && analysis.description.length <= 160 ? 
                  <span className="text-emerald-400 ml-1.5 flex items-center sm:ml-2">
                    <CheckCircle className="h-2.5 w-2.5 inline mr-1 sm:h-3 sm:w-3" />
                    Optimal
                  </span> : 
                  <span className="text-amber-400 ml-1.5 flex items-center sm:ml-2">
                    <AlertCircle className="h-2.5 w-2.5 inline mr-1 sm:h-3 sm:w-3" />
                    Needs improvement
                  </span>
                }
              </motion.p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Headings Structure */}
      <motion.div 
        className="space-y-3 relative z-10"
        variants={itemVariants}
      >
        <h3 className="font-semibold text-slate-100 flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full sm:w-2 sm:h-2"></div>
          <span className="text-xs sm:text-sm">Headings Structure</span>
        </h3>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6 sm:gap-2 md:gap-3">
          {Object.entries(analysis.headings).map(([tag, headings], index) => (
            <motion.div 
              key={tag} 
              className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-2 rounded-lg text-center border border-slate-700 shadow-sm sm:p-2.5 md:p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="font-bold text-emerald-400 text-xs sm:text-sm md:text-base">{tag.toUpperCase()}</div>
              <motion.div 
                className="text-lg font-bold text-emerald-300 mt-1 sm:text-xl md:text-2xl"
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

      {/* Images Analysis */}
      <motion.div 
        className="space-y-3 relative z-10"
        variants={itemVariants}
      >
        <h3 className="font-semibold text-slate-100 flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full sm:w-2 sm:h-2"></div>
          <span className="text-xs sm:text-sm">Images Analysis</span>
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          <motion.div 
            className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-2.5 rounded-lg border border-slate-700 sm:p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-[0.6rem] sm:text-xs">Total Images</span>
              <Globe className="h-3 w-3 text-amber-400 sm:h-4 sm:w-4" />
            </div>
            <div className="text-lg font-bold text-amber-400 mt-1 sm:text-xl">{analysis.images.total}</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-2.5 rounded-lg border border-slate-700 sm:p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-[0.6rem] sm:text-xs">With Alt Text</span>
              <CheckCircle className="h-3 w-3 text-emerald-400 sm:h-4 sm:w-4" />
            </div>
            <div className="text-lg font-bold text-emerald-400 mt-1 sm:text-xl">{analysis.images.withAlt}</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-2.5 rounded-lg border border-slate-700 sm:p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-[0.6rem] sm:text-xs">Missing Alt</span>
              <AlertCircle className="h-3 w-3 text-rose-400 sm:h-4 sm:w-4" />
            </div>
            <div className="text-lg font-bold text-rose-400 mt-1 sm:text-xl">{analysis.images.withoutAlt}</div>
          </motion.div>
        </div>
        
        {analysis.images.missingAlt.length > 0 && (
          <motion.div 
            className="bg-rose-900/20 border border-rose-800 rounded-lg p-2.5 mt-2 sm:p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <h4 className="font-medium text-rose-300 flex items-center text-xs sm:text-sm">
              <AlertCircle className="h-3 w-3 mr-1.5 sm:h-4 sm:w-4" />
              Images Missing Alt Text:
            </h4>
            <ul className="mt-1.5 space-y-1 max-h-20 overflow-y-auto text-[0.6rem] sm:text-xs">
              {analysis.images.missingAlt.slice(0, 3).map((src, index) => (
                <li key={index} className="text-rose-200 truncate" title={src}>
                  • {src}
                </li>
              ))}
              {analysis.images.missingAlt.length > 3 && (
                <li className="text-rose-300 text-[0.6rem] sm:text-xs">
                  ... and {analysis.images.missingAlt.length - 3} more
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </motion.div>

      {/* Links Analysis */}
      <motion.div 
        className="space-y-3 relative z-10"
        variants={itemVariants}
      >
        <h3 className="font-semibold text-slate-100 flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full sm:w-2 sm:h-2"></div>
          <span className="text-xs sm:text-sm">Links Analysis</span>
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          <motion.div 
            className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-2.5 rounded-lg border border-slate-700 sm:p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-[0.6rem] sm:text-xs">Internal Links</span>
              <Globe className="h-3 w-3 text-blue-400 sm:h-4 sm:w-4" />
            </div>
            <div className="text-lg font-bold text-blue-400 mt-1 sm:text-xl">{analysis.links.internal}</div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-2.5 rounded-lg border border-slate-700 sm:p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-[0.6rem] sm:text-xs">External Links</span>
              <ExternalLink className="h-3 w-3 text-violet-400 sm:h-4 sm:w-4" />
            </div>
            <div className="text-lg font-bold text-violet-400 mt-1 sm:text-xl">{analysis.links.external}</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Social Media */}
      <motion.div 
        className="space-y-3 relative z-10"
        variants={itemVariants}
      >
        <h3 className="font-semibold text-slate-100 flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-1.5 h-1.5 bg-violet-500 rounded-full sm:w-2 sm:h-2"></div>
          <span className="text-xs sm:text-sm">Social Media Optimization</span>
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          <motion.div 
            className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-2.5 rounded-lg border border-slate-700 sm:p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-[0.6rem] sm:text-xs">Open Graph Tags</span>
              {analysis.socialMedia.ogTitle ? (
                <CheckCircle className="h-3 w-3 text-emerald-400 sm:h-4 sm:w-4" />
              ) : (
                <AlertCircle className="h-3 w-3 text-rose-400 sm:h-4 sm:w-4" />
              )}
            </div>
            <div className="text-[0.6rem] text-slate-400 mt-1 sm:text-xs">
              {analysis.socialMedia.ogTitle ? 'Present' : 'Missing'}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-2.5 rounded-lg border border-slate-700 sm:p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-[0.6rem] sm:text-xs">Twitter Cards</span>
              {analysis.socialMedia.twitterTitle ? (
                <CheckCircle className="h-3 w-3 text-emerald-400 sm:h-4 sm:w-4" />
              ) : (
                <AlertCircle className="h-3 w-3 text-rose-400 sm:h-4 sm:w-4" />
              )}
            </div>
            <div className="text-[0.6rem] text-slate-400 mt-1 sm:text-xs">
              {analysis.socialMedia.twitterTitle ? 'Present' : 'Missing'}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Issues and Suggestions */}
      <div className="grid grid-cols-1 gap-3 relative z-10 sm:grid-cols-2 sm:gap-4">
        {analysis.issues.length > 0 && (
          <motion.div 
            className="space-y-2.5"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold text-slate-100 flex items-center space-x-1.5 sm:space-x-2">
              <AlertCircle className="h-3 w-3 text-rose-400 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Issues Found</span>
            </h3>
            <div className="bg-rose-900/20 border border-rose-800 rounded-lg p-2.5 sm:p-3">
              <ul className="space-y-1.5">
                {analysis.issues.slice(0, 3).map((issue, index) => (
                  <motion.li 
                    key={index} 
                    className="text-rose-200 flex items-start space-x-1.5 text-[0.6rem] sm:text-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <span className="text-rose-400 mt-0.5 font-bold text-[0.5rem">•</span>
                    <span className="font-medium">{issue}</span>
                  </motion.li>
                ))}
                {analysis.issues.length > 3 && (
                  <li className="text-rose-300 text-[0.6rem] sm:text-xs">
                    ... and {analysis.issues.length - 3} more issues
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}

        {analysis.suggestions.length > 0 && (
          <motion.div 
            className="space-y-2.5"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold text-slate-100 flex items-center space-x-1.5 sm:space-x-2">
              <CheckCircle className="h-3 w-3 text-emerald-400 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">Improvement Suggestions</span>
            </h3>
            <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg p-2.5 sm:p-3">
              <ul className="space-y-1.5">
                {analysis.suggestions.slice(0, 3).map((suggestion, index) => (
                  <motion.li 
                    key={index} 
                    className="text-emerald-200 flex items-start space-x-1.5 text-[0.6rem] sm:text-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <span className="text-emerald-400 mt-0.5 font-bold text-[0.5rem]">✓</span>
                    <span className="font-medium">{suggestion}</span>
                  </motion.li>
                ))}
                {analysis.suggestions.length > 3 && (
                  <li className="text-emerald-300 text-[0.6rem] sm:text-xs">
                    ... and {analysis.suggestions.length - 3} more suggestions
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SEOAnalysisCard;
