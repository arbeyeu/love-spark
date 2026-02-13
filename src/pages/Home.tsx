import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Romantic Background" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-rose-50/40 backdrop-blur-[2px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center max-w-2xl"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-white/80 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-rose-200/50"
        >
          <Heart className="w-10 h-10 text-primary fill-primary animate-pulse" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight tracking-tight drop-shadow-sm">
          Your <span className="text-primary">Love Story</span> Starts Here
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/80 mb-12 font-light leading-relaxed max-w-lg mx-auto">
          Embark on a magical journey to discover your match, compatibility, and craft the perfect proposal.
        </p>

        <Link to="/fictional-match">
          <Button size="lg" className="rounded-full px-10 py-8 text-xl bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/30">
            Begin Journey ❤️
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
