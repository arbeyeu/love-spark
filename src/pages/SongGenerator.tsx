import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useJourney } from '@/context/JourneyContext';
import { Music, Play, Pause, Share2 } from 'lucide-react';

const SongGenerator = () => {
  const navigate = useNavigate();
  const { state, updateState } = useJourney();
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [playing, setPlaying] = useState(false);

  const generateSong = () => {
    setGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      updateState({
        songDetails: {
          title: `Symphony of ${state.partnerName}`,
          style: 'Acoustic Ballad',
          lyrics: `(Verse 1)
Under the Versova sunset sky
Just you, the waves, and I
Your smile outshines the golden light
Making everything feel so right

(Chorus)
Oh ${state.partnerName}, my heart beats true
Every road leads me back to you
Like Ross and Rachel, we found our way
In your arms is where I'll stay

(Bridge)
From coffee dates to starlit nights
You're the spark that lights my life`
        }
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-rose-50 to-white flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {!generated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Dedicated Song Generator</h1>
            <p className="text-muted-foreground mb-8">
              We'll compose a unique song based on your journey, your match ({state.fictionalMatch}), and your story.
            </p>
            <Button 
              onClick={generateSong}
              disabled={generating}
              size="lg"
              className="px-12 py-6 text-lg rounded-full"
            >
              {generating ? 'Composing...' : 'Compose Song 🎵'}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 glass-card border-none shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 text-center">
                <h2 className="text-2xl font-medium text-primary mb-2">Symphony of {state.partnerName}</h2>
                <p className="text-sm text-muted-foreground mb-8 uppercase tracking-widest">Acoustic Ballad • Original Composition</p>

                <div className="bg-white/60 p-6 rounded-xl mb-8 max-h-64 overflow-y-auto shadow-inner">
                  <pre className="font-body text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
                    {state.songDetails?.lyrics}
                  </pre>
                </div>

                <div className="flex justify-center gap-4 mb-8">
                  <Button 
                    onClick={() => setPlaying(!playing)}
                    className="rounded-full w-16 h-16 p-0 flex items-center justify-center"
                  >
                    {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={() => {}}>
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                  <Button className="flex-1" onClick={() => navigate('/success')}>
                    Complete Journey →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SongGenerator;
