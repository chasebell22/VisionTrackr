import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-500">
            VisionTracker
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/about" 
              className="px-2 py-1 text-white hover:text-yellow-200 transition duration-300"
            >
              About
            </Link>
            <Link 
              to="/pricing" 
              className="px-2 py-1 text-white hover:text-yellow-200 transition duration-300"
            >
              Pricing
            </Link>
            <Link 
              to="/resources" 
              className="px-2 py-1 text-yellow-300 border-b-2 border-yellow-400 hover:text-yellow-200 transition duration-300"
            >
              Resources
            </Link>
          </div>
          <div>
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-md text-white hover:text-yellow-200 transition duration-300"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="ml-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources & Learning Center</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore our collection of guides, articles, and tools to help you on your journey to purposeful living.
          </p>
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['all', 'values', 'goals', 'productivity', 'mindfulness', 'leadership'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-blue-900'
                  : 'bg-blue-800/50 text-blue-100 hover:bg-blue-700/50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="bg-blue-900/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-blue-800/60 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-600/20 z-10"></div>
                <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 uppercase z-20">
                  {resource.type}
                </div>
                <div className="h-full w-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-4xl">
                  {resource.icon}
                </div>
              </div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{resource.title}</h3>
                </div>
                <p className="text-blue-100 mb-4">{resource.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-blue-800/70 text-yellow-300 px-2 py-1 rounded-full">
                    {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                  </span>
                  {resource.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-blue-800/40 text-blue-200 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-6 pb-6 mt-auto">
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-2 bg-gradient-to-r from-yellow-400 to-blue-600 text-center rounded-md transition duration-300 hover:shadow-lg hover:-translate-y-0.5 transform"
                >
                  {resource.type === 'article' ? 'Read Article' 
                    : resource.type === 'guide' ? 'View Guide'
                    : resource.type === 'template' ? 'Get Template'
                    : 'Watch Video'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-800/70 to-blue-900/70 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-yellow-500/30 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Get Weekly Insights</h2>
              <p className="text-blue-100 mb-2">
                Subscribe to our newsletter for tips, strategies, and resources to help you live with greater purpose and achieve your goals.
              </p>
              <p className="text-blue-200 text-sm">
                Join our community of goal-focused individuals.
              </p>
            </div>
            <div className="md:w-1/2">
              <form className="space-y-3">
                <div>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 bg-blue-800/50 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-md transition duration-300 hover:shadow-lg hover:-translate-y-0.5 transform font-medium"
                >
                  Subscribe
                </button>
                <p className="text-xs text-blue-300 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Webinars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Sample Webinar Topics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-800/60">
              <div className="mb-4">
                <span className="text-xs font-medium bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
                <span className="text-xs font-medium bg-blue-800/50 text-blue-200 px-2 py-1 rounded-full ml-2">
                  60 min
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Aligning Daily Actions with Core Values</h3>
              <p className="text-blue-100 mb-3">Practical strategies to ensure your day-to-day activities reflect what matters most to you.</p>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-lg font-bold border border-yellow-400/50">
                  <span className="text-lg">👨‍🏫</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Presented by</p>
                  <p className="text-sm text-blue-300">Values & Psychology Expert</p>
                </div>
              </div>
              <a 
                href="#" 
                className="block w-full py-2 bg-blue-800 hover:bg-blue-700 text-center rounded-md transition duration-300"
              >
                Example Webinar
              </a>
            </div>
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-800/60">
              <div className="mb-4">
                <span className="text-xs font-medium bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
                <span className="text-xs font-medium bg-blue-800/50 text-blue-200 px-2 py-1 rounded-full ml-2">
                  45 min
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Productivity Systems That Actually Work</h3>
              <p className="text-blue-100 mb-3">Cut through the noise and discover productivity approaches that deliver real results.</p>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-lg font-bold border border-yellow-400/50">
                  <span className="text-lg">👩‍💻</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Presented by</p>
                  <p className="text-sm text-blue-300">Productivity Specialist</p>
                </div>
              </div>
              <a 
                href="#" 
                className="block w-full py-2 bg-blue-800 hover:bg-blue-700 text-center rounded-md transition duration-300"
              >
                Example Webinar
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950/50 backdrop-blur-sm py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-500 mb-2">
                VisionTracker
              </div>
              <p className="text-blue-300">Transform your vision into reality</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/login" className="text-blue-300 hover:text-yellow-400 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="text-blue-300 hover:text-yellow-400 transition duration-300">
                Sign Up
              </Link>
              <Link to="/about" className="text-blue-300 hover:text-yellow-400 transition duration-300">
                About
              </Link>
              <Link to="/pricing" className="text-blue-300 hover:text-yellow-400 transition duration-300">
                Pricing
              </Link>
              <Link to="/resources" className="text-blue-300 hover:text-yellow-400 transition duration-300">
                Resources
              </Link>
            </div>
          </div>
          <div className="border-t border-blue-800/30 mt-8 pt-8 text-center text-blue-400 text-sm">
            © {new Date().getFullYear()} VisionTracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Resources data
const resources = [
  {
    title: "Creating a Meaningful Vision Statement",
    description: "Learn how to craft a vision statement that truly resonates with your deepest values and aspirations.",
    category: "values",
    type: "guide",
    icon: "📝",
    tags: ["vision", "purpose", "clarity"],
    link: "#"
  },
  {
    title: "The SMART Goal Framework",
    description: "Master the art of setting Specific, Measurable, Achievable, Relevant, and Time-bound goals.",
    category: "goals",
    type: "article",
    icon: "🎯",
    tags: ["goal-setting", "planning"],
    link: "#"
  },
  {
    title: "Value Identification Worksheet",
    description: "Use this template to discover, define, and prioritize your core values to guide decision-making.",
    category: "values",
    type: "template",
    icon: "💎",
    tags: ["worksheet", "self-discovery"],
    link: "#"
  },
  {
    title: "Time-Blocking: The Ultimate Productivity System",
    description: "Learn how to implement time-blocking to maximize your focus and productivity.",
    category: "productivity",
    type: "video",
    icon: "⏱️",
    tags: ["time-management", "focus"],
    link: "#"
  },
  {
    title: "Daily Mindfulness Practices",
    description: "Simple mindfulness exercises you can incorporate into your daily routine for greater clarity and peace.",
    category: "mindfulness",
    type: "guide",
    icon: "🧘",
    tags: ["meditation", "presence"],
    link: "#"
  },
  {
    title: "Leading with Values",
    description: "How to align your leadership style with your core values for greater impact and fulfillment.",
    category: "leadership",
    type: "article",
    icon: "👑",
    tags: ["management", "influence"],
    link: "#"
  },
  {
    title: "Weekly Review Template",
    description: "A comprehensive template for conducting effective weekly reviews to stay on track with your goals.",
    category: "productivity",
    type: "template",
    icon: "📊",
    tags: ["reflection", "planning"],
    link: "#"
  },
  {
    title: "The Science of Habit Formation",
    description: "Understand the neurological basis of habits and how to leverage this knowledge for personal growth.",
    category: "productivity",
    type: "article",
    icon: "🧠",
    tags: ["habits", "psychology"],
    link: "#"
  },
  {
    title: "Purpose-Driven Decision Making",
    description: "A framework for making decisions that align with your core values and long-term vision.",
    category: "values",
    type: "guide",
    icon: "⚖️",
    tags: ["decisions", "clarity"],
    link: "#"
  }
];

export default ResourcesPage; 