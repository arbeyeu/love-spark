import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fictionalCouples, partnerProfiles } from '@/data/romanticData';
import { useJourney } from '@/context/JourneyContext';
import { Heart, MapPin, Sparkles, Send } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-rose-50/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {!matchedCouple ? (
          <Card className="p-8 glass-card border-none">
            <h2 className="text-3xl font-bold text-center mb-8">Personality Check</h2>
            <div className="space-y-6">
              <p className="text-xl text-center mb-6">{questions[step].q}</p>
              <div className="grid gap-4">
                {questions[step].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAnswer}
                    className="p-4 rounded-xl bg-white border border-rose-100 hover:border-primary/50 hover:bg-rose-50 transition-all text-left"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>
        ) : !showPartnerCard ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <Card className="overflow-hidden glass-card border-none shadow-2xl shadow-rose-200/50">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={matchedCouple.image} 
                  alt={matchedCouple.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
                  <h2 className="text-4xl font-bold text-white">{matchedCouple.name}</h2>
                </div>
              </div>
              <div className="p-8">
                <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">{matchedCouple.show}</p>
                <p className="text-lg text-muted-foreground mb-8">{matchedCouple.description}</p>
                <Button 
                  onClick={handleContinueToPartner}
                  className="w-full py-6 text-lg rounded-full"
                >
                  See Your Match →
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <Card className="overflow-hidden glass-card border-none shadow-2xl shadow-rose-200/50">
              <div className="relative">
                <div className="h-72 overflow-hidden">
                  <img 
                    src={partnerProfile!.photo} 
                    alt={partnerProfile!.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 text-left text-white">
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    {partnerProfile!.name}, {partnerProfile!.age}
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </h2>
                  <p className="flex items-center gap-1 text-white/80 text-sm mt-1">
                    <MapPin className="w-4 h-4" /> {partnerProfile!.city}
                    <span className="ml-2">{partnerProfile!.zodiac}</span>
                  </p>
                </div>
              </div>
              <div className="p-6 text-left">
                <p className="text-muted-foreground italic mb-4">"{partnerProfile!.bio}"</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {partnerProfile!.interests.map(interest => (
                    <Badge key={interest} variant="secondary" className="bg-rose-100 text-rose-700 border-none">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => navigate('/compatibility')}
                    variant="outline"
                    className="py-6 text-lg rounded-full border-2"
                  >
                    Skip Proposal
                  </Button>
                  <Button 
                    onClick={() => navigate('/compatibility')}
                    className="py-6 text-lg rounded-full flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" /> Send Proposal
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FictionalMatch;
