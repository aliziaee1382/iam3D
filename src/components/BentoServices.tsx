import React from 'react';
import { motion } from 'motion/react';
import { Code, Smartphone, Bot, Palette, ArrowLeft, Zap, Sparkles, CheckCircle2, Shield, Flame } from 'lucide-react';
import { Service, ThemeMode } from '../types';
import { SERVICES_DATA } from '../data/portfolioData';

interface BentoServicesProps {
  theme?: ThemeMode;
  services?: Service[];
  onOrderService: (title: string) => void;
}

export const BentoServices: React.FC<BentoServicesProps> = ({
  theme = 'dark',
  services = SERVICES_DATA,
  onOrderService,
}) => {
  const isDark = theme === 'dark';

  // Map services to 4 key cards
  const webService = services.find(s => s.id === 'web_wp') || services[0];
  const appService = services.find(s => s.id === 'app') || services[1];
  const botService = services.find(s => s.id === 'bot') || services[2];
  const graphicService = services.find(s => s.id === 'graphic') || services[3];

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>حوزه‌های تخصصی استودیو 0003</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          ستون‌های اصلی تخصص و خدمات
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          ترکیب مهندسی نرم‌افزار تمیز، سرعت ماکزیمم و ظرافت بصری نئونی برای خلق محصولاتی ماندگار و کاربردی.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Card 1: Web & WordPress (Large Bento Card - 7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:-translate-y-1.5 ${
            isDark
              ? 'bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-purple-950/30 border-purple-500/20 hover:border-purple-400/50 shadow-2xl'
              : 'bg-white border-slate-200 hover:border-purple-300 shadow-lg'
          }`}
        >
          {/* Ambient Glow in corner */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/25 transition-colors" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
                <Code className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-english">
                  <Zap className="w-3.5 h-3.5" />
                  <span>GTmetrix 99%</span>
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {webService.tag}
                </span>
              </div>
            </div>

            <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {webService.title}
            </h3>
            <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {webService.description}
            </p>

            {/* Checklist */}
            <div className="space-y-2.5 mb-8">
              {webService.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400">
              سفارشی‌سازی کامل + پنل مدیریت آسان
            </span>
            <button
              onClick={() => onOrderService(webService.title)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95"
            >
              <span>سفارش طراحی سایت</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Card 2: Native Android Apps (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:-translate-y-1.5 ${
            isDark
              ? 'bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-indigo-950/30 border-purple-500/20 hover:border-indigo-400/50 shadow-2xl'
              : 'bg-white border-slate-200 hover:border-indigo-300 shadow-lg'
          }`}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-600/25 transition-colors" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
                <Smartphone className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-english">
                Kotlin & Java
              </span>
            </div>

            <h3 className={`text-xl sm:text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {appService.title}
            </h3>
            <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {appService.description}
            </p>

            <div className="space-y-2.5 mb-8">
              {appService.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-indigo-500/10 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 font-english">
              Architecture: MVVM + Jetpack
            </span>
            <button
              onClick={() => onOrderService(appService.title)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-indigo-600/30 hover:scale-105 active:scale-95"
            >
              <span>سفارش اپلیکیشن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Card 3: Intelligent Telegram Bots (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:-translate-y-1.5 ${
            isDark
              ? 'bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-amber-950/20 border-purple-500/20 hover:border-amber-400/50 shadow-2xl'
              : 'bg-white border-slate-200 hover:border-amber-300 shadow-lg'
          }`}
        >
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-600/25 transition-colors" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                <Bot className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                اتوماسیون ۹۹.۹٪
              </span>
            </div>

            <h3 className={`text-xl sm:text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {botService.title}
            </h3>
            <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {botService.description}
            </p>

            <div className="space-y-2.5 mb-8">
              {botService.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/10 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400">
              اتصال به درگاه بانکی و رمزارز
            </span>
            <button
              onClick={() => onOrderService(botService.title)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-amber-600/30 hover:scale-105 active:scale-95"
            >
              <span>سفارش ربات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Card 4: Branding & Graphic Design (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between relative overflow-hidden group transition-all duration-500 hover:-translate-y-1.5 ${
            isDark
              ? 'bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-rose-950/20 border-purple-500/20 hover:border-rose-400/50 shadow-2xl'
              : 'bg-white border-slate-200 hover:border-rose-300 shadow-lg'
          }`}
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-600/25 transition-colors" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
                <Palette className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {graphicService.tag}
              </span>
            </div>

            <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {graphicService.title}
            </h3>
            <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {graphicService.description}
            </p>

            <div className="space-y-2.5 mb-8">
              {graphicService.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-rose-500/10 flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 font-english">
              Vector Assets (SVG / AI / Figma)
            </span>
            <button
              onClick={() => onOrderService(graphicService.title)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-md shadow-rose-600/30 hover:scale-105 active:scale-95"
            >
              <span>سفارش طراحی بنر و لوگو</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
