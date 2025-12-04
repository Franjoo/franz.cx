import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Square, Circle, Triangle, Music, CheckCircle } from 'lucide-react';

// Geometric shapes animation
function GeometricBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Squares */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`square-${i}`}
          className="absolute border-2 border-black/10"
          style={{
            width: `${100 + i * 40}px`,
            height: `${100 + i * 40}px`,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
            scale: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}

      {/* Animated Circles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute border-2 border-black/10 rounded-full"
          style={{
            width: `${80 + i * 60}px`,
            height: `${80 + i * 60}px`,
            right: `${10 + i * 10}%`,
            bottom: `${15 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Animated Triangles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`triangle-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 13}%`,
            top: `${60 + (i % 3) * 10}%`,
          }}
          animate={{
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="border-2 border-black/10"
            style={{
              width: 0,
              height: 0,
              borderLeft: '30px solid transparent',
              borderRight: '30px solid transparent',
              borderBottom: '50px solid black',
              opacity: 0.1,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Feature card component
function FeatureCard({ icon, text, delay }: { icon: React.ReactNode; text: string; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-3 text-lg"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <span className="tracking-wide">{text}</span>
    </motion.div>
  );
}

// Screenshot gallery
function ScreenshotGallery() {
  const screenshots = [
    '/screenshots/flonk-1.png',
    '/screenshots/flonk-2.png',
    '/screenshots/flonk-3.png',
    '/screenshots/flonk-4.png',
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {screenshots.map((screenshot, index) => (
        <motion.div
          key={screenshot}
          className="aspect-[9/16] bg-black/5 border-2 border-black rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Placeholder for actual screenshots */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-sm">Screenshot {index + 1}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function FlonkLanding() {
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    setAnimateTitle(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <GeometricBackground />

      {/* Header */}
      <header className="relative z-10 px-8 py-6 border-b-2 border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
            FRANZ.CX
          </Link>
          <div className="flex gap-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-black text-white font-bold tracking-wider hover:bg-gray-800 transition-colors"
            >
              APP STORE
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-8 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Title */}
          <motion.h1
            className="text-8xl md:text-[12rem] lg:text-[16rem] font-black tracking-tighter leading-none"
            initial={{ opacity: 0, y: 50 }}
            animate={animateTitle ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            FLONK
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-2xl md:text-4xl font-bold tracking-tight max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={animateTitle ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Colourful fast-paced arcade game
            <br />
            <span className="text-lg md:text-2xl font-normal opacity-70">
              Easy to learn but hard to master
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={animateTitle ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-6 bg-black text-white text-xl font-bold tracking-wider hover:bg-gray-800 transition-colors"
            >
              DOWNLOAD NOW
            </a>
          </motion.div>

          {/* Warning Badge */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={animateTitle ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <span className="inline-block px-6 py-3 border-2 border-black text-sm font-bold tracking-wider">
              ⚠ DO NOT OVERESTIMATE YOURSELF
            </span>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-8 py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            FEATURES
          </motion.h2>

          <div className="space-y-6 max-w-2xl mx-auto">
            <FeatureCard
              icon={<Square className="w-6 h-6" />}
              text="Random generated levels"
              delay={0}
            />
            <FeatureCard
              icon={<Circle className="w-6 h-6" />}
              text="Various player skins"
              delay={0.1}
            />
            <FeatureCard
              icon={<Triangle className="w-6 h-6" />}
              text="Beautiful color patterns"
              delay={0.2}
            />
            <FeatureCard
              icon={<Music className="w-6 h-6" />}
              text="Unique soundtrack"
              delay={0.3}
            />
            <FeatureCard
              icon={<CheckCircle className="w-6 h-6" />}
              text="Lots of challenges"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="relative z-10 px-8 py-32">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            GAMEPLAY
          </motion.h2>

          <ScreenshotGallery />
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 px-8 py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            REACH THE THRONE
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto opacity-80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            FLONK is a minimalist arcade game that combines simple one-tap controls with
            increasingly challenging randomly generated levels. Navigate through geometric
            obstacles, collect power-ups, and prove your skills as you climb the leaderboard.
          </motion.p>

          <motion.div
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-6 border-2 border-white text-xl font-bold tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              DOWNLOAD ON APP STORE
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-12 border-t-2 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm opacity-70">
              © {new Date().getFullYear()} Franz Benthin. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/p/flonk/privacy" className="hover:opacity-70 transition-opacity">
                Privacy Policy
              </Link>
              <Link to="/p/flonk/terms" className="hover:opacity-70 transition-opacity">
                Terms of Service
              </Link>
              <Link to="/p/flonk/eula" className="hover:opacity-70 transition-opacity">
                EULA
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
