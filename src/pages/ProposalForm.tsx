import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useJourney } from '@/context/JourneyContext';
import { dateActivities, dateAmbiance, dateTimeSlots, specialTouches, dateLocations } from '@/data/romanticData';
import { Sparkles } from 'lucide-react';

const ProposalForm = () => {
  const navigate = useNavigate();
  const { state, updateState } = useJourney();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      partnerName: state.partnerName || '',
      activity: '',
      location: '',
      timeSlot: '',
      ambiance: '',
      specialTouch: [],
      personalMessage: ''
    }
  });

  const [selectedTouches, setSelectedTouches] = useState<string[]>([]);
  const selectedActivity = watch('activity');
  const selectedLocation = watch('location');
  const selectedTime = watch('timeSlot');
  const selectedAmbiance = watch('ambiance');

  const toggleSpecialTouch = (touchId: string) => {
    setSelectedTouches(prev =>
      prev.includes(touchId)
        ? prev.filter(id => id !== touchId)
        : [...prev, touchId]
    );
  };

  const onSubmit = (data: any) => {
    updateState({
      partnerName: data.partnerName,
      proposalDetails: {
        activity: dateActivities.find(a => a.id === data.activity),
        location: dateLocations.find(l => l.id === data.location),
        timeSlot: dateTimeSlots.find(t => t.id === data.timeSlot),
        ambiance: dateAmbiance.find(a => a.id === data.ambiance),
        specialTouches: selectedTouches.map(id => specialTouches.find(t => t.id === id)),
        personalMessage: data.personalMessage,
        theme: 'ideal-date'
      }
    });
    navigate('/proposal-view');
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      <div className="max-w-3xl mx-auto pt-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-br from-rose-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Plan Your Ideal Date
            </h1>
            <p className="text-lg text-muted-foreground">
              Create a fictional dream date straight out of a rom-com ✨
            </p>
          </div>

          <Card className="p-8 glass-card border-none shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Partner Name */}
              <div className="space-y-2">
                <Label htmlFor="partnerName" className="text-lg font-semibold">Who's your date? 💕</Label>
                <Input
                  id="partnerName"
                  {...register('partnerName', { required: true })}
                  className="h-14 text-lg bg-white/70 border-2 focus:border-rose-400"
                  placeholder="e.g. Aisha"
                />
              </div>

              {/* Date Activity */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Choose Your Activity 🎬</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dateActivities.map((activity) => (
                    <label
                      key={activity.id}
                      className={`relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all group ${selectedActivity === activity.id
                          ? 'ring-4 ring-rose-400 border-rose-400 scale-105'
                          : 'border-gray-200 hover:border-rose-300 hover:scale-102'
                        }`}
                    >
                      <input
                        type="radio"
                        value={activity.id}
                        {...register('activity')}
                        className="sr-only"
                      />
                      <div className="aspect-square relative">
                        <img
                          src={activity.image}
                          alt={activity.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <div className="text-2xl mb-1">{activity.icon}</div>
                          <div className="font-semibold text-sm leading-tight">{activity.name}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Pick Your Location 📍</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dateLocations.map((location) => (
                    <label
                      key={location.id}
                      className={`relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all ${selectedLocation === location.id
                          ? 'ring-4 ring-purple-400 border-purple-400'
                          : 'border-gray-200 hover:border-purple-300'
                        }`}
                    >
                      <input
                        type="radio"
                        value={location.id}
                        {...register('location')}
                        className="sr-only"
                      />
                      <div className="aspect-video relative">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="font-bold text-lg">{location.name}</div>
                          <div className="text-sm opacity-90">{location.description}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Slot */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">When's the magic happening? ⏰</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {dateTimeSlots.map((slot) => (
                    <label
                      key={slot.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${selectedTime === slot.id
                          ? 'bg-gradient-to-br from-rose-100 to-purple-100 border-rose-400 ring-2 ring-rose-400'
                          : 'bg-white/70 border-gray-200 hover:border-rose-300'
                        }`}
                    >
                      <input
                        type="radio"
                        value={slot.id}
                        {...register('timeSlot')}
                        className="sr-only"
                      />
                      <div className="text-3xl mb-2">{slot.icon}</div>
                      <div className="font-semibold text-sm">{slot.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{slot.time}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ambiance */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Set the Vibe ✨</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dateAmbiance.map((vibe) => (
                    <label
                      key={vibe.id}
                      className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedAmbiance === vibe.id
                          ? 'bg-gradient-to-br from-blue-100 to-purple-100 border-blue-400 ring-2 ring-blue-400'
                          : 'bg-white/70 border-gray-200 hover:border-blue-300'
                        }`}
                    >
                      <input
                        type="radio"
                        value={vibe.id}
                        {...register('ambiance')}
                        className="sr-only"
                      />
                      <div className="flex items-start space-x-3">
                        <span className="text-3xl">{vibe.icon}</span>
                        <div>
                          <div className="font-bold text-base">{vibe.name}</div>
                          <div className="text-sm text-muted-foreground">{vibe.description}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Touches */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Add Special Touches 💫 (Optional)</Label>
                <p className="text-sm text-muted-foreground">Select as many as you like!</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {specialTouches.map((touch) => (
                    <label
                      key={touch.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${selectedTouches.includes(touch.id)
                          ? 'bg-gradient-to-br from-amber-100 to-rose-100 border-amber-400 ring-2 ring-amber-400'
                          : 'bg-white/70 border-gray-200 hover:border-amber-300'
                        }`}
                      onClick={() => toggleSpecialTouch(touch.id)}
                    >
                      <div className="text-3xl mb-2">{touch.icon}</div>
                      <div className="font-semibold text-xs leading-tight">{touch.name}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Personal Message */}
              <div className="space-y-2">
                <Label htmlFor="personalMessage" className="text-lg font-semibold">Your Message 💌 (Optional)</Label>
                <Textarea
                  id="personalMessage"
                  {...register('personalMessage')}
                  className="bg-white/70 min-h-[120px] text-base border-2 focus:border-rose-400"
                  placeholder="Write something sweet for your date... ✨"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-7 text-xl rounded-full mt-8 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 hover:from-rose-600 hover:via-purple-600 hover:to-blue-600 shadow-xl"
              >
                Create My Dream Date ✨
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProposalForm;
