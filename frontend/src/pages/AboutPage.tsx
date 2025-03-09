import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutPage = () => {
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
              className="px-2 py-1 text-yellow-300 border-b-2 border-yellow-400 hover:text-yellow-200 transition duration-300"
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
              className="px-2 py-1 text-white hover:text-yellow-200 transition duration-300"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About VisionTracker</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Empowering individuals to live with purpose, clarity, and achievement.
          </p>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-8 mb-12 shadow-lg border border-blue-700"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300">Our Story</h2>
              <p className="text-blue-100 mb-4">
                VisionTracker was created to address a fundamental challenge many people face: connecting daily actions with long-term aspirations and core values.
              </p>
              <p className="text-blue-100 mb-4">
                We're building a comprehensive system that bridges this gap—a platform that helps you clarify what truly matters, envision your ideal future, and take meaningful steps toward it every day.
              </p>
              <p className="text-blue-100">
                Our goal is to create a tool that empowers individuals worldwide who are committed to living with greater purpose, clarity, and achievement.
              </p>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg blur opacity-75"></div>
                <div className="relative bg-blue-800/60 backdrop-blur-md rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-700/60 p-4 rounded-lg text-center">
                      <div className="text-yellow-300 text-3xl font-bold mb-1">Vision</div>
                      <div className="text-sm text-blue-100">Clarify Direction</div>
                    </div>
                    <div className="bg-blue-700/60 p-4 rounded-lg text-center">
                      <div className="text-yellow-300 text-3xl font-bold mb-1">Goals</div>
                      <div className="text-sm text-blue-100">Track Progress</div>
                    </div>
                    <div className="bg-blue-700/60 p-4 rounded-lg text-center">
                      <div className="text-yellow-300 text-3xl font-bold mb-1">Values</div>
                      <div className="text-sm text-blue-100">Define Priorities</div>
                    </div>
                    <div className="bg-blue-700/60 p-4 rounded-lg text-center">
                      <div className="text-yellow-300 text-3xl font-bold mb-1">Actions</div>
                      <div className="text-sm text-blue-100">Daily Steps</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Mission & Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Mission & Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-800/60">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-blue-100">
                To empower individuals to live with purpose by providing tools that bridge the gap between vision and daily action.
              </p>
            </div>
            
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-800/60">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Core Values</h3>
              <ul className="text-blue-100 list-disc list-inside space-y-1">
                <li>Authenticity</li>
                <li>Growth mindset</li>
                <li>Balance</li>
                <li>Integrity</li>
                <li>Excellence</li>
              </ul>
            </div>
            
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-800/60">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-blue-100">
                A world where every person lives with clarity, purpose, and fulfillment, making consistent progress toward their most meaningful goals.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Behind the Platform</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-800/60 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg text-2xl">
                🧠
              </div>
              <h3 className="text-xl font-bold mb-2">Psychology-Driven</h3>
              <p className="text-blue-100">Built on solid psychological principles of goal-setting, habit formation, and personal development.</p>
            </div>
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-800/60 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg text-2xl">
                💻
              </div>
              <h3 className="text-xl font-bold mb-2">Technology-Enhanced</h3>
              <p className="text-blue-100">Leveraging modern technology to create intuitive tools that make personal growth more accessible.</p>
            </div>
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-800/60 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg text-2xl">
                🤝
              </div>
              <h3 className="text-xl font-bold mb-2">User-Focused</h3>
              <p className="text-blue-100">Developed with continuous user feedback to ensure our platform meets real needs and delivers real results.</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already transforming their lives with VisionTracker.
          </p>
          <Link 
            to="/register" 
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 text-center font-semibold inline-block"
          >
            Try VisionTracker Free
          </Link>
          <p className="text-blue-300 mt-3">No credit card required. 14-day free trial.</p>
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

export default AboutPage; 