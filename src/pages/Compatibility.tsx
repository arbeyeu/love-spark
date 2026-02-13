import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useJourney } from '@/context/JourneyContext';
import { Heart, Sparkles, Star } from 'lucide-react';

const Compatibility = () => {
  const navigate = useNavigate();
  const { updateState } = useJourney();
  const [calculating, setCalculating] = useState(false);
  const [score, setScore] = useState(0);

  // Auto-calculate simulation
  useEffect(() => {
    setCalculating(true);
    const interval = setInterval(() => {
      setScore(prev => {
        if (prev >= 98) {
          clearInterval(interval);
          setCalculating(false);
          updateState({ compatibilityScore: 98 });
          return 98;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-8 h-8 text-rose-300" />
            ) : i % 3 === 1 ? (
              <Sparkles className="w-6 h-6 text-purple-300" />
            ) : (
              <Star className="w-7 h-7 text-blue-300" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg text-center relative z-10"
      >
        <Card className="p-10 md:p-12 glass-card border-none shadow-2xl relative overflow-hidden">
          {/* Decorative gradient orbs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-blue-600 rounded-full blur-3xl opacity-20" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative mb-6"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Compatibility Match
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">Analyzing your cosmic connection...</p>

          {/* Premium circular progress */}
          <div className="relative w-56 h-56 mx-auto mb-10 flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400 via-purple-500 to-blue-600 opacity-20 blur-xl animate-pulse" />

            {/* SVG Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="6"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="6"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * score) / 100}
                strokeLinecap="round"
                className="transition-all duration-100"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(345, 55%, 50%)" />
                  <stop offset="50%" stopColor="hsl(280, 55%, 50%)" />
                  <stop offset="100%" stopColor="hsl(220, 55%, 50%)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-6xl font-bold bg-gradient-to-br from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                animate={{ scale: calculating ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.5, repeat: calculating ? Infinity : 0 }}
              >
                {score}%
              </motion.span>
              {!calculating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-1 mt-2"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {!calculating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-8 p-6 bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl border border-rose-100">
                <h3 className="text-2xl font-bold mb-2 text-rose-700">Perfect Match!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your energies align perfectly. You balance each other out like yin and yang. ✨
                </p>
              </div>

              <Button
                onClick={() => navigate('/proposal-form')}
                className="group relative w-full py-7 text-xl font-semibold bg-gradient-to-r from-rose-500 via-purple-500 to-blue-600 hover:from-rose-600 hover:via-purple-600 hover:to-blue-700 rounded-full shadow-xl shadow-rose-500/30 border-2 border-white/20 overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-2">
                  Plan Ideal Date
                  <Sparkles className="w-5 h-5" />
                </span>
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Compatibility;
