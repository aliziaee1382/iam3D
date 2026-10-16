import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Bot, Globe, Palette, Smartphone, CheckCircle, Sparkles, ArrowLeft, Info, X, Send } from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';
import { Service, ThemeMode } from '../types';

interface ServicesSectionProps {
  theme?: ThemeMode;
  onOrderService: (serviceTitle: string) => void;
  services?: Service[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  theme = 'dark',
  onOrderService,
  services = SERVICES_DATA,
}) => {
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  const getIcon = (iconName: string, sizeClass = "w-6 h-6 sm:w-7 sm:h-7") => {
    switch (iconName?.toLowerCase()) {
      case 'code': return <Code className={`${sizeClass} text-purple-400`} />;
      case 'smartphone': return <Smartphone className={`${sizeClass} text-cyan-400`} />;
      case 'bot': return <Bot className={`${sizeClass} text-fuchsia-400`} />;
      case 'globe': return <Globe className={`${sizeClass} text-indigo-400`} />;
      case 'palette': return <Palette className={`${sizeClass} text-amber-400`} />;
      default: return <Sparkles className={`${sizeClass} text-purple-400`} />;
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>خدمات و سرویس‌های تخصصی</span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          خدمات حرفه‌ای علی ضیائی
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          اجرای دقیق پروژه‌ها با تمرکز بر بالاترین کیفیت visual، عملکرد پایدار و تجربه کاربری مدرن.
        </p>
      </div>

      {/* Services Grid (Clean, mobile-friendly 1 col on small phones or 2 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? 'bg-slate-900/70 border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-900/90'
                : 'bg-white border-slate-200/90 hover:border-purple-300 shadow-sm'
            }`}
          >
            <div>
              {/* Top Bar: Icon & Tag */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center border group-hover:scale-105 transition-transform ${
                  isDark ? 'bg-purple-950/80 border-purple-500/30' : 'bg-purple-50 border-purple-200'
                }`}>
                  {getIcon(service.iconName)}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                  isDark
                    ? 'text-purple-300 bg-purple-950/90 border-purple-500/30'
                    : 'text-purple-800 bg-purple-100/80 border-purple-200'
                }`}>
                  {service.tag}
                </span>
              </div>

              {/* Service Title */}
              <h3 className={`text-base sm:text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {service.title}
              </h3>

              {/* Concise Description */}
              <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {service.description}
              </p>
            </div>

            {/* Action Button: Full Information Modal Trigger */}
            <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
              isDark ? 'border-purple-500/20' : 'border-slate-200'
            }`}>
              <button
                onClick={() => setActiveModalService(service)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs sm:text-sm transition-all ${
                  isDark
                    ? 'bg-purple-950/60 border-purple-500/40 text-purple-200 hover:bg-purple-900/80 hover:border-purple-400'
                    : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
                }`}
              >
                <Info className="w-4 h-4 text-purple-400" />
                <span>اطلاعات کامل</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Details Modal */}
      <AnimatePresence>
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl max-h-[90vh] overflow-y-auto ${
                isDark
                  ? 'bg-slate-900 border-purple-500/40 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalService(null)}
                className={`absolute top-4 left-4 p-2 rounded-full border transition-all ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                  isDark ? 'bg-purple-950/80 border-purple-500/40' : 'bg-purple-50 border-purple-200'
                }`}>
                  {getIcon(activeModalService.iconName, "w-7 h-7")}
                </div>
                <div>
                  <span className="text-xs font-bold text-purple-400 block mb-0.5">
                    {activeModalService.tag}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-black">
                    {activeModalService.title}
                  </h3>
                </div>
              </div>

              {/* Full Description */}
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {activeModalService.description}
              </p>

              {/* Detailed Features List */}
              <div className={`p-4 sm:p-5 rounded-2xl border mb-6 space-y-3 ${
                isDark ? 'bg-purple-950/30 border-purple-500/20' : 'bg-purple-50/70 border-purple-200'
              }`}>
                <h4 className="text-xs sm:text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>امکانات و ویژگی‌های تخصصی این خدمت:</span>
                </h4>
                {activeModalService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-snug">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModalService(null)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  بستن
                </button>

                <button
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    onOrderService(title);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all"
                >
                  <span>سفارش این خدمت</span>
                  <Send className="w-4 h-4 rotate-[-20deg]" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

