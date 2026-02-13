import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useJourney } from '@/context/JourneyContext';

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-rose-50/30">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-lg text-center"
      >
        <Card className="p-8 glass-card border-none">
          <h2 className="text-3xl font-bold mb-2">Compatibility Match</h2>
          <p className="text-muted-foreground mb-8">Analyzing your connection...</p>
          
          <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * score) / 100}
                strokeLinecap="round"
                className="transition-all duration-100"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{score}%</span>
            </div>
          </div>

          {!calculating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-semibold mb-2">Perfect Match!</h3>
              <p className="text-muted-foreground mb-8">
                Your energies align perfectly. You balance each other out like yin and yang.
              </p>
              <Button 
                onClick={() => navigate('/proposal-form')}
                className="w-full py-6 text-lg rounded-full animate-pulse-glow"
              >
                Create Proposal →
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Compatibility;
