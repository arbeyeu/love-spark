import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dateLocations, flowerOptions, giftOptions, foodOptions } from '@/data/romanticData';
import { useJourney } from '@/context/JourneyContext';
import { Check } from 'lucide-react';

const DatePlanner = () => {
  const navigate = useNavigate();
  const { updateState } = useJourney();
  const [selections, setSelections] = useState({
    location: '',
    flower: '',
    gift: '',
    food: ''
  });

  const handleSelect = (category: keyof typeof selections, value: string) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  };

  const isComplete = Object.values(selections).every(val => val !== '');

  const handleComplete = () => {
    updateState({ datePlan: selections });
    navigate('/song-generator');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen p-6 bg-rose-50/30">
      <div className="max-w-4xl mx-auto pt-8 pb-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Plan Your Perfect Date</h1>
        <p className="text-center text-muted-foreground mb-8">Curate every detail of your special evening</p>

        <Tabs defaultValue="location" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-8 bg-white/50 backdrop-blur">
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="flower">Flowers</TabsTrigger>
            <TabsTrigger value="gift">Gift</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
          </TabsList>

          <TabsContent value="location" className="mt-0">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {dateLocations.map(loc => (
                <motion.div key={loc.id} variants={itemVariants}>
                  <Card 
                    className={`cursor-pointer overflow-hidden transition-all ${selections.location === loc.name ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`}
                    onClick={() => handleSelect('location', loc.name)}
                  >
                    <div className="h-40 overflow-hidden">
                      <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{loc.name}</h3>
                        {selections.location === loc.name && <Check className="text-primary w-5 h-5" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{loc.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Reusable Selection Grid for other categories */}
          {[
            { value: 'flower', data: flowerOptions, key: 'flower' },
            { value: 'gift', data: giftOptions, key: 'gift' },
            { value: 'food', data: foodOptions, key: 'food' }
          ].map(section => (
            <TabsContent key={section.value} value={section.value}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {section.data.map(item => (
                  <Card 
                    key={item.id}
                    className={`p-6 cursor-pointer text-center transition-all ${selections[section.key as keyof typeof selections] === item.name ? 'ring-2 ring-primary bg-rose-50' : 'hover:bg-white/80'}`}
                    onClick={() => handleSelect(section.key as keyof typeof selections, item.name)}
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-medium">{item.name}</h3>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur border-t flex justify-center z-50">
          <Button 
            onClick={handleComplete}
            disabled={!isComplete}
            size="lg"
            className="w-full max-w-md rounded-full shadow-lg"
          >
            {isComplete ? 'Create Our Song →' : 'Please select one from each category'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatePlanner;
