import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useJourney } from '@/context/JourneyContext';
import { proposalThemes } from '@/data/romanticData';

const ProposalForm = () => {
  const navigate = useNavigate();
  const { state, updateState } = useJourney();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      partnerName: state.partnerName || '',
      message: '',
      memory: '',
      tone: '',
      theme: 'classic'
    }
  });

  const selectedTheme = watch('theme');

  const onSubmit = (data: any) => {
    updateState({
      partnerName: data.partnerName,
      proposalDetails: {
        message: data.message,
        memory: data.memory,
        tone: data.tone,
        theme: data.theme,
        photo: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop'
      }
    });
    navigate('/proposal-view');
  };

  return (
    <div className="min-h-screen p-6 bg-rose-50/30">
      <div className="max-w-xl mx-auto pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-center mb-2">Craft Your Proposal</h1>
          <p className="text-center text-muted-foreground mb-8">Tell us a bit about your special someone</p>

          <Card className="p-8 glass-card border-none shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner's Name</Label>
                <Input 
                  id="partnerName" 
                  {...register('partnerName', { required: true })} 
                  className="h-12 text-lg bg-white/50"
                  placeholder="e.g. Aisha"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="memory">Favorite Memory</Label>
                <Textarea 
                  id="memory" 
                  {...register('memory')} 
                  className="bg-white/50 min-h-[100px]"
                  placeholder="That time we danced in the rain..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Proposal Message (Optional)</Label>
                <Textarea 
                  id="message" 
                  {...register('message')} 
                  className="bg-white/50 min-h-[100px]"
                  placeholder="Will you make me the happiest person..."
                />
              </div>

              <div className="space-y-2">
                <Label>Vibe</Label>
                <div className="grid grid-cols-2 gap-4">
                  {['Romantic', 'Fun', 'Emotional', 'Cheesy'].map((tone) => (
                    <label key={tone} className="flex items-center space-x-2 p-3 rounded-lg border bg-white/50 cursor-pointer hover:border-primary">
                      <input type="radio" value={tone.toLowerCase()} {...register('tone')} className="accent-primary" />
                      <span>{tone}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-2 gap-4">
                  {proposalThemes.map((theme) => (
                    <label 
                      key={theme.id} 
                      className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${selectedTheme === theme.id ? 'ring-2 ring-primary border-primary' : 'bg-white/50 hover:border-primary/50'}`}
                    >
                      <input 
                        type="radio" 
                        value={theme.id} 
                        {...register('theme')} 
                        className="sr-only" 
                      />
                      <span className="text-2xl">{theme.icon}</span>
                      <span className="font-medium">{theme.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full py-6 text-lg rounded-full mt-8">
                Generate Proposal ✨
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProposalForm;
