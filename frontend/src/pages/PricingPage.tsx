import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);

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
              className="px-2 py-1 text-yellow-300 border-b-2 border-yellow-400 hover:text-yellow-200 transition duration-300"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose the plan that's right for your journey to a more purposeful life.
          </p>
          <p className="text-blue-200 mt-3">
            <span className="bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded text-sm">Demo Pricing</span> The following plans represent example pricing tiers for illustration purposes.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 ${!isAnnual ? 'text-yellow-300 font-semibold' : 'text-blue-200'}`}>Monthly</span>
            <div
              className="relative w-14 h-7 bg-blue-900 rounded-full cursor-pointer"
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 ${
                  isAnnual 
                    ? 'bg-yellow-400 right-1' 
                    : 'bg-blue-300 left-1'
                }`}
              ></div>
            </div>
            <span className={`ml-3 ${isAnnual ? 'text-yellow-300 font-semibold' : 'text-blue-200'}`}>
              Annual <span className="text-sm font-normal px-2 py-1 bg-yellow-500/20 rounded-full text-yellow-300 ml-1">Save 20%</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-blue-900/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-blue-700"
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-blue-200">/forever</span>
              </div>
              <p className="text-blue-100 mb-6">Perfect for individuals just beginning their journey.</p>
              <Link 
                to="/register" 
                className="block w-full py-3 px-4 bg-blue-800 hover:bg-blue-700 text-center rounded-md transition duration-300"
              >
                Get Started Free
              </Link>
            </div>
            <div className="bg-blue-800/50 p-6">
              <h4 className="font-medium mb-4 text-blue-100">Features include:</h4>
              <ul className="space-y-3">
                {freePlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span className="text-blue-100">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-b from-blue-800/90 to-blue-900/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-yellow-400/50 transform md:scale-105 md:-translate-y-2 relative"
          >
            <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 uppercase rounded-bl-lg">
              MOST POPULAR
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${isAnnual ? '9.99' : '12.99'}</span>
                <span className="text-blue-200">/{isAnnual ? 'month' : 'month'}</span>
                <p className="text-sm text-yellow-300 mt-1">{isAnnual ? 'Billed annually ($119.88/year)' : ''}</p>
              </div>
              <p className="text-blue-100 mb-6">Full access to all features for serious goal achievers.</p>
              <Link 
                to="/register" 
                className="block w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-blue-600 text-center rounded-md transition duration-300 hover:shadow-lg hover:-translate-y-0.5 transform"
              >
                Start 14-Day Free Trial
              </Link>
            </div>
            <div className="bg-blue-800/50 p-6">
              <h4 className="font-medium mb-4 text-blue-100">Everything in Starter, plus:</h4>
              <ul className="space-y-3">
                {premiumPlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span className="text-blue-100">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-blue-900/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-blue-700"
          >
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${isAnnual ? '19.99' : '24.99'}</span>
                <span className="text-blue-200">/{isAnnual ? 'month' : 'month'}</span>
                <p className="text-sm text-yellow-300 mt-1">{isAnnual ? 'Billed annually ($239.88/year)' : ''}</p>
              </div>
              <p className="text-blue-100 mb-6">Advanced features for teams and organizations.</p>
              <Link 
                to="/register" 
                className="block w-full py-3 px-4 bg-blue-800 hover:bg-blue-700 text-center rounded-md transition duration-300"
              >
                Contact Sales
              </Link>
            </div>
            <div className="bg-blue-800/50 p-6">
              <h4 className="font-medium mb-4 text-blue-100">Everything in Premium, plus:</h4>
              <ul className="space-y-3">
                {enterprisePlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span className="text-blue-100">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-800/60">
                <h3 className="text-xl font-bold mb-3 text-yellow-300">{faq.question}</h3>
                <p className="text-blue-100">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Start your journey today with VisionTracker.
          </p>
          <Link 
            to="/register" 
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-md shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300 text-center font-semibold inline-block"
          >
            Get Started Free
          </Link>
          <p className="text-blue-300 mt-3">Example plans and pricing - subject to change.</p>
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

// Plan feature data
const freePlanFeatures = [
  "Core values identification",
  "Basic goal setting",
  "Simple habit tracker",
  "Limited vision board (3 items)",
  "Mobile app access"
];

const premiumPlanFeatures = [
  "Unlimited vision boards",
  "Advanced goal tracking",
  "Custom habit systems",
  "Daily planner integration",
  "Progress analytics",
  "Journaling tools",
  "Priority support"
];

const enterprisePlanFeatures = [
  "Team collaboration",
  "Organization-wide goals",
  "Admin dashboard",
  "Custom branding",
  "API access",
  "Dedicated account manager",
  "Training sessions"
];

// FAQ data
const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to your premium features until the end of your current billing cycle."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial of our Premium plan so you can experience all the features before committing. No credit card required to start your trial."
  },
  {
    question: "What happens to my data if I downgrade from Premium to Starter?",
    answer: "Your data will be preserved, but you'll lose access to premium features. If you have more than 3 vision board items, you'll need to select which ones to keep active."
  },
  {
    question: "Do you offer discounts for students or non-profits?",
    answer: "Yes, we offer special pricing for students, educators, and non-profit organizations. Please contact our support team for more information."
  }
];

export default PricingPage; 