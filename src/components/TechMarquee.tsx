import React from 'react';
import { motion } from 'motion/react';
import { Code, Smartphone, Bot, Palette, Globe, Zap, Cpu, Sparkles, Layers, Terminal } from 'lucide-react';

export const TechMarquee: React.FC = () => {
  const techs = [
    { name: 'React 19', icon: <Code className="w-4 h-4 text-cyan-400" /> },
    { name: 'Kotlin Native', icon: <Smartphone className="w-4 h-4 text-purple-400" /> },
    { name: 'Python Asyncio', icon: <Bot className="w-4 h-4 text-amber-400" /> },
    { name: 'Telegram Bot API', icon: <Zap className="w-4 h-4 text-sky-400" /> },
    { name: 'TypeScript', icon: <Terminal className="w-4 h-4 text-blue-400" /> },
    { name: 'Tailwind CSS v4', icon: <Layers className="w-4 h-4 text-teal-400" /> },
    { name: 'WordPress & WooCommerce', icon: <Globe className="w-4 h-4 text-indigo-400" /> },
    { name: 'Android Studio / Java', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
    { name: 'Framer Motion', icon: <Sparkles className="w-4 h-4 text-fuchsia-400" /> },
    { name: 'UI/UX & Branding', icon: <Palette className="w-4 h-4 text-rose-400" /> },
  ];

  // Repeat for continuous infinite scroll
  const marqueeItems = [...techs, ...techs, ...techs];

  return (
    <div className="relative py-8 sm:py-10 overflow-hidden border-y border-purple-500/10 bg-slate-950/40 backdrop-blur-xs select-none">
      {/* Edge gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#0a0612] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#0a0612] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: [0, -1400] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25,
        }}
        className="flex items-center gap-4 sm:gap-6 whitespace-nowrap"
      >
        {marqueeItems.map((tech, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-slate-300 hover:text-white hover:border-purple-400/50 transition-all duration-300 group cursor-default"
          >
            <span className="p-1 rounded-lg bg-slate-900/80 group-hover:scale-110 transition-transform">
              {tech.icon}
            </span>
            <span className="font-english font-bold text-xs sm:text-sm tracking-wide">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
