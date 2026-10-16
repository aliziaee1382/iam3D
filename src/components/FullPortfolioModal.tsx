import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Briefcase, Code, Smartphone, Bot, Palette, ExternalLink, Eye, Sparkles } from 'lucide-react';
import { Project, ProjectCategory, ThemeMode } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

interface FullPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: ThemeMode;
  projects?: Project[];
}

export const FullPortfolioModal: React.FC<FullPortfolioModalProps> = ({
  isOpen,
  onClose,
  theme = 'dark',
  projects = PROJECTS_DATA,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  if (!isOpen) return null;

  const categories: { id: ProjectCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'همه پروژه‌ها', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'web', label: 'سایت اختصاصی و وردپرس', icon: <Code className="w-3.5 h-3.5" /> },
    { id: 'app', label: 'اپلیکیشن موبایل', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'bot', label: 'ربات تلگرام', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'graphic', label: 'بنر و لوگو', icon: <Palette className="w-3.5 h-3.5" /> },
  ];

  const filtered = selectedCategory === 'all'
    ? projects
    : selectedCategory === 'web'
    ? projects.filter(p => p.category === 'web' || p.category === 'wordpress')
    : projects.filter(p => p.category === selectedCategory);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto" dir="rtl">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl -z-10"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-6xl max-h-[90vh] bg-slate-950 border border-purple-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-purple-500/20 bg-slate-900/60 backdrop-blur-md flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  آرشیو کامل نمونه‌کارها ({projects.length} پروژه)
                </h3>
                <p className="text-xs text-slate-400">
                  برای مشاهده جزئیات هر پروژه، روی کارت آن کلیک کنید.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="px-5 sm:px-6 py-3 border-b border-purple-500/10 bg-slate-950/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-purple-500/20'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className="rounded-2xl border border-purple-500/20 bg-slate-900/60 overflow-hidden hover:border-purple-400/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-slate-900/90 text-[10px] font-bold text-purple-300 border border-purple-500/30 backdrop-blur-xs">
                      {proj.categoryName}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-purple-500/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-purple-400 font-bold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>مشاهده جزئیات</span>
                      </span>

                      {proj.demoUrl && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-purple-600/20 px-2 py-0.5 rounded-md border border-purple-500/30 font-medium"
                        >
                          <span>دمو آنلاین</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Nested Detailed Project Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </AnimatePresence>
  );
};
