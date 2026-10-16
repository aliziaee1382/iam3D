import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Send, Phone, Sparkles, MessageSquare, ShieldCheck, Lock } from 'lucide-react';
import { ThemeMode, PageSection } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Logo0003 } from './Logo0003';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  activeSection: PageSection;
  setActiveSection: (section: PageSection) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  activeSection,
  setActiveSection,
  onOpenAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageSection; label: string }[] = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'services', label: 'خدمات و تخصص' },
    { id: 'portfolio', label: 'شاهکارها' },
    { id: 'creations', label: 'ساخته‌هام' },
    { id: 'contact', label: 'شروع همکاری' },
  ];

  const scrollToSection = (id: PageSection) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'glass-panel-dark py-3 shadow-lg shadow-purple-950/20'
            : 'glass-panel-light py-3 shadow-md shadow-purple-100'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand "0003" */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group text-right focus:outline-none transition-transform active:scale-95"
            id="nav-logo-button"
          >
            <Logo0003 theme={theme} className="h-9 sm:h-11" showTextLabel={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 dark:bg-slate-900/60 border border-purple-500/20 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`relative px-4 py-2 text-sm font-medium transition-all rounded-full ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-purple-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full -z-10 shadow-md shadow-purple-600/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme Switcher + Admin + Telegram Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                id="nav-admin-btn"
                aria-label="ورود به پنل مدیریت"
                title="ورود به پنل مدیریت"
                className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-purple-500/30 text-slate-300 hover:text-amber-400 hover:bg-slate-800 hover:border-amber-400/50'
                    : 'bg-white border-purple-200 text-slate-700 hover:text-amber-600 hover:bg-amber-50 shadow-sm'
                }`}
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              aria-label="تغییر پوسته"
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-purple-500/30 text-amber-300 hover:bg-slate-800 hover:border-purple-400'
                  : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href={PERSONAL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-telegram-cta"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="w-4 h-4 rotate-[-20deg]" />
              <span>سفارش در تلگرام</span>
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                id="mobile-admin-toggle"
                aria-label="ورود به پنل مدیریت"
                className="p-2 rounded-lg bg-slate-900 border border-purple-500/30 text-amber-400"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={toggleTheme}
              id="mobile-theme-toggle"
              aria-label="تغییر پوسته"
              className="p-2 rounded-lg bg-slate-900 border border-purple-500/30 text-amber-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="منوی اصلی"
              className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 hover:bg-purple-900/80"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-purple-500/20 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-right py-3 px-4 rounded-xl font-medium text-base transition-colors ${
                    activeSection === item.id
                      ? 'bg-purple-600/30 text-purple-300 border-r-4 border-purple-500'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-purple-500/20 flex flex-col gap-3">
                <a
                  href={PERSONAL_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white font-medium text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>پیام در تلگرام ({PERSONAL_INFO.telegram}@)</span>
                </a>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 font-medium text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>تماس مستقیماً با {PERSONAL_INFO.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
