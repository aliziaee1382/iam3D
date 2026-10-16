import React from 'react';
import { motion } from 'motion/react';
import { Crown, Sparkles, Zap, ExternalLink, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Masterpiece, ThemeMode } from '../types';

interface MasterpiecesSectionProps {
  theme?: ThemeMode;
  masterpieces: Masterpiece[];
  onOrderService?: (title: string) => void;
}

export const MasterpiecesSection: React.FC<MasterpiecesSectionProps> = ({
  theme = 'dark',
  masterpieces,
  onOrderService,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold w-fit">
          <Crown className="w-3.5 h-3.5" />
          <span>شاهکارهای طراحی و کدنویسی 0003</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          پروژه‌های برتر و شاهکارهای اختصاصی
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          مجموعه‌ای از برجسته‌ترین پروژه‌های طراحی شده با معماری پیشرفته، تکنولوژی‌های نوظهور و بالاترین استانداردهای بصری و عملکردی.
        </p>
      </div>

      {/* Showcase Cards List */}
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-3 sm:gap-8">
        {masterpieces.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-300 hover:border-purple-500/50 ${
              isDark
                ? 'bg-slate-900/80 border-purple-500/20 shadow-xl'
                : 'bg-white border-purple-200/90 shadow-md'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Media Preview Column */}
              <div className="lg:col-span-5 relative min-h-[140px] sm:min-h-[260px] lg:min-h-full overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl bg-amber-500/90 text-slate-950 font-black text-[10px] sm:text-xs shadow-lg backdrop-blur-md">
                  <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{item.badge}</span>
                </div>

                {/* Metric Overlay */}
                <div className="absolute bottom-2 left-2 right-2 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/85 backdrop-blur-md border border-purple-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-purple-300 block font-semibold">{item.impactLabel}</span>
                    <span className="text-sm sm:text-xl font-black text-white font-english tracking-tight">{item.impactMetric}</span>
                  </div>
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-300 border border-purple-500/40">
                    <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-400" />
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-7 p-3.5 sm:p-8 flex flex-col justify-between space-y-3 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[10px] sm:text-xs font-bold text-purple-400">{item.subtitle}</span>
                  </div>

                  <h3 className={`text-sm sm:text-2xl font-black mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>

                  <p className={`text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.description}
                  </p>

                  {/* Key Innovations / Bullet Points */}
                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-6 hidden sm:block">
                    <span className={`text-xs font-bold block mb-2 ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                      نوآوری‌ها و ویژگی‌های کلیدی:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.keyInnovations.map((inn, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{inn}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 pt-1 sm:pt-2">
                    {item.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg border font-english ${
                          isDark
                            ? 'bg-slate-800/80 border-purple-500/20 text-purple-200'
                            : 'bg-purple-50 border-purple-200 text-purple-900'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className={`pt-2 sm:pt-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 ${
                  isDark ? 'border-purple-500/20' : 'border-slate-200'
                }`}>
                  {item.clientName && (
                    <span className={`text-[10px] sm:text-xs hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      کارفرما: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{item.clientName}</strong>
                    </span>
                  )}

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border text-[10px] sm:text-xs font-bold transition-all ${
                          isDark
                            ? 'bg-slate-800 border-purple-500/30 text-purple-300 hover:bg-slate-700'
                            : 'bg-purple-100/70 border-purple-200 text-purple-900 hover:bg-purple-200'
                        }`}
                      >
                        <span>{item.demoBtnText || 'دمو'}</span>
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                    )}

                    {item.orderBtnUrl ? (
                      <a
                        href={item.orderBtnUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] sm:text-xs font-bold shadow-md shadow-purple-600/30 transition-all"
                      >
                        <span>{item.orderBtnText || 'سفارش'}</span>
                        <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onOrderService?.(item.title)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] sm:text-xs font-bold shadow-md shadow-purple-600/30 transition-all"
                      >
                        <span>{item.orderBtnText || 'سفارش'}</span>
                        <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
