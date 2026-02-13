import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fictionalCouples, partnerProfiles } from '@/data/romanticData';
import { useJourney } from '@/context/JourneyContext';
import { Heart, MapPin, Sparkles, Send, ChevronRight } from 'lucide-react';

const FictionalMatch = () => {
  const navigate = useNavigate();
  const { updateState } = useJourney();
  const [step, setStep] = useState(0);
  const [matchedCouple, setMatchedCouple] = useState<typeof fictionalCouples[0] | null>(null);
  const [partnerProfile, setPartnerProfile] = useState<typeof partnerProfiles[0] | null>(null);
  const [showPartnerCard, setShowPartnerCard] = useState(false);

  const questions = [
    {
      q: "On a free weekend, we are usually...",
      options: ["Binge-watching shows", "Trying new restaurants", "Hiking/Outdoors", "Sleeping in"]
    },
    {
      q: "Our arguments usually end with...",
      options: ["Laughing it off", "Logical discussion", "Someone giving in", "Food"]
    }
  ];

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const randomMatch = fictionalCouples[Math.floor(Math.random() * fictionalCouples.length)];
      const randomPartner = partnerProfiles[Math.floor(Math.random() * partnerProfiles.length)];
      setMatchedCouple(randomMatch);
      setPartnerProfile(randomPartner);
      updateState({ fictionalMatch: randomMatch.name, partnerName: randomPartner.name });
    }
  };

  const handleContinueToPartner = () => {
    setShowPartnerCard(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-300 to-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <AnimatePresence mode="wait">
        {!matchedCouple ? (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg relative z-10"
          >
            <Card className="p-10 md:p-12 glass-card border-none shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart className="w-8 h-8 text-white fill-white" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Personality Check
              </h2>
              <p className="text-center text-muted-foreground mb-10 text-lg">
                Question {step + 1} of {questions.length}
              </p>

              <div className="space-y-6">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl text-center mb-8 font-medium"
                >
                  {questions[step].q}
                </motion.p>

                <div className="grid gap-4">
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAnswer}
                      className="group p-5 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-rose-100 hover:border-rose-400 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all text-left shadow-sm hover:shadow-md flex items-center justify-between"
                    >
                      <span className="text-lg font-medium">{opt}</span>
                      <ChevronRight className="w-5 h-5 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ) : !showPartnerCard ? (
          <motion.div
            key="couple"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-lg relative z-10"
          >
            <Card className="overflow-hidden glass-card border-none shadow-2xl">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={matchedCouple.image}
                  alt={matchedCouple.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-end pb-8"
                >
                  <Sparkles className="w-8 h-8 text-amber-300 mb-3 animate-pulse" />
                  <h2 className="text-5xl font-bold text-white mb-2">{matchedCouple.name}</h2>
                  <p className="text-rose-200 font-medium tracking-wider uppercase text-sm">{matchedCouple.show}</p>
                </motion.div>
              </div>

              <div className="p-8 bg-gradient-to-br from-white to-rose-50/30">
                <p className="text-lg text-center text-muted-foreground mb-8 leading-relaxed italic">
                  "{matchedCouple.description}"
                </p>
                <Button
                  onClick={handleContinueToPartner}
                  className="group relative w-full py-7 text-xl font-semibold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:via-pink-600 hover:to-purple-700 rounded-full shadow-xl shadow-rose-500/30 border-2 border-white/20 overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center gap-2">
                    See Your Match
                    <Heart className="w-5 h-5 fill-current" />
                  </span>
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="partner"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg relative z-10"
          >
            <Card className="overflow-hidden glass-card border-none shadow-2xl">
              <div className="relative">
                <div className="h-96 overflow-hidden">
                  <motion.img
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={partnerProfile!.photo}
                    alt={partnerProfile!.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-6 left-6 right-6 text-white"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-4xl font-bold">
                      {partnerProfile!.name}, {partnerProfile!.age}
                    </h2>
                    <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {partnerProfile!.city}
                    </span>
                    <span>{partnerProfile!.zodiac}</span>
                  </div>
                </motion.div>
              </div>

              <div className="p-8 bg-gradient-to-br from-white to-purple-50/30">
                <p className="text-muted-foreground italic mb-6 text-lg text-center">
                  "{partnerProfile!.bio}"
                </p>
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                  {partnerProfile!.interests.map(interest => (
                    <Badge
                      key={interest}
                      className="bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border-none px-4 py-2 text-sm font-medium shadow-sm"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => navigate('/compatibility')}
                    variant="outline"
                    className="py-6 text-lg rounded-full border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-50"
                  >
                    Skip Date Planning
                  </Button>
                  <Button
                    onClick={() => navigate('/compatibility')}
                    className="group relative py-6 text-lg rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/30 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Plan Our Date
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FictionalMatch;
