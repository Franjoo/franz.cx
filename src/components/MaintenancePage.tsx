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
function RotatingCube({ cubeRef, isDarkMode }: { cubeRef: React.RefObject<HTMLDivElement | null>; isDarkMode: boolean }) {
  const rotationVariants = {
    light: { rotate: 360 },
    dark: { rotate: -360 }
  };

  return (
    <div
      ref={cubeRef}
      className="absolute top-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 cursor-pointer"
    >
      <motion.div
        className="w-full h-full opacity-20 pointer-events-none"
        variants={rotationVariants}
        animate={isDarkMode ? "dark" : "light"}
        transition={{
          duration: isDarkMode ? 6.67 : 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full border-2 border-current transform rotate-45" />
        <div className="absolute inset-0 w-full h-full border-2 border-current transform -rotate-45" />
      </motion.div>
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [hasTriggeredAchievement, setHasTriggeredAchievement] = useState(false);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cubeRef.current) {
        const rect = cubeRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setIsDarkMode(isInside);

        // Trigger achievement notification on first dark mode entry
        if (isInside && !hasTriggeredAchievement) {
          setShowAchievement(true);
          setHasTriggeredAchievement(true);

          // Hide achievement after 3 seconds
          setTimeout(() => {
            setShowAchievement(false);
          }, 3000);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasTriggeredAchievement]);

  return (
    <div className={`min-h-screen relative flex items-center justify-center overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Animated Background Elements */}
      <AnimatedGrid />
      <RotatingCube cubeRef={cubeRef} isDarkMode={isDarkMode} />

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className="fixed top-8 right-8 z-50"
            initial={{ x: 400, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 400, opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.6,
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 blur-xl rounded-lg bg-black/10" />

              {/* Main notification card */}
              <div className="relative px-4 py-2 border backdrop-blur-sm bg-white/90 border-black text-black">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="text-xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.3, duration: 0.5, times: [0, 0.6, 1] }}
                  >
                    +1
                  </motion.div>
                  <motion.div
                    className="text-sm font-medium tracking-wide"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    for curiosity
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className={`w-12 h-12 border-2 border-current flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'hover:bg-white hover:border-black hover:text-black' : 'hover:bg-black hover:border-white hover:text-white'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/franz-benthin/"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 border-2 border-current flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'hover:bg-white hover:border-black hover:text-black' : 'hover:bg-black hover:border-white hover:text-white'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:hi@franz.cx"
              className={`w-12 h-12 border-2 border-current flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'hover:bg-white hover:border-black hover:text-black' : 'hover:bg-black hover:border-white hover:text-white'}`}
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

          {/* Copyright Notice */}
          <motion.div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs tracking-wide opacity-25 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 4, duration: 0.8 }}
          >
            © 2025 Franz Benthin
          </motion.div>
        </div>
      </div>

      {/* Animated Corner Element */}
      <motion.div
        className="hidden md:block absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 opacity-10"
        initial={{ x: -200, y: 200 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-full h-full border-t-2 border-l-2 border-current" />
      </motion.div>

      <motion.div
        className="hidden md:block absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 opacity-10"
        initial={{ x: 200, y: -200 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="w-full h-full border-b-2 border-r-2 border-current" />
      </motion.div>
    </div>
  );
}
