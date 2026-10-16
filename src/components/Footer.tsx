import React from 'react';
import { ArrowUp, Send, Phone, Instagram, Heart, Code2, Lock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PersonalInfo, ThemeMode } from '../types';
import { Logo0003 } from './Logo0003';

interface FooterProps {
  theme?: ThemeMode;
  personalInfo?: PersonalInfo;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme = 'dark',
  personalInfo = PERSONAL_INFO,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="hidden md:block bg-slate-950 border-t border-purple-500/20 text-slate-400 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-purple-500/10">
          
          {/* Brand Col - 5 Cols */}
          <div className="md:col-span-5 space-y-4">
            <Logo0003 theme="dark" className="h-9 sm:h-11" showTextLabel={true} />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              طراحی اختصاصی سایت، ساخت ربات‌های پیشرفته تلگرام، توسعه و مدیریت وردپرس، و طراحی هویت بصری، بنر و لوگو با بالاترین کیفیت UI/UX.
            </p>
          </div>

          {/* Quick Links - 3 Cols */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-purple-300 transition-colors">صفحه اصلی</a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-300 transition-colors">خدمات و تخصص‌ها</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-purple-300 transition-colors">شاهکارها و پروژه‌ها</a>
              </li>
              <li>
                <a href="#creations" className="hover:text-purple-300 transition-colors">محصولات و ربات‌ها</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-300 transition-colors">شروع همکاری و مشاوره</a>
              </li>
            </ul>
          </div>

          {/* Contact Details - 4 Cols */}
          <div className="md:col-span-4 space-y-3">
            <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>راه‌های ارتباط مستقیم</h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2.5 hover:text-purple-400 transition-colors">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="font-english font-medium">{personalInfo.phone}</span>
              </a>

              <a href={personalInfo.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-purple-400 transition-colors">
                <Send className="w-4 h-4 text-purple-400 rotate-[-20deg]" />
                <span className="font-english font-medium">@{personalInfo.telegram}</span>
              </a>

              <a href={personalInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-purple-400 transition-colors">
                <Instagram className="w-4 h-4 text-purple-400" />
                <span className="font-english font-medium">@{personalInfo.instagram}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-right">
            تمامی حقوق برای وبسایت <strong className="text-purple-400 font-english">0003</strong> و {personalInfo.name} محفوظ است. © ۱۴۰۳ - ۲۰۲۶
          </p>

          <div className="flex items-center gap-3">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-amber-500 hover:text-amber-400 bg-amber-500/10 border border-amber-500/20 text-xs font-bold transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>ورود به مدیریت</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              id="back-to-top-btn"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-purple-500/20 text-purple-300 hover:text-white hover:bg-purple-950 transition-colors"
            >
              <span>بازگشت به بالا</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lottie Animation - Desktop Only at Very End Center */}
        <div className="hidden md:flex justify-center items-center pt-6 -mb-4">
          <dotlottie-wc
            src="https://lottie.host/246d6b07-c955-4e08-aa56-fc4e4526cd52/KhNAhzCCfv.json"
            style={{ width: '100px', height: '100px' }}
            autoplay
            loop
          />
        </div>

      </div>
    </footer>
  );
};
