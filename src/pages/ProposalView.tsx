import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { useJourney } from '@/context/JourneyContext';
import { Heart } from 'lucide-react';

const ProposalView = () => {
  const navigate = useNavigate();
  const { state } = useJourney();
  const [accepted, setAccepted] = useState(false);

  const handleYes = () => {
    setAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ffa500', '#ffffff']
    });

    // Fire fireworks
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffa500']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffa500']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  if (!state.proposalDetails) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center relative"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=1920&auto=format&fit=crop)' }}>
      
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {accepted && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-heart text-rose-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: '100%',
                fontSize: `${Math.random() * 2 + 1}rem`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl text-center border border-white/50"
      >
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="proposal"
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-8 font-display text-gray-900">
                {state.partnerName}
              </h1>
              
              <div className="mb-8 p-6 bg-rose-50 rounded-xl italic text-lg md:text-xl text-gray-700 leading-relaxed">
                "{state.proposalDetails.memory}"
              </div>

              <p className="text-2xl md:text-3xl font-medium mb-12 text-gray-800">
                {state.proposalDetails.message || "Will you be mine forever?"}
              </p>

              <div className="flex justify-center gap-6">
                <Button 
                  onClick={handleYes}
                  size="lg" 
                  className="px-12 py-8 text-xl rounded-full bg-primary hover:bg-primary/90 hover:scale-110 transition-transform shadow-lg shadow-primary/30"
                >
                  YES ❤️
                </Button>
                <Button 
                  onClick={handleYes}
                  size="lg" 
                  variant="outline"
                  className="px-12 py-8 text-xl rounded-full hover:bg-rose-50 hover:scale-110 transition-transform border-2"
                >
                  YES 💍
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-rose-100 rounded-full">
                  <Heart className="w-16 h-16 text-primary fill-primary animate-pulse" />
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-4">She Said Yes! 🎉</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Congratulations on your forever journey!
              </p>
              <Button 
                onClick={() => navigate('/date-planner')}
                className="w-full py-6 text-lg rounded-full"
              >
                Plan Our First Date →
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProposalView;
