import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars } from 'lucide-react';
import HeartBackground from './components/HeartBackground';
import { Button } from './components/ui/button';

const App: React.FC = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const phrases = [
    "¿No?",
    "¿Estás segura?",
    "¡Piénsalo de nuevo!",
    "¡Por fis!",
    "Te daré un chocolate 🍫",
    "¡No me digas que no!",
    "Mira este corazón: ❤️",
    "Me pondré triste... 😢",
    "¿De verdad?",
    "¡Haz clic en el Sí!"
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    // Move the button to a random position
    const newX = Math.random() * 200 - 100;
    const newY = Math.random() * 200 - 100;
    setNoButtonPos({ x: newX, y: newY });
  };

  const handleYesClick = useCallback(() => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff']
    });
  }, []);

  const yesButtonSize = noCount * 20 + 16;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HeartBackground />

      <main className="z-10 text-center max-w-md w-full">
        <AnimatePresence mode="wait">
          {!yesPressed ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="space-y-8"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-48 h-48 mx-auto flex items-center justify-center bg-white rounded-full shadow-2xl border-4 border-primary/20"
                >
                  <Heart className="w-24 h-24 text-primary fill-primary/20" />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 text-primary"
                >
                  <Stars size={32} />
                </motion.div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight px-4">
                  ¿Quieres ser mi pareja en <span className="text-primary italic">San Valentín</span>?
                </h1>
                <p className="text-muted-foreground text-lg">
                  Tengo una pregunta muy especial para ti...
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 min-h-[120px]">
                <Button
                  onClick={handleYesClick}
                  className="bg-primary hover:bg-primary/90 text-white font-bold transition-all hover:scale-110 shadow-lg"
                  style={{ fontSize: `${yesButtonSize}px`, padding: `${yesButtonSize / 2}px ${yesButtonSize}px` }}
                >
                  ¡SÍ!
                </Button>

                <motion.div
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <Button
                    variant="outline"
                    onClick={handleNoClick}
                    className="border-primary/20 hover:bg-secondary text-foreground font-medium transition-colors"
                  >
                    {getNoButtonText()}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-64 h-64 mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1518199266791-7399a9a3cf57?auto=format&fit=crop&q=80&w=800" 
                    alt="Celebration"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-primary"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        y: [-20, -100],
                        x: [0, (i % 2 === 0 ? 50 : -50)],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.3 
                      }}
                      style={{ 
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%` 
                      }}
                    >
                      <Heart size={20} fill="currentColor" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-primary text-glow italic">
                  ¡Sabía que dirías que sí!
                </h1>
                <p className="text-xl text-foreground font-medium">
                  Eres la persona más especial del mundo. ❤️
                </p>
                <div className="pt-4">
                  <p className="text-muted-foreground italic">
                    Prepárate para el mejor San Valentín de todos...
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="absolute bottom-8 text-muted-foreground/50 text-sm italic z-10">
        Hecho con amor para ti
      </footer>
    </div>
  );
};

export default App;
