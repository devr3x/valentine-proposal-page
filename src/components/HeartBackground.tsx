import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const HeartBackground: React.FC = () => {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: '110vh', 
            opacity: 0, 
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 1, 1, 0],
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
        >
          <Heart className="text-primary/20 fill-primary/10" size={Math.random() * 30 + 20} />
        </motion.div>
      ))}
    </div>
  );
};

export default HeartBackground;
