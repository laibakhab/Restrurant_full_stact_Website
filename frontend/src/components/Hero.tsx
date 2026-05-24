'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#27251F]">
      {/* Background with darker overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 bg-[#E31837] text-white text-xs font-black uppercase tracking-widest rounded-md mb-6">
            Karachi's #1 Choice
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-none uppercase italic tracking-tighter">
            Craving for <br />
            <span className="text-[#E31837]">Something Bold?</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
            The authentic taste of the streets, delivered with the speed of sound. No compromises, just pure flavor.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/menu" 
              className="btn-primary min-w-[200px]"
            >
              Order Now
            </Link>
            <Link 
              href="/contact" 
              className="btn-secondary min-w-[200px]"
            >
              Book Table
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-1 h-12 bg-gradient-to-b from-[#E31837] to-transparent rounded-full mx-auto"></div>
      </motion.div>
    </div>
  );
};

export default Hero;
