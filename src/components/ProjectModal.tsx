import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Send, CheckCircle2, Code2, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Project } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!project) return null;

  const handleOrderSimilar = () => {
    const text = `سلام آقای ضیائی!👋%0Aمن در سایت 0003 پروژه "${project.title}" را دیدم و علاقمند به سفارش یک پروژه مشابه هستم.%0Aلطفاً راهنمایی بفرمایید.`;
    window.open(`https://t.me/${PERSONAL_INFO.telegram}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-3xl my-8 rounded-3xl bg-slate-900 border border-purple-500/30 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-30 p-2.5 rounded-full bg-slate-950/80 border border-purple-500/30 text-slate-300 hover:text-white hover:bg-purple-900 transition-colors shadow-lg cursor-pointer"
            id="modal-close-btn"
            title="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-y-auto flex-1">
            {/* Project Full Image (No gradient overlay, no shadows on image) */}
            <div className="relative w-full bg-slate-950 border-b border-purple-500/20 group">
              <div 
                className={`relative w-full transition-all duration-300 flex items-center justify-center ${
                  isZoomed ? 'cursor-zoom-out min-h-[420px] sm:min-h-[580px] p-2 bg-slate-950' : 'cursor-zoom-in min-h-[260px] sm:min-h-[380px] bg-slate-950'
                }`}
                onClick={() => setIsZoomed((prev) => !prev)}
                title={isZoomed ? 'برای کوچک‌نمایی کلیک کنید' : 'برای بزرگ‌نمایی و مشاهده جزئیات کلیک کنید'}
              >
                <motion.img
                  layout
                  src={project.image}
                  alt={project.title}
                  className={`transition-all duration-300 select-none ${
                    isZoomed 
                      ? 'w-full h-auto max-h-[85vh] object-contain scale-100 rounded-xl' 
                      : 'w-full h-auto max-h-[420px] object-contain'
                  }`}
                />

                {/* Zoom Hint Badge */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-purple-500/40 text-purple-200 text-xs backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5 text-purple-400" />
                      <span>کلیک برای اندازه عادی</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5 text-purple-400" />
                      <span>کلیک برای بزرگ‌نمایی تصویر</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Content - Title & Tags placed cleanly AFTER the image */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Header: Category Badge & Project Title */}
              <div className="space-y-3 pb-4 border-b border-purple-500/20">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-purple-600/30 border border-purple-500/50 text-purple-300 text-xs font-semibold">
                    {project.categoryName}
                  </span>

                  {project.clientName && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">سفارش دهنده:</span>
                      <span className="text-sm font-bold text-purple-300">{project.clientName}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  {project.title}
                </h3>
              </div>

              {/* Full Details */}
              <div>
                <h4 className="text-base font-bold text-white mb-2">توضیحات کامل پروژه:</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.fullDetails}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-base font-bold text-white mb-3">ویژگی‌ها و قابلیت‌های اجرا شده:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span>تکنولوژی‌های استفاده شده:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-950 border border-purple-500/30 text-purple-200 text-xs font-mono font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-purple-500/20 flex flex-wrap gap-3">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="modal-view-demo-btn"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all text-center cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{project.demoBtnText || 'مشاهده آنلاین دمو'}</span>
                  </a>
                ) : null}

                <button
                  onClick={handleOrderSimilar}
                  id="modal-order-similar-btn"
                  className={`flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl ${
                    project.demoUrl
                      ? 'bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white'
                      : 'flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30'
                  } font-bold text-sm transition-all cursor-pointer`}
                >
                  <Send className="w-4 h-4 rotate-[-20deg]" />
                  <span>سفارش پروژه مشابه</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-3.5 px-5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors cursor-pointer"
                >
                  بستن
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
