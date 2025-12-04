import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, Calendar, Code2, Users } from 'lucide-react';
import MaintenancePage from './components/MaintenancePage';

// Lazy load project modules for optimal performance
const FlonkProject = lazy(() => import('./pages/flonk/FlonkProject'));

// ========== TYPES ==========
interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  tech: string[];
  impact?: string;
  gradient: string;
}

interface ProjectCategory {
  title: string;
  subtitle: string;
  projects: Project[];
}

// ========== PRELOADER ==========
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-end justify-end p-8"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="text-white text-6xl md:text-8xl font-bold tracking-tighter">
        {progress}%
      </div>
    </motion.div>
  );
}

// ========== MAGNETIC BUTTON ==========
function MagneticButton({
  children,
  className = '',
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const strength = 0.3;
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ========== DARK MODE TOGGLE ==========
function DarkModeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <MagneticButton
      onClick={onToggle}
      className="fixed top-8 right-8 z-40 px-6 py-3 border-2 border-current text-sm tracking-wider hover:bg-current hover:text-[var(--bg)] transition-colors duration-300"
    >
      {isDark ? 'LIGHT' : 'DARK'}
    </MagneticButton>
  );
}

// ========== ABSTRACT ART CARD ==========
function AbstractArtCard({ gradient }: { gradient: string }) {
  const patterns: Record<string, React.ReactElement> = {
    'alpha': (
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-black" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-white rotate-45 opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-4 border-white rounded-full opacity-30" />
        <div className="absolute top-1/2 left-1/2 w-40 h-1 bg-white -translate-x-1/2 -translate-y-1/2 rotate-12" />
      </div>
    ),
    'neon': (
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-black" />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-1 bg-white opacity-20"
            style={{
              top: `${20 + i * 15}%`,
              transform: `skewY(-${i * 5}deg)`,
            }}
          />
        ))}
        <div className="absolute bottom-4 right-4 w-16 h-16 bg-white opacity-40 rounded-full blur-xl" />
      </div>
    ),
    'grid': (
      <div className="w-full h-full relative overflow-hidden bg-black">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-4">
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className="border border-white opacity-20"
              style={{
                opacity: Math.random() > 0.5 ? 0.4 : 0.1,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-60" />
      </div>
    ),
    'waves': (
      <div className="w-full h-full relative overflow-hidden bg-black">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-8 border-t border-white opacity-10"
            style={{
              top: `${i * 12.5}%`,
              transform: `scaleX(${1 - i * 0.05})`,
            }}
          />
        ))}
      </div>
    ),
    'circles': (
      <div className="w-full h-full relative overflow-hidden bg-black">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-white rounded-full opacity-20"
            style={{
              width: `${(i + 1) * 80}px`,
              height: `${(i + 1) * 80}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    ),
    'diagonal': (
      <div className="w-full h-full relative overflow-hidden bg-black">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-full bg-white opacity-10"
            style={{
              left: `${i * 8.33}%`,
              transform: 'skewX(-15deg)',
            }}
          />
        ))}
      </div>
    ),
  };

  return patterns[gradient] || patterns['alpha'];
}

// ========== PROJECT DETAILS PANEL ==========
function ProjectDetailsPanel({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="overflow-hidden border-t border-current"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 py-12 px-4 md:px-8">
        {/* Visual */}
        <div className="lg:col-span-1">
          <div className="aspect-[4/3] rounded-lg overflow-hidden border border-current">
            <AbstractArtCard gradient={project.gradient} />
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h4 className="text-2xl md:text-4xl font-bold tracking-tighter mb-4">
              {project.tagline}
            </h4>
            <p className="text-base md:text-lg leading-relaxed opacity-70">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 opacity-50">
                <Users className="w-4 h-4" />
                <span className="text-sm tracking-wider">ROLE</span>
              </div>
              <div className="font-medium">{project.role}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2 opacity-50">
                <Calendar className="w-4 h-4" />
                <span className="text-sm tracking-wider">YEAR</span>
              </div>
              <div className="font-medium">{project.year}</div>
            </div>

            {project.impact && (
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-50">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm tracking-wider">IMPACT</span>
                </div>
                <div className="font-medium">{project.impact}</div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 opacity-50">
              <Code2 className="w-4 h-4" />
              <span className="text-sm tracking-wider">TECH STACK</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 border border-current text-xs tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ========== WORK SECTION ==========
function WorkSection() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const categories: ProjectCategory[] = [
    {
      title: 'STUDIO',
      subtitle: 'Client Collaborations',
      projects: [
        {
          id: 'alpha',
          name: 'QuantumPay',
          tagline: 'Real-time payment infrastructure for emerging markets',
          description: 'Led the development of a distributed payment processing system handling 50M+ transactions monthly across 12 countries. Built microservices architecture with event-sourcing for financial compliance and audit trails. Reduced transaction latency by 73% while maintaining 99.99% uptime.',
          role: 'Lead Engineer',
          year: '2023-2024',
          tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'AWS', 'Docker', 'Kubernetes'],
          impact: '50M+ transactions/month',
          gradient: 'alpha'
        },
        {
          id: 'neon',
          name: 'StreamEdge',
          tagline: 'Low-latency video delivery platform',
          description: 'Architected a CDN-optimized streaming platform supporting 2M concurrent viewers with adaptive bitrate streaming. Implemented WebRTC for real-time chat and HLS for scalable video delivery. Custom player built with React and integrated analytics pipeline processing 500GB daily.',
          role: 'Senior Full-Stack Engineer',
          year: '2022-2023',
          tech: ['React', 'TypeScript', 'Go', 'WebRTC', 'FFmpeg', 'GCP', 'Redis', 'MongoDB'],
          impact: '2M concurrent users',
          gradient: 'neon'
        },
        {
          id: 'grid',
          name: 'DataLoom',
          tagline: 'Enterprise data visualization suite',
          description: 'Designed and built a real-time analytics dashboard for Fortune 500 clients. Custom WebGL rendering engine for handling 1M+ data points with 60fps performance. Integrated with 20+ data sources including Salesforce, Snowflake, and custom APIs. Modular plugin system for extensibility.',
          role: 'Technical Lead',
          year: '2021-2022',
          tech: ['React', 'D3.js', 'WebGL', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
          impact: 'Used by 500+ analysts',
          gradient: 'grid'
        },
      ]
    },
    {
      title: 'LAB',
      subtitle: 'Personal Experiments',
      projects: [
        {
          id: 'neural',
          name: 'Neural Canvas',
          tagline: 'AI-powered generative art platform',
          description: 'Built an experimental platform exploring the intersection of machine learning and creative coding. Implemented custom GAN models for style transfer and integrated Stable Diffusion for text-to-image generation. Real-time collaboration features with WebSocket and operational transforms.',
          role: 'Solo Developer',
          year: '2024',
          tech: ['Next.js', 'Python', 'PyTorch', 'WebSocket', 'Supabase', 'Vercel'],
          gradient: 'waves'
        },
        {
          id: 'syntax',
          name: 'SyntaxForge',
          tagline: 'Developer productivity toolkit',
          description: 'Open-source collection of CLI tools and VS Code extensions for modern web development. Features include smart code snippets, automated refactoring patterns, and custom ESLint rules. Adopted by 5K+ developers with 200+ GitHub stars.',
          role: 'Creator & Maintainer',
          year: '2023-Present',
          tech: ['TypeScript', 'Node.js', 'VS Code API', 'Rust', 'WebAssembly'],
          impact: '5K+ downloads',
          gradient: 'circles'
        },
        {
          id: 'soundwave',
          name: 'SoundWave',
          tagline: 'Spatial audio visualization engine',
          description: 'WebGL-based audio visualizer with real-time frequency analysis and 3D particle systems. Experimenting with Web Audio API and shader programming. Support for multiple visualization modes and MIDI controller integration.',
          role: 'Solo Developer',
          year: '2023',
          tech: ['Three.js', 'GLSL', 'Web Audio API', 'React', 'TypeScript'],
          gradient: 'diagonal'
        },
      ]
    }
  ];

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section className="min-h-screen px-8 py-32">
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          SELECTED WORK
        </motion.h2>

        <div className="space-y-32">
          {categories.map((category, categoryIndex) => (
            <div key={category.title}>
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">
                  {category.title}
                </h3>
                <p className="text-lg opacity-50 tracking-wide">{category.subtitle}</p>
              </motion.div>

              <div className="space-y-1">
                {category.projects.map((project, index) => (
                  <div key={project.id}>
                    <motion.div
                      className="relative border-t border-current cursor-pointer group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => toggleProject(project.id)}
                    >
                      <div className="flex items-center justify-between py-8 px-4 md:px-8 hover:bg-current/5 transition-colors">
                        <div className="flex items-baseline gap-4 md:gap-8 flex-1">
                          <span className="text-sm opacity-50 min-w-[2rem]">
                            0{index + 1}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                              {project.name}
                            </h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="hidden md:block text-sm tracking-wider opacity-70">
                            {project.year}
                          </span>
                          <motion.div
                            animate={{ rotate: expandedProject === project.id ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <ProjectDetailsPanel project={project} />
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="border-t border-current" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== HERO SECTION ==========
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleContact = () => {
    window.location.href = 'mailto:your.email@example.com';
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center px-8 relative"
      style={{ y, opacity }}
    >
      <div className="w-full max-w-7xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-sm md:text-base tracking-[0.3em] opacity-50 mb-4">
            SENIOR SOFTWARE ENGINEER
          </div>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-[10rem] lg:text-[14rem] font-bold tracking-tighter leading-[0.9] mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          BUILDING<br />
          SYSTEMS<br />
          THAT SCALE
        </motion.h1>

        <motion.div
          className="max-w-3xl mb-16 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl leading-relaxed opacity-80">
            I architect resilient distributed systems and craft interfaces people love.
            <span className="opacity-50"> 8 years deep in the intersection of engineering precision and design thinking.</span>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MagneticButton
            onClick={handleContact}
            className="px-12 py-6 border-2 border-current text-lg tracking-wider hover:bg-current hover:text-[var(--bg)] transition-colors duration-300"
          >
            LET'S TALK
          </MagneticButton>
          <MagneticButton
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-6 border-2 border-current text-lg tracking-wider hover:bg-current hover:text-[var(--bg)] transition-colors duration-300"
          >
            VIEW WORK
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-16 bg-current opacity-30" />
      </motion.div>
    </motion.section>
  );
}

// ========== ABOUT/STACK SECTION ==========
function AboutSection() {
  const expertise = [
    {
      category: 'FRONTEND',
      items: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion', 'Three.js']
    },
    {
      category: 'BACKEND',
      items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'GraphQL']
    },
    {
      category: 'INFRASTRUCTURE',
      items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Monitoring']
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-32">
      <div className="w-full max-w-6xl">
        <motion.h2
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          EXPERTISE
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold tracking-tighter mb-6">Background</h3>
            <div className="space-y-4 text-lg leading-relaxed opacity-80">
              <p>
                Spent the last 8 years building products that millions of people use every day.
                From fintech infrastructure processing billions in transactions to real-time systems
                serving millions of concurrent users.
              </p>
              <p>
                I believe great software is invisible. It's fast, reliable, and feels natural.
                My approach blends technical rigor with design sensibility—because users don't
                care about your stack, they care about their experience.
              </p>
              <p>
                When I'm not shipping features, I'm contributing to open-source, mentoring junior
                engineers, or experimenting with emerging technologies in my personal lab.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold tracking-tighter mb-6">Core Values</h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Performance First',
                  desc: 'Every millisecond matters. Obsessed with optimization and efficiency.'
                },
                {
                  title: 'User-Centric',
                  desc: 'Technology serves people, not the other way around.'
                },
                {
                  title: 'Continuous Learning',
                  desc: 'The field evolves daily. Staying curious is non-negotiable.'
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-xl font-bold mb-2">{value.title}</div>
                  <div className="opacity-70">{value.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold tracking-tighter mb-8">Tech Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((category, catIndex) => (
              <div key={category.category}>
                <div className="text-sm tracking-wider opacity-50 mb-4">
                  {category.category}
                </div>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item}
                      className="border border-current px-4 py-3 text-center hover:bg-current hover:text-[var(--bg)] transition-colors duration-300 cursor-default"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + itemIndex * 0.05 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ========== FOOTER ==========
function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-current px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-none">
              LET'S BUILD<br />SOMETHING
            </h3>
            <p className="text-lg opacity-70 mb-8 max-w-md">
              Open to consulting, contract work, and interesting collaborations.
              If you're working on something ambitious, let's talk.
            </p>
            <a
              href="mailto:your.email@example.com"
              className="text-xl md:text-3xl hover:opacity-70 transition-opacity inline-block"
            >
              your.email@example.com
            </a>
          </div>

          <div className="flex flex-col justify-end items-start md:items-end gap-8">
            <div className="flex gap-4">
              <MagneticButton
                onClick={() => window.open('https://github.com', '_blank')}
                className="w-14 h-14 border-2 border-current flex items-center justify-center hover:bg-current hover:text-[var(--bg)] transition-colors duration-300"
              >
                <Github className="w-6 h-6" />
              </MagneticButton>
              <MagneticButton
                onClick={() => window.open('https://linkedin.com', '_blank')}
                className="w-14 h-14 border-2 border-current flex items-center justify-center hover:bg-current hover:text-[var(--bg)] transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </MagneticButton>
              <MagneticButton
                onClick={() => window.open('mailto:your.email@example.com')}
                className="w-14 h-14 border-2 border-current flex items-center justify-center hover:bg-current hover:text-[var(--bg)] transition-colors duration-300"
              >
                <Mail className="w-6 h-6" />
              </MagneticButton>
            </div>

            <div className="text-right">
              <div className="text-sm tracking-wider opacity-70 mb-2">ZURICH, SWITZERLAND</div>
              <div className="text-4xl font-bold tracking-tighter">{time}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm opacity-50 pt-8 border-t border-current">
          <div>© {new Date().getFullYear()} All Rights Reserved</div>
          <div className="flex gap-8">
            <span>Designed & Engineered with Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ========== MAIN APP ==========
function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Check if maintenance mode is enabled
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  // Check if we're on a project page (bypass maintenance mode)
  const isProjectPage = location.pathname.startsWith('/p/');

  useEffect(() => {
    document.documentElement.style.setProperty('--bg', isDark ? '#000000' : '#FFFFFF');
    document.documentElement.style.setProperty('--fg', isDark ? '#FFFFFF' : '#000000');
    document.body.style.backgroundColor = isDark ? '#000000' : '#FFFFFF';
    document.body.style.color = isDark ? '#FFFFFF' : '#000000';
  }, [isDark]);

  // Show maintenance page for main site if enabled (but not for project pages)
  if (isMaintenanceMode && !isProjectPage) {
    return <MaintenancePage />;
  }

  // Render project pages with lazy loading
  if (isProjectPage) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-2xl font-bold tracking-tighter">Loading...</div>
          </div>
        }
      >
        <Routes>
          <Route path="/p/flonk/*" element={<FlonkProject />} />
        </Routes>
      </Suspense>
    );
  }

  // Render main portfolio site
  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          className="min-h-screen transition-colors duration-[800ms]"
          style={{
            backgroundColor: isDark ? '#000000' : '#FFFFFF',
            color: isDark ? '#FFFFFF' : '#000000'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <DarkModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />

          <Hero />
          <div id="work">
            <WorkSection />
          </div>
          <AboutSection />
          <Footer />
        </motion.main>
      )}
    </>
  );
}

export default App;
