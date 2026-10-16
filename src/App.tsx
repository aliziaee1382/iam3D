import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  ThemeMode,
  PersonalInfo,
  Service,
  Masterpiece,
  BotServiceItem,
  AppItem,
  Project,
  Testimonial,
  FAQItem,
  OrderMessage,
  PageSection
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { BentoServices } from './components/BentoServices';
import { MasterpiecesSection } from './components/MasterpiecesSection';
import { CreationsSection } from './components/CreationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FullPortfolioModal } from './components/FullPortfolioModal';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { LuxuryCursor } from './components/LuxuryCursor';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import {
  ArrowUp,
  Send,
  Sparkles,
  Zap,
  Briefcase,
  Phone,
  Instagram,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Flame,
  Layers,
  Heart
} from 'lucide-react';
import {
  PERSONAL_INFO,
  SERVICES_DATA,
  BOT_SERVICES_DATA,
  APPS_DATA,
  MASTERPIECES_DATA,
  PROJECTS_DATA,
  TESTIMONIALS_DATA,
  FAQ_DATA
} from './data/portfolioData';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeSection, setActiveSection] = useState<PageSection>('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryServiceTitle, setInquiryServiceTitle] = useState('طراحی سایت اختصاصی و وردپرس');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll Progress Tracking for Top Gradient Line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Auto-migrate outdated localStorage cache to new exported backup data
  const CURRENT_DATA_VERSION = '2026-10-16_v3';
  if (typeof window !== 'undefined') {
    const savedVersion = localStorage.getItem('0003_data_version');
    if (savedVersion !== CURRENT_DATA_VERSION) {
      localStorage.removeItem('0003_personal_info');
      localStorage.removeItem('0003_services');
      localStorage.removeItem('0003_masterpieces');
      localStorage.removeItem('0003_bot_services');
      localStorage.removeItem('0003_apps');
      localStorage.removeItem('0003_projects');
      localStorage.removeItem('0003_testimonials');
      localStorage.removeItem('0003_faqs');
      localStorage.setItem('0003_data_version', CURRENT_DATA_VERSION);
    }
  }

  // Dynamic Editable States with localStorage Persistence
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem('0003_personal_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return PERSONAL_INFO;
      }
    }
    return PERSONAL_INFO;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('0003_services');
    if (saved) {
      try {
        const parsed: Service[] = JSON.parse(saved);
        return parsed.length > 0 ? parsed : SERVICES_DATA;
      } catch {
        return SERVICES_DATA;
      }
    }
    return SERVICES_DATA;
  });

  const [masterpieces, setMasterpieces] = useState<Masterpiece[]>(() => {
    const saved = localStorage.getItem('0003_masterpieces');
    if (saved) {
      try {
        const parsed: Masterpiece[] = JSON.parse(saved);
        return parsed.length > 0 ? parsed : MASTERPIECES_DATA;
      } catch {
        return MASTERPIECES_DATA;
      }
    }
    return MASTERPIECES_DATA;
  });

  const [botServices, setBotServices] = useState<BotServiceItem[]>(() => {
    const saved = localStorage.getItem('0003_bot_services');
    if (saved) {
      try {
        const parsed: BotServiceItem[] = JSON.parse(saved);
        return parsed.length > 0 ? parsed : BOT_SERVICES_DATA;
      } catch {
        return BOT_SERVICES_DATA;
      }
    }
    return BOT_SERVICES_DATA;
  });

  const [apps, setApps] = useState<AppItem[]>(() => {
    const saved = localStorage.getItem('0003_apps');
    if (saved) {
      try {
        const parsed: AppItem[] = JSON.parse(saved);
        return parsed.length > 0 ? parsed : APPS_DATA;
      } catch {
        return APPS_DATA;
      }
    }
    return APPS_DATA;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('0003_projects');
    if (saved) {
      try {
        const parsed: Project[] = JSON.parse(saved);
        return parsed.length > 0 ? parsed : PROJECTS_DATA;
      } catch {
        return PROJECTS_DATA;
      }
    }
    return PROJECTS_DATA;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('0003_testimonials');
    if (saved) {
      try {
        const parsed: Testimonial[] = JSON.parse(saved);
        return parsed.length > 0 ? parsed : TESTIMONIALS_DATA;
      } catch {
        return TESTIMONIALS_DATA;
      }
    }
    return TESTIMONIALS_DATA;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('0003_faqs');
    if (saved) {
      try {
        const parsed: FAQItem[] = JSON.parse(saved);
        return parsed.length > 0 ? parsed : FAQ_DATA;
      } catch {
        return FAQ_DATA;
      }
    }
    return FAQ_DATA;
  });

  const [orderMessages, setOrderMessages] = useState<OrderMessage[]>(() => {
    const saved = localStorage.getItem('0003_order_messages');
    if (saved) return JSON.parse(saved);
    return [];
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('0003_personal_info', JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem('0003_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('0003_masterpieces', JSON.stringify(masterpieces));
  }, [masterpieces]);

  useEffect(() => {
    localStorage.setItem('0003_bot_services', JSON.stringify(botServices));
  }, [botServices]);

  useEffect(() => {
    localStorage.setItem('0003_apps', JSON.stringify(apps));
  }, [apps]);

  useEffect(() => {
    localStorage.setItem('0003_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('0003_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('0003_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('0003_order_messages', JSON.stringify(orderMessages));
  }, [orderMessages]);

  // Fetch data from cPanel api.php or static data.json on app mount if available
  const fetchFromPhpServer = async () => {
    try {
      let response = await fetch('./api.php', { method: 'GET' });
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
        response = await fetch('./data.json', { method: 'GET' });
      }
      if (response.ok) {
        const data = await response.json();
        if (data && data.personalInfo) {
          setPersonalInfo(data.personalInfo);
          if (Array.isArray(data.services)) setServices(data.services);
          if (Array.isArray(data.masterpieces)) setMasterpieces(data.masterpieces);
          if (Array.isArray(data.botServices)) setBotServices(data.botServices);
          if (Array.isArray(data.apps)) setApps(data.apps);
          if (Array.isArray(data.projects)) setProjects(data.projects);
          if (Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
          if (Array.isArray(data.faqs)) setFaqs(data.faqs);
          if (Array.isArray(data.orderMessages)) setOrderMessages(data.orderMessages);
          return true;
        }
      }
    } catch (err) {
      // Fallback silently to localStorage
    }
    return false;
  };

  useEffect(() => {
    fetchFromPhpServer();
  }, []);

  // Handle new visitor order message submission
  const handleAddOrderMessage = async (msg: OrderMessage) => {
    setOrderMessages((prev) => [msg, ...prev]);

    try {
      await fetch('./api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_order_message',
          message: msg,
        }),
      });
    } catch (err) {
      // Fallback silently if running without server
    }
  };

  // Function to save all state directly into api.php (data.json on cPanel)
  const saveAllToPhpServer = async () => {
    const payload = {
      personalInfo,
      services,
      masterpieces,
      botServices,
      apps,
      projects,
      testimonials,
      faqs,
      orderMessages,
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch('./api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, message: result.message || 'اطلاعات با موفقیت ذخیره شد' };
      } else {
        return { success: false, message: 'پاسخ ناموفق از سرور cPanel' };
      }
    } catch (error) {
      return { success: true, message: 'تغییرات به صورت کامل در حافظه مرورگر ذخیره شد' };
    }
  };

  // Synchronize document dark/light class and browser theme-color
  useEffect(() => {
    const root = document.documentElement;
    let metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      metaThemeColor.content = '#06030c';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      metaThemeColor.content = '#f8fafc';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToSection = (id: PageSection | string) => {
    setActiveSection(id as PageSection);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderService = (serviceTitle: string) => {
    setInquiryServiceTitle(serviceTitle);
    setIsInquiryModalOpen(true);
  };

  // Scroll Spy to track active section in navigation
  useEffect(() => {
    const sectionIds: PageSection[] = ['home', 'services', 'creations', 'portfolio', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;
      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResetToDefaults = () => {
    localStorage.clear();
    setPersonalInfo(PERSONAL_INFO);
    setServices(SERVICES_DATA);
    setMasterpieces(MASTERPIECES_DATA);
    setBotServices(BOT_SERVICES_DATA);
    setApps(APPS_DATA);
    setProjects(PROJECTS_DATA);
    setTestimonials(TESTIMONIALS_DATA);
    setFaqs(FAQ_DATA);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative overflow-x-clip ${
        isDark ? 'bg-[#06030c] text-slate-100' : 'bg-[#f8f5fc] text-slate-900'
      }`}
      dir="rtl"
    >
      {/* Luxury Ambient Cursor Spotlight */}
      <LuxuryCursor />

      {/* Scroll-Driven Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 origin-right z-[60] shadow-[0_0_16px_rgba(168,85,247,0.9)]"
        style={{ scaleX }}
      />

      {/* Sticky Glass Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Parallax Radial Glow Blooms in Background */}
      <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="fixed top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/3 w-[550px] h-[550px] bg-fuchsia-600/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* ======================================================== */}
      {/* SCENE 1: CINEMATIC HERO */}
      {/* ======================================================== */}
      <Hero
        theme={theme}
        personalInfo={personalInfo}
        onExplorePortfolio={() => scrollToSection('portfolio')}
        onContactClick={() => {
          setInquiryServiceTitle('طراحی سایت اختصاصی و وردپرس');
          setIsInquiryModalOpen(true);
        }}
      />

      {/* ======================================================== */}
      {/* SCENE 2: INFINITE KINETIC TECH MARQUEE */}
      {/* ======================================================== */}
      <TechMarquee />

      {/* ======================================================== */}
      {/* SCENE 2.5: PHILOSOPHY & MANIFESTO STATEMENT */}
      {/* ======================================================== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>فلسفه طراحی و مهندسی 0003</span>
            </div>

            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              «پروژه‌ای که ساخته می‌شود باید هم در{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
                زیبایی بصری
              </span>{' '}
              و هم در{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                سرعت و کارایی
              </span>
              ، استانداردی نو تعریف کند.»
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed max-w-3xl mx-auto ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              در عصر انبوه قالب‌های کپی و کدهای سنگین، من معتقدم ارزش واقعی در معماری اختصاصی، طراحی مینیمال و لوکس، و اجرای بدون نقص معنا پیدا می‌کند. با من به‌طور مستقیم در ارتباط هستید؛ بدون واسطه و با تضمین بالاترین استاندارد کیفیتی.
            </p>

            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-right">
              <div className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="font-bold text-sm text-purple-200 mb-1">سرعت لود زیر ۱ ثانیه</h4>
                <p className="text-xs text-slate-400 leading-relaxed">بهینه‌سازی حداکثری کدها، کشینگ مدرن و سازگاری کامل با استانداردهای گوگل Core Web Vitals.</p>
              </div>

              <div className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                  <Layers className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="font-bold text-sm text-purple-200 mb-1">طراحی اختصاصی و سفارشی</h4>
                <p className="text-xs text-slate-400 leading-relaxed">دیزاین سیستم مدرن منطبق با هویت برند شما و دور از قالب‌های آماده تکراری بازار.</p>
              </div>

              <div className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="font-bold text-sm text-purple-200 mb-1">پشتیبانی و امنیت کامل</h4>
                <p className="text-xs text-slate-400 leading-relaxed">کدنویسی تمیز، مقاوم در برابر نفوذ و همراهی مداوم برای ارتقای مستمر پروژه.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 3: BENTO GRID 4 PILLARS (SERVICES) */}
      {/* ======================================================== */}
      <section id="services" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BentoServices
          theme={theme}
          services={services}
          onOrderService={handleOrderService}
        />
      </section>

      {/* ======================================================== */}
      {/* SCENE 4: FEATURED MASTERPIECES */}
      {/* ======================================================== */}
      <section id="portfolio" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-purple-500/10 space-y-12">
        <MasterpiecesSection
          theme={theme}
          masterpieces={masterpieces}
          onOrderService={handleOrderService}
        />

        {/* View All Projects Trigger Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-r from-purple-950/40 via-slate-900/80 to-indigo-950/40 border-purple-500/30 shadow-2xl'
              : 'bg-white border-purple-200 shadow-xl'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0 shadow-inner">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <h3 className={`text-xl sm:text-2xl font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                مشاهده آرشیو کامل نمونه‌کارها ({projects.length} پروژه)
              </h3>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                شامل وبسایت‌های بانکی، فروشگاه ابزار، کاتالوگ الدورادو، ایمان‌تک، اسباب‌بازی دنیای کودک، رزرو پزشکی و...
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPortfolioModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/35 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <span>ورود به گالری نمونه‌کارها</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 5: CREATIONS (BOTS & APPS) */}
      {/* ======================================================== */}
      <section id="creations" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-purple-500/10">
        <CreationsSection
          theme={theme}
          botServices={botServices}
          apps={apps}
          onOrderService={handleOrderService}
        />
      </section>

      {/* ======================================================== */}
      {/* SCENE 6: IMPACT NUMBERS & LIVE STATS */}
      {/* ======================================================== */}
      <section className="py-16 md:py-24 border-t border-purple-500/10 bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                number: personalInfo.experienceYears,
                label: 'سابقه کار تخصصی و حرفه‌ای',
                desc: 'در توسعه وب، اندروید و ربات',
                icon: <Clock className="w-5 h-5 text-indigo-400" />
              },
              {
                number: personalInfo.completedProjects,
                label: 'پروژه و محصول دیجیتال موفق',
                desc: 'تحویل داده شده با رضایت کامل',
                icon: <Flame className="w-5 h-5 text-amber-400" />
              },
              {
                number: personalInfo.satisfactionRate,
                label: 'رضایت مشتریان و کارفرمایان',
                desc: 'کیفیت تضمینی و پشتیبانی واقعی',
                icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
              },
              {
                number: '< ۰.۸s',
                label: 'میانگین سرعت لود وبسایت‌ها',
                desc: 'گواهی Grade A از GTmetrix',
                icon: <Zap className="w-5 h-5 text-fuchsia-400" />
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-slate-900/60 border-purple-500/20 shadow-xl hover:border-purple-500/40'
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-xl bg-purple-600/10 border border-purple-500/20">
                    {stat.icon}
                  </span>
                </div>
                <div>
                  <span className="text-3xl sm:text-4xl font-black font-english text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 block mb-2">
                    {stat.number}
                  </span>
                  <h4 className={`text-sm sm:text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stat.label}
                  </h4>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SCENE 7: TESTIMONIALS */}
      {/* ======================================================== */}
      <section className="border-t border-purple-500/10">
        <TestimonialsSection testimonials={testimonials} />
      </section>

      {/* ======================================================== */}
      {/* SCENE 8: FINAL CONVERSION PORTAL (CTA) */}
      {/* ======================================================== */}
      <section id="contact" className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-purple-500/10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl p-8 sm:p-14 border relative overflow-hidden text-center max-w-4xl mx-auto ${
            isDark
              ? 'bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-950 border-purple-500/30 shadow-2xl purple-glow'
              : 'bg-white border-purple-200 shadow-xl'
          }`}
        >
          {/* Background Ambient Radial */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>شروع همکاری مستقیم با برند 0003</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              آماده‌اید ایده‌تان را به یک
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
                محصول دیجیتال استثنایی
              </span>{' '}
              تبدیل کنیم؟
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              از طراحی وبسایت‌های اختصاصی و وردپرس تا اپلیکیشن اندروید، ربات‌های تلگرام و دیزاین گرافیک؛ همراه شما هستم.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <a
                href={personalInfo.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/40 transition-all hover:scale-105 active:scale-95"
              >
                <Send className="w-5 h-5 rotate-[-20deg]" />
                <span>پیام مستقیم در تلگرام</span>
              </a>

              <button
                onClick={() => {
                  setInquiryServiceTitle('طراحی سایت اختصاصی و وردپرس');
                  setIsInquiryModalOpen(true);
                }}
                className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm sm:text-base border transition-all hover:scale-105 active:scale-95 ${
                  isDark
                    ? 'bg-slate-900/90 border-purple-500/40 text-purple-200 hover:bg-slate-800'
                    : 'bg-slate-100 border-purple-200 text-purple-900 hover:bg-white'
                }`}
              >
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <span>ارسال فرم مشاوره</span>
              </button>
            </div>

            {/* Quick Contact Badges */}
            <div className="pt-8 border-t border-purple-500/20 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-english font-bold">{personalInfo.phone}</span>
              </a>
              <span>•</span>
              <a href={personalInfo.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <Send className="w-4 h-4 text-sky-400 rotate-[-20deg]" />
                <span className="font-english font-bold">@{personalInfo.telegram}</span>
              </a>
              <span>•</span>
              <a href={personalInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <Instagram className="w-4 h-4 text-rose-400" />
                <span className="font-english font-bold">@{personalInfo.instagram}</span>
              </a>
            </div>

          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <Footer
        theme={theme}
        personalInfo={personalInfo}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/40 border border-purple-400/40 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            title="بازگشت به بالا"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Telegram Pill */}
      <motion.a
        href={personalInfo.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 text-purple-200 border border-purple-500/30 shadow-xl shadow-purple-950/40 backdrop-blur-md hover:bg-purple-950 transition-all hover:scale-105 active:scale-95"
      >
        <Send className="w-4 h-4 text-purple-400 rotate-[-20deg]" />
        <span className="text-xs font-bold font-english">@{personalInfo.telegram}</span>
      </motion.a>

      {/* Full Portfolio Archive Modal */}
      <FullPortfolioModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        theme={theme}
        projects={projects}
      />

      {/* Quick Inquiry / Order Modal */}
      <QuickInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialServiceTitle={inquiryServiceTitle}
        onAddOrderMessage={handleAddOrderMessage}
        personalInfo={personalInfo}
        theme={theme}
      />

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        personalInfo={personalInfo}
        setPersonalInfo={setPersonalInfo}
        services={services}
        setServices={setServices}
        masterpieces={masterpieces}
        setMasterpieces={setMasterpieces}
        botServices={botServices}
        setBotServices={setBotServices}
        apps={apps}
        setApps={setApps}
        projects={projects}
        setProjects={setProjects}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        faqs={faqs}
        setFaqs={setFaqs}
        orderMessages={orderMessages}
        setOrderMessages={setOrderMessages}
        onResetToDefaults={handleResetToDefaults}
        onSaveToPhpServer={saveAllToPhpServer}
        onFetchFromPhpServer={fetchFromPhpServer}
      />
    </div>
  );
}
