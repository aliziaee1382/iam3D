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
import { Sidebar } from './components/Sidebar';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CreationsSection } from './components/CreationsSection';
import { MasterpiecesSection } from './components/MasterpiecesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { ArrowUp, Send, Sparkles, Zap } from 'lucide-react';
import {
  PERSONAL_INFO,
  SERVICES_DATA,
  BOT_SERVICES_DATA,
  APPS_DATA,
  MASTERPIECES_DATA,
  PROJECTS_DATA,
  TESTIMONIALS_DATA,
  FAQ_DATA,
  SKILLS_DATA
} from './data/portfolioData';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeSection, setActiveSection] = useState<PageSection>('home');
  const [prefilledService, setPrefilledService] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll Progress Tracking for Top Gradient Line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Auto-migrate outdated localStorage cache to new exported backup data
  const CURRENT_DATA_VERSION = '2026-10-16_v2';
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
        const parsed: PersonalInfo = JSON.parse(saved);
        return parsed;
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
      // Fallback silently to localStorage when running client-only dev server
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
      return { success: true, message: 'تغییرات به صورت کامل در حافظه مرورگر ذخیره شد (فایل api.php نیز در پوشه public جهت آپلود روی cPanel آماده است)' };
    }
  };

  // Synchronize document dark/light class and browser top bar theme-color
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
      metaThemeColor.content = '#0c0718';
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
    setPrefilledService(serviceTitle);
    scrollToSection('contact');
  };

  // Scroll Spy to track active section in navigation
  useEffect(() => {
    const sectionIds: PageSection[] = ['home', 'about', 'services', 'creations', 'portfolio', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 260;
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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative overflow-x-clip ${
        theme === 'dark'
          ? 'bg-[#0a0612] text-slate-100'
          : 'bg-[#f4effa] text-slate-900'
      }`}
      dir="rtl"
    >
      {/* Scroll-Driven Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 origin-right z-[60] shadow-[0_0_14px_rgba(168,85,247,0.85)]"
        style={{ scaleX }}
      />

      {/* Modern Sticky Glass Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Ambient Parallax Glowing Backgrounds */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* SECTION 1: HERO */}
      <Hero
        theme={theme}
        personalInfo={personalInfo}
        onExplorePortfolio={() => scrollToSection('portfolio')}
        onContactClick={() => scrollToSection('contact')}
      />

      {/* SECTION 2: ABOUT & PROFILE */}
      <section id="about" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start gap-8"
        >
          {/* Profile Sidebar Card */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <Sidebar theme={theme} personalInfo={personalInfo} />
          </div>

          {/* Main About Details & Core Principles */}
          <div className="flex-1 w-full min-w-0 space-y-12">
            <AboutSection
              theme={theme}
              onOrderService={handleOrderService}
              personalInfo={personalInfo}
              services={services}
            />

            {/* Scroll-Triggered Animated Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-purple-500/20 shadow-xl'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-6 bg-purple-500 rounded-full inline-block" />
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  سطح تخصص و مهارت‌های فنی
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SKILLS_DATA.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm font-bold">
                      <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>
                        {skill.name}
                      </span>
                      <span className="text-purple-400 font-english font-mono">{skill.level}٪</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-950/40 rounded-full overflow-hidden border border-purple-500/20">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section id="services" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-purple-500/10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <ServicesSection
            theme={theme}
            services={services}
            onOrderService={handleOrderService}
          />
        </motion.div>
      </section>

      {/* SECTION 4: CREATIONS (BOTS & APPS) */}
      <section id="creations" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-purple-500/10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <CreationsSection
            theme={theme}
            botServices={botServices}
            apps={apps}
            onOrderService={handleOrderService}
          />
        </motion.div>
      </section>

      {/* SECTION 5: MASTERPIECES & PORTFOLIO GALLERY */}
      <section id="portfolio" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-purple-500/10 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <MasterpiecesSection
            theme={theme}
            masterpieces={masterpieces}
            onOrderService={handleOrderService}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <PortfolioSection
            theme={theme}
            projects={projects}
          />
        </motion.div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section id="testimonials" className="border-t border-purple-500/10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <TestimonialsSection testimonials={testimonials} />
        </motion.div>
      </section>

      {/* SECTION 7: CONTACT & ORDER FORM */}
      <section id="contact" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-purple-500/10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <ContactSection
            theme={theme}
            initialServiceTitle={prefilledService}
            onAddOrderMessage={handleAddOrderMessage}
          />
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

      {/* Floating Direct Telegram Pill */}
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
