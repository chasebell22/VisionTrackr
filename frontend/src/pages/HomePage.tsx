import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // SVG animation variants for staggered animation
  const eyeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Adding a subtle pulse animation for after the eye has loaded
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
    transition: {
      duration: 3,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatType: "mirror" as const
    }
  };

  const eyeElementVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const pupilVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 10,
        stiffness: 300,
        delay: 0.3
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.75,
      transition: { 
        duration: 0.8,
        delay: 0.5
      }
    }
  };

  const outerRingVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.7,
      rotate: -5
    },
    visible: { 
      opacity: 0.9, 
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-500">
            VisionTracker
          </div>
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
        
        {/* Mobile Navigation Menu */}
        <div className="md:hidden mt-4 pb-2">
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/about" 
              className="px-3 py-1 text-sm bg-blue-800/50 rounded-full text-white hover:bg-blue-700/50 transition duration-300"
            >
              About
            </Link>
            <Link 
              to="/pricing" 
              className="px-3 py-1 text-sm bg-blue-800/50 rounded-full text-white hover:bg-blue-700/50 transition duration-300"
            >
              Pricing
            </Link>
            <Link 
              to="/resources" 
              className="px-3 py-1 text-sm bg-blue-800/50 rounded-full text-white hover:bg-blue-700/50 transition duration-300"
            >
              Resources
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-16 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Don't Just Dream It.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-500">Make It Happen.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            Transform your ambitions into reality with VisionTracker. Our proven system turns abstract goals into daily actions, making success a deliberate journey, not just a distant hope.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 text-center font-semibold"
            >
              Start Your Free Trial
            </Link>
            <a 
              href="#features" 
              className="px-8 py-4 bg-transparent border-2 border-yellow-400 rounded-md hover:bg-blue-800/50 transition duration-300 text-center font-semibold"
            >
              See How It Works
            </a>
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative w-4/5 mx-auto">
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full blur opacity-75"
              variants={glowVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            ></motion.div>
            <div className="relative bg-blue-900/40 backdrop-blur-md rounded-full p-6 flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#1E40AF" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                  </radialGradient>
                  <radialGradient id="pupilGradient" cx="50%" cy="50%" r="50%" fx="75%" fy="25%">
                    <stop offset="0%" stopColor="#FCD34D" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </radialGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <motion.g
                  variants={eyeVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  whileInView={isVisible ? pulseAnimation : {}}
                >
                  {/* Improved stylized eye representing vision */}
                  <motion.ellipse 
                    cx="100" 
                    cy="100" 
                    rx="65" 
                    ry="40" 
                    fill="url(#heroGradient)" 
                    filter="url(#glow)"
                    variants={eyeElementVariants}
                  />
                  
                  {/* Eyelid */}
                  <motion.path 
                    d="M35,100 C65,60 135,60 165,100" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="3" 
                    opacity="0.7"
                    variants={eyeElementVariants}
                  />
                  <motion.path 
                    d="M35,100 C65,140 135,140 165,100" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="3" 
                    opacity="0.7"
                    variants={eyeElementVariants}
                  />
                  
                  {/* Improved iris */}
                  <motion.circle 
                    cx="100" 
                    cy="100" 
                    r="24" 
                    fill="url(#eyeGradient)"
                    variants={eyeElementVariants}
                  />
                  
                  {/* Improved pupil with highlight */}
                  <motion.circle 
                    cx="100" 
                    cy="100" 
                    r="12" 
                    fill="url(#pupilGradient)"
                    variants={pupilVariants}
                  />
                  <motion.circle 
                    cx="94" 
                    cy="94" 
                    r="4" 
                    fill="white" 
                    opacity="0.8"
                    variants={pupilVariants}
                    whileInView={{
                      opacity: [0.8, 1, 0.8],
                      scale: [1, 1.05, 1],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  />
                  
                  {/* Outer ring */}
                  <motion.path 
                    d="M100,30 Q140,50 165,100 Q140,150 100,170 Q60,150 35,100 Q60,50 100,30" 
                    fill="none" 
                    stroke="#FBBF24" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    opacity="0.9"
                    variants={outerRingVariants}
                    whileInView={{
                      rotate: [0, 1, -1, 0],
                      transition: {
                        duration: 8,
                        ease: "easeInOut",
                        times: [0, 0.33, 0.66, 1],
                        repeat: Infinity,
                        repeatType: "mirror" as const
                      }
                    }}
                  />
                  
                  {/* Compass marks - made more subtle */}
                  <motion.circle cx="100" cy="30" r="4" fill="#FBBF24" variants={eyeElementVariants} />
                  <motion.circle cx="35" cy="100" r="4" fill="#FBBF24" variants={eyeElementVariants} />
                  <motion.circle cx="100" cy="170" r="4" fill="#FBBF24" variants={eyeElementVariants} />
                  <motion.circle cx="165" cy="100" r="4" fill="#FBBF24" variants={eyeElementVariants} />
                </motion.g>
              </svg>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16 md:py-24">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Proven System For Achieving Your Dreams
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto">
            VisionTracker transforms wishful thinking into concrete results through a comprehensive approach to personal development and goal achievement:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-yellow-400/20 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-blue-600 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <motion.div 
          className="bg-gradient-to-r from-blue-800/70 to-blue-900/70 backdrop-blur-sm rounded-xl p-12 shadow-xl border border-yellow-500/30 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Will You Achieve In The Next 90 Days?
          </h2>
          <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-8">
            Join others who've discovered the power of purposeful goal-setting with VisionTracker. Your transformation begins with a single decision - and it costs nothing to start.
          </p>
          <Link 
            to="/register" 
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 text-center font-semibold inline-block"
          >
            Claim Your Free 14-Day Trial
          </Link>
          <p className="text-blue-300 mt-4">No credit card required. Cancel anytime. Risk-free.</p>
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
              <a href="#features" className="text-blue-300 hover:text-yellow-400 transition duration-300">
                Features
              </a>
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

// Feature data
const features = [
  {
    icon: "💎",
    title: "Core Values Discovery",
    description: "Unlock your authentic self through our comprehensive values assessment to create a foundation for confident decision-making."
  },
  {
    icon: "🎯",
    title: "Purpose Alignment",
    description: "Find your true north with our guided mission statement framework that helps clarify your life's purpose and direction."
  },
  {
    icon: "✨",
    title: "Visual Manifestation",
    description: "Our interactive vision board technology helps you visualize success, keeping your most important goals top of mind every day."
  },
  {
    icon: "🏆",
    title: "Strategic Goal Mapping",
    description: "Transform your ambitions into strategic, achievable milestones with our SMART goal system and planning tools."
  },
  {
    icon: "📝",
    title: "Daily Action System",
    description: "Our thoughtfully designed system breaks big goals into meaningful daily actions that fit your schedule and energy levels."
  },
  {
    icon: "📊",
    title: "Achievement Analytics",
    description: "Visualize your progress with clear metrics and celebrate wins to maintain motivation throughout your journey."
  }
];

export default HomePage; 