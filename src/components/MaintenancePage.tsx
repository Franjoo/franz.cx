import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

// ========== ANIMATED GRID BACKGROUND ==========
function AnimatedGrid() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.015]">
      {/* Vertical Lines */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-px h-full bg-current"
          style={{ left: `${i * 5}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 1.5,
            delay: i * 0.05,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}

      {/* Horizontal Lines */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-px w-full bg-current"
          style={{ top: `${i * 5}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.5,
            delay: i * 0.05,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </div>
  );
}

// ========== ROTATING GEOMETRIC SHAPE ==========
function RotatingCube() {
  return (
    <motion.div
      className="absolute top-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 opacity-20"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div className="w-full h-full border-2 border-current transform rotate-45" />
      <div className="absolute inset-0 w-full h-full border-2 border-current transform -rotate-45" />
    </motion.div>
  );
}

// ========== FLOATING PARTICLES ==========
function FloatingParticles() {
  const particles = [...Array(15)].map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-current rounded-full opacity-30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ========== KINETIC TYPOGRAPHY ==========
function KineticText() {
  const text = "CRAFTING SOMETHING SPECIAL";
  const words = text.split(" ");

  return (
    <div className="overflow-hidden">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="inline-block mr-4 md:mr-6 overflow-hidden">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: wordIndex * 0.3 + charIndex * 0.05,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ========== PROGRESS BAR ==========
function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress from 0 to 75% over 3 seconds
    const duration = 3000;
    const targetProgress = 75;
    const increment = targetProgress / (duration / 50);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= targetProgress) {
          clearInterval(timer);
          return targetProgress;
        }
        return Math.min(prev + increment, targetProgress);
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <div className="h-px bg-current/20 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-current"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs tracking-wider opacity-50">
        <span>LOADING</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

// ========== LIVE CLOCK ==========
function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm tracking-[0.3em] opacity-50 font-mono">
      BERLIN · {time}
    </div>
  );
}

// ========== MAIN MAINTENANCE PAGE ==========
export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-white text-black relative flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <AnimatedGrid />
      <FloatingParticles />
      <RotatingCube />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-16">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* Live Clock */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <LiveClock />
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-8">
            <motion.div
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <KineticText />
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed opacity-70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Building a digital experience that deserves your attention.
              <span className="block mt-4 text-lg opacity-50">
                Worth the wait.
              </span>
            </motion.p>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="w-full flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <ProgressBar />
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-6 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            <motion.a
              href="https://github.com/Franjoo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-current flex items-center justify-center hover:bg-black hover:border-white hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/franz-benthin/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-current flex items-center justify-center hover:bg-black hover:border-white hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:hi@franz.cx"
              className="w-12 h-12 border-2 border-current flex items-center justify-center hover:bg-black hover:border-white hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-wider opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 3.5, duration: 0.8 }}
          >
            ESTIMATED LAUNCH · Q1 2026
          </motion.div>
        </div>
      </div>

      {/* Animated Corner Element */}
      <motion.div
        className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 opacity-10"
        initial={{ x: -200, y: 200 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-full h-full border-t-2 border-l-2 border-current" />
      </motion.div>

      <motion.div
        className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-10"
        initial={{ x: 200, y: -200 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-full h-full border-b-2 border-r-2 border-current" />
      </motion.div>
    </div>
  );
}
