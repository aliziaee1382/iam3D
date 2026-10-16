import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, Zap, CheckCircle2, ArrowLeft, Send, Info, X } from 'lucide-react';
import { BotServiceItem, ThemeMode } from '../types';

interface BotServicesSectionProps {
  theme?: ThemeMode;
  botServices: BotServiceItem[];
  onOrderService?: (title: string) => void;
}

export const BotServicesSection: React.FC<BotServicesSectionProps> = ({
  theme = 'dark',
  botServices,
  onOrderService,
}) => {
  const [selectedBot, setSelectedBot] = useState<BotServiceItem | null>(null);
  const isDark = theme === 'dark';

  return (
    <section id="bot-services" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold w-fit">
          <Bot className="w-3.5 h-3.5" />
          <span>ربات‌های هوشمند و اتوماسیون 0003</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          ربات‌ها و سرویس‌های اختصاصی
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          طراحی انواع ربات‌های پیشرفته تلگرام، سیستم‌های VIP ارز دیجیتال و فارکس، اتوماسیون فروشگاهی و وب‌سرویس‌های متصل به درگاه بانکی با بالاترین سرعت و پایداری.
        </p>
      </div>

      {/* Showcase Cards List - 2 Column Grid on both Mobile and Desktop */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {botServices.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className={`flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl ${
              isDark
                ? 'bg-slate-900/90 border-purple-500/20 shadow-lg'
                : 'bg-white border-purple-200/90 shadow-md'
            }`}
          >
            {/* Media Preview Header */}
            <div className="relative h-28 sm:h-44 w-full overflow-hidden bg-slate-950 group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

              {/* Badge Overlay */}
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-purple-600/90 text-white font-black text-[9px] sm:text-[11px] shadow-md backdrop-blur-md">
                <Bot className="w-2.5 h-2.5 sm:w-3.5 h-3.5" />
                <span className="truncate max-w-[70px] sm:max-w-none">{item.badge}</span>
              </div>

              {/* Metric Overlay */}
              <div className="absolute bottom-1.5 right-2 left-2 flex items-center justify-between bg-slate-950/80 backdrop-blur-md border border-purple-500/25 rounded-lg px-2 py-1 text-white">
                <span className="text-[9px] text-purple-300 font-semibold truncate">{item.impactLabel}</span>
                <span className="text-[10px] sm:text-xs font-black text-white font-english shrink-0">{item.impactMetric}</span>
              </div>
            </div>

            {/* Content: Title, 1-line description and Details Button */}
            <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between space-y-2.5">
              <div className="space-y-1">
                <h3
                  className={`text-xs sm:text-base font-black line-clamp-1 ${isDark ? 'text-white' : 'text-slate-900'}`}
                  title={item.title}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-[10px] sm:text-xs leading-snug line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                  title={item.description}
                >
                  {item.description}
                </p>
              </div>

              {/* Only ONE button on card: جزئیات */}
              <button
                type="button"
                onClick={() => setSelectedBot(item)}
                className="w-full py-2 px-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-purple-600/25 active:scale-95 hover:scale-[1.01]"
              >
                <span>جزئیات</span>
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Details Modal for Bot & Services (2-Step Details) */}
      <AnimatePresence>
        {selectedBot && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedBot(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`relative w-full max-w-lg my-auto rounded-3xl border p-5 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 overflow-hidden ${
                isDark ? 'bg-slate-900 border-purple-500/30 text-white' : 'bg-white border-purple-200 text-slate-900'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedBot(null)}
                aria-label="بستن"
                className={`absolute top-4 left-4 z-20 p-2 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Media Preview Header */}
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={selectedBot.image}
                  alt={selectedBot.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-600 text-white font-black text-xs shadow-lg backdrop-blur-md">
                  <Bot className="w-3.5 h-3.5" />
                  <span>{selectedBot.badge}</span>
                </div>

                {/* Metric Floating Badge */}
                <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between bg-slate-950/85 backdrop-blur-md border border-purple-500/30 rounded-xl px-3.5 py-2 text-white">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-purple-300 font-semibold">{selectedBot.impactLabel}</span>
                    <span className="text-sm sm:text-base font-black text-white font-english">{selectedBot.impactMetric}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
              </div>

              {/* Modal Body Info */}
              <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1 pl-1">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs font-bold text-purple-400 font-mono">
                      {selectedBot.subtitle}
                    </span>
                  </div>
                  <h3 className={`text-lg sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedBot.title}
                  </h3>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {selectedBot.description}
                </p>

                {/* Key Innovations */}
                {selectedBot.keyInnovations && selectedBot.keyInnovations.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className={`text-xs font-bold block ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
                      امکانات و قابلیت‌های کلیدی:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedBot.keyInnovations.map((inv, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{inv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack Chips */}
                {selectedBot.technologies && selectedBot.technologies.length > 0 && (
                  <div className="pt-1">
                    <span className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      فناوری‌ها و بستر توسعه:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBot.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] sm:text-[11px] font-english font-semibold px-2.5 py-1 rounded-lg border ${
                            isDark
                              ? 'bg-purple-950/40 border-purple-500/30 text-purple-200'
                              : 'bg-purple-50 border-purple-200 text-purple-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2 Buttons at Bottom: ورود و سفارش مشابه */}
              <div className={`pt-4 border-t flex flex-row items-center gap-3 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                {selectedBot.demoUrl && (
                  <a
                    href={selectedBot.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>ورود</span>
                  </a>
                )}

                {selectedBot.orderBtnUrl ? (
                  <a
                    href={selectedBot.orderBtnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm transition-all hover:scale-[1.01] active:scale-[0.99] ${
                      isDark
                        ? 'bg-slate-800/90 border-purple-500/30 text-purple-300 hover:bg-slate-700 hover:text-white'
                        : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    <span>سفارش مشابه</span>
                    <ArrowLeft className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onOrderService?.(`سفارش سرویس مشابه ${selectedBot.title}`);
                      setSelectedBot(null);
                    }}
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm transition-all hover:scale-[1.01] active:scale-[0.99] ${
                      isDark
                        ? 'bg-slate-800/90 border-purple-500/30 text-purple-300 hover:bg-slate-700 hover:text-white'
                        : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    <span>سفارش مشابه</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
