import React from 'react';
import { User, Zap, Shield, HeartHandshake, Code, Bot, Globe, Palette, Smartphone, ArrowLeft, Sparkles, Heart, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, SERVICES_DATA } from '../data/portfolioData';
import { PersonalInfo, Service, ThemeMode } from '../types';

interface AboutSectionProps {
  theme: ThemeMode;
  onOrderService?: (serviceTitle: string) => void;
  personalInfo?: PersonalInfo;
  services?: Service[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  theme,
  onOrderService,
  personalInfo = PERSONAL_INFO,
  services = SERVICES_DATA,
}: AboutSectionProps) => {
  const principles = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'سرعت و عملکرد فوق‌العاده',
      description: 'کدنویسی استاندارد، بهینه‌سازی فنی سئو و زمان بارگذاری زیر ۱.۵ ثانیه.'
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-500" />,
      title: 'رابط کاربری مدرن (UI/UX)',
      description: 'طراحی اختصاصی بدون قالب آماده، با تم بنفش و انیمیشن‌های نرم.'
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-500" />,
      title: 'امنیت و پایداری بالا',
      description: 'پیاده‌سازی لایه‌های امنیتی در سایت‌های وردپرسی و ربات‌های تلگرام.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-500" />,
      title: 'پشتیبانی واقعی و متعهدانه',
      description: 'همراهی با شما پس از تحویل پروژه برای رفع هرگونه سوال و بروزرسانی.'
    }
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'code': return <Code className="w-6 h-6 text-purple-500" />;
      case 'smartphone': return <Smartphone className="w-6 h-6 text-cyan-500" />;
      case 'bot': return <Bot className="w-6 h-6 text-amber-500" />;
      case 'globe': return <Globe className="w-6 h-6 text-indigo-500" />;
      case 'palette': return <Palette className="w-6 h-6 text-rose-500" />;
      default: return <Sparkles className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-12">
      
      {/* Title */}
      <div>
        <h2 className={`text-2xl sm:text-3xl font-black article-title-accent mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          درباره من
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {personalInfo.aboutBio}
        </p>
      </div>

      {/* Key Quick Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'پروژه موفق تحویل‌شده', value: personalInfo.completedProjects, color: 'text-amber-500' },
          { label: 'رضایت مشتریان', value: personalInfo.satisfactionRate, color: 'text-purple-500' },
          { label: 'سابقه کار تخصصی', value: personalInfo.experienceYears, color: 'text-indigo-500' },
          { label: 'کیفیت و استاندارد', value: 'عالی (تضمینی)', color: 'text-emerald-500' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border text-center transition-all ${
              theme === 'dark'
                ? 'bg-slate-900/60 border-purple-500/20'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className={`text-xl sm:text-2xl font-black font-english block mb-1 ${stat.color}`}>
              {stat.value}
            </span>
            <span className={`text-xs font-semibold ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* What I'm Doing Section (Services Overview) */}
      <div className="space-y-6">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          <span className="w-2.5 h-6 bg-purple-600 rounded-full inline-block" />
          کاری که انجام می‌دهم (خدمات تخصصی)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(services && services.length > 0 ? services : SERVICES_DATA).map((service) => (
            <div
              key={service.id}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-purple-500/20 hover:border-purple-500/40'
                  : 'bg-slate-50 border-slate-200 hover:border-purple-300 hover:bg-white shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    theme === 'dark' ? 'bg-slate-950 border-purple-500/20' : 'bg-white border-slate-200'
                  }`}>
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {service.tag}
                  </span>
                </div>

                <h4 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {service.title}
                </h4>

                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-400">
                  تحویل سریع و تضمینی
                </span>

                {onOrderService && (
                  <button
                    onClick={() => onOrderService(service.title)}
                    className="flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <span>ثبت سفارش</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Guiding Principles Cards */}
      <div className="space-y-6">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          <span className="w-2.5 h-6 bg-amber-500 rounded-full inline-block" />
          اصول کاری و استانداردهای 0003
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {principles.map((item, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/40 border-purple-500/20'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="mb-3">{item.icon}</div>
              <h4 className={`text-sm font-bold mb-1.5 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {item.title}
              </h4>
              <p className={`text-xs leading-relaxed ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Support / Donation Card */}
      <div
        id="financial-support-section"
        className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-purple-950/40 border-purple-500/30 shadow-xl'
            : 'bg-gradient-to-r from-purple-50 via-white to-purple-50 border-purple-200 shadow-md'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-right">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 shadow-inner">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500/20" />
            </div>
            <div>
              <h4 className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                حمایت مالی از پروژه‌ها و فعالیت‌ها
              </h4>
              <p className={`text-xs sm:text-sm mt-1 max-w-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                اگر از پروژه‌ها، آموزش‌ها یا ساخته‌های من استفاده کردید یا قصد حمایت دارید، همراهی شما ارزشمند و انرژی‌بخش است.
              </p>
            </div>
          </div>

          <a
            id="daramet-donation-btn"
            href="https://daramet.com/aliziaee1382"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
            <span>میتوانید ازاین طریق حمایت کنید</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </div>

    </div>
  );
};

