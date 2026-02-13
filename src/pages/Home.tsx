import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Video with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          {/* Fallback to image if video doesn't load */}
          <img
            src={heroBg}
            alt="Romantic Background"
            className="w-full h-full object-cover"
          />
        </video>
        {/* Stronger multi-layer overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/50 to-black/60" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 text-center max-w-4xl"
      >
        {/* Premium Icon Header */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="relative w-24 h-24 mx-auto mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 rounded-full blur-xl opacity-60 animate-pulse" />
          <div className="relative w-full h-full bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50">
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse" />
            <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </motion.div>

        {/* Premium Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight tracking-tight"
        >
          <span className="block text-white drop-shadow-2xl">Your</span>
          <span className="block bg-gradient-to-r from-rose-300 via-pink-200 to-purple-300 bg-clip-text text-transparent drop-shadow-lg animate-gradient">
            Love Story
          </span>
          <span className="block text-white drop-shadow-2xl">Starts Here</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl md:text-2xl text-white mb-12 font-light leading-relaxed max-w-2xl mx-auto"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)' }}
        >
          Embark on a magical journey to discover your match, compatibility, and plan your ideal fictional date.
        </motion.p>

        {/* Premium CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
        >
          <Link to="/fictional-match">
            <Button
              size="lg"
              className="group relative px-12 py-8 text-xl font-semibold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:via-pink-600 hover:to-purple-700 rounded-full shadow-2xl shadow-rose-500/50 border-2 border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-rose-500/60"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center gap-3">
                Begin Journey
                <Heart className="w-6 h-6 fill-current animate-pulse" />
              </span>
            </Button>
          </Link>
        </motion.div>

        {/* Subtle tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 text-white/80 text-sm tracking-widest uppercase"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
        >
          Where Fiction Meets Romance
        </motion.p>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent z-0" />
    </div>
  );
};

export default Home;
