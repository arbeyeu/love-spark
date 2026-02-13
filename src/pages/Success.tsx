import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useJourney } from '@/context/JourneyContext';
import { Heart, Calendar, Music, User } from 'lucide-react';

const Success = () => {
  const { state } = useJourney();

  useEffect(() => {
    const end = Date.now() + 1000;
    const colors = ['#ff0000', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  return (
    <div className="min-h-screen p-6 bg-rose-50 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Journey is Complete ❤️</h1>
          <p className="text-xl text-muted-foreground">Here is the summary of your romantic adventure</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-none shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-100 rounded-full text-primary">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">The Couple</h3>
            </div>
            <p className="text-lg">Matched with <span className="font-bold text-primary">{state.fictionalMatch}</span></p>
            <p className="text-muted-foreground">Compatibility: {state.compatibilityScore}%</p>
          </Card>

          <Card className="p-6 border-none shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-100 rounded-full text-primary">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">The Date</h3>
            </div>
            <p className="font-medium">{state.datePlan?.location}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {state.datePlan?.flower} • {state.datePlan?.food}
            </p>
          </Card>

          <Card className="p-6 border-none shadow-lg hover:shadow-xl transition-shadow md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-100 rounded-full text-primary">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Your Song</h3>
            </div>
            <div className="bg-rose-50/50 p-4 rounded-lg">
              <p className="italic text-gray-700 text-center">"{state.songDetails?.lyrics.split('\n')[0]}..."</p>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" size="lg" className="rounded-full">
              Start New Journey
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
