import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Eye, ExternalLink, Code, Bot, Globe, Palette, Smartphone } from 'lucide-react';
import { Project, ProjectCategory, ThemeMode } from '../types';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

interface PortfolioSectionProps {
  theme: ThemeMode;
  projects?: Project[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ theme, projects = PROJECTS_DATA }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: { id: ProjectCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'همه نمونه‌کارها', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'web', label: 'سایت اختصاصی و وردپرس', icon: <Code className="w-3.5 h-3.5" /> },
    { id: 'app', label: 'طراحی اپلیکیشن', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'bot', label: 'ربات تلگرام', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'graphic', label: 'بنر و لوگو', icon: <Palette className="w-3.5 h-3.5" /> },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : selectedCategory === 'web'
    ? projects.filter(p => p.category === 'web' || p.category === 'wordpress')
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h2 className={`text-2xl sm:text-3xl font-black article-title-accent mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          نمونه‌کارها و کارهای اجرا شده
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
        }`}>
          مجموعه‌ای از آخرین کارهای طراحی سایت اختصاصی و وردپرس، توسعه اپلیکیشن موبایل، ربات‌های تلگرام و بنر و لوگو.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 flex-wrap pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            id={`portfolio-category-${cat.id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : theme === 'dark'
                  ? 'bg-slate-900 text-slate-300 hover:text-white border border-purple-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 border border-slate-200'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`group rounded-xl sm:rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-purple-500/20 hover:border-purple-500/50'
                  : 'bg-slate-50 border-slate-200 hover:border-purple-300 hover:bg-white shadow-sm'
              }`}
            >
              <div>
                {/* Image Container */}
                <div className="relative h-28 sm:h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-950/80 border border-purple-500/30 text-purple-300 text-[10px] sm:text-xs font-semibold backdrop-blur-md">
                    {project.categoryName}
                  </span>

                  {/* Eye & Demo Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-purple-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs p-2">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-[10px] sm:text-xs shadow-lg transition-transform hover:scale-105"
                        title="مشاهده دمو آنلاین"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>دمو</span>
                      </a>
                    ) : null}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-slate-900/90 hover:bg-slate-900 text-slate-100 font-bold text-[10px] sm:text-xs border border-white/20 shadow-lg transition-transform hover:scale-105"
                      title="مشاهده جزئیات"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>جزئیات</span>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 sm:p-5">
                  <h3 className={`text-xs sm:text-base font-bold mb-1 sm:mb-2 group-hover:text-purple-500 transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-4 line-clamp-2 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 2).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono border ${
                          theme === 'dark'
                            ? 'bg-purple-950/60 border-purple-500/20 text-purple-300'
                            : 'bg-purple-50 border-purple-200 text-purple-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 pt-0 sm:p-5 sm:pt-0 flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className={`py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-colors text-center ${
                    theme === 'dark'
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/50'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  جزئیات
                </button>

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] sm:text-xs font-bold shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 transition-all text-center"
                    title="مشاهده آنلاین دمو"
                  >
                    <span>{project.demoBtnText || 'مشاهده دمو'}</span>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] sm:text-xs font-bold shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 transition-all text-center"
                  >
                    <span>{project.demoBtnText || 'مشاهده دمو'}</span>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                )}
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
};

