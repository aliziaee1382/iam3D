import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code, Bot, Globe, Palette, Smartphone, Send, ArrowDown, ShieldCheck, Zap, Star, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PersonalInfo, ThemeMode } from '../types';

interface HeroProps {
  theme?: ThemeMode;
  personalInfo?: PersonalInfo;
  onExplorePortfolio: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  theme = 'dark',
  personalInfo = PERSONAL_INFO,
  onExplorePortfolio,
  onContactClick,
}) => {
  const [activeTab, setActiveTab] = useState<'web' | 'app' | 'bot' | 'design'>('web');
  const isDark = theme === 'dark';

  const snippetContent = {
    web: `// 0003 React & WordPress Studio
const WebExperience = () => {
  return (
    <StudioCanvas color="purple" mode="dark">
      <Hero title="علی ضیائی - وبسایت اختصاصی و وردپرس" />
      <SpeedScore gtmetrix="99/100" />
      <ModernUI animation="smooth" />
    </StudioCanvas>
  );
};`,
    app: `// 0003 Native Android (Kotlin & Java)
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // High Performance & Material Design UI
        Studio0003App.init(KotlinCoroutines.FAST)
    }
}`,
    bot: `# 0003 Telegram Bot Core (Python)
from telegram.ext import ApplicationBuilder, CommandHandler

async function start(update, context):
    await update.message.reply_text(
        "👋 سلام! به ربات اختصاصی 0003 خوش آمدید.\\n"
        "⚡ آماده پردازش اتوماتیک سفارشات شما"
    )`,
    design: `/* 0003 Graphic & Branding Studio */
.brand-identity {
  primary-color: #9333ea; /* Benafsh Purple */
  glow-effect: 0 0 35px rgba(168, 85, 247, 0.6);
  typography: 'Vazirmatn' + 'Jakarta';
  aesthetic: 'Ultra Modern Dark & Light';
}`
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Radial Glow & Grid Pattern */}
      <div className="absolute top-1/4 right-1/2 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content - Left/Right in RTL */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-950/80 border border-purple-500/30 shadow-lg shadow-purple-900/20 mb-6 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-purple-200">
                آماده دریافت پروژه‌های جدید و همکاری
              </span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 leading-[1.25] tracking-tight mb-6"
            >
              خلق تجربه دیجیتال
              <br />
              با برند شخصی{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 purple-text-glow">
                0003
              </span>
            </motion.h1>

            {/* Subtitle / Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              سلام! من <strong className="text-purple-400 font-semibold">{personalInfo.name}</strong> هستم. متخصص{' '}
              <span className="text-purple-400 underline underline-offset-4 decoration-purple-500/40">طراحی سایت اختصاصی و وردپرس</span>،{' '}
              <span className="text-purple-400 underline underline-offset-4 decoration-purple-500/40">توسعه اپلیکیشن (کتلین و جاوا)</span>،{' '}
              <span className="text-purple-400 underline underline-offset-4 decoration-purple-500/40">ربات‌های تلگرام</span> و{' '}
              <span className="text-purple-400 underline underline-offset-4 decoration-purple-500/40">دیزاین گرافیک</span>.
              تمرکز من بر نهایت زیبایی، سرعت بالا و کارآمدی محصولات است.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 w-full sm:w-auto mb-10"
            >
              <button
                onClick={onExplorePortfolio}
                id="hero-portfolio-btn"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              >
                <span>مشاهده نمونه کارها</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </button>

              <a
                href={personalInfo.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-telegram-btn"
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-base shadow-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0 ${
                  isDark
                    ? 'bg-slate-900/90 hover:bg-slate-800 text-purple-200 border border-purple-500/40 hover:border-purple-400 shadow-purple-950/40'
                    : 'bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 shadow-purple-200/50'
                }`}
              >
                <Send className="w-5 h-5 rotate-[-20deg] text-purple-400" />
                <span>ارسال سفارش در تلگرام</span>
              </a>
            </motion.div>

            {/* Key Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`grid grid-cols-3 gap-4 pt-6 border-t w-full ${
                isDark ? 'border-purple-500/20' : 'border-purple-200'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-2xl sm:text-3xl font-black font-english ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {personalInfo.completedProjects}
                </span>
                <span className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>پروژه تحویل داده شده</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-purple-500 font-english">
                  {personalInfo.satisfactionRate}
                </span>
                <span className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>رضایت مشتریان</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl sm:text-3xl font-black font-english ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {personalInfo.experienceYears}
                </span>
                <span className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>سابقه کار تخصصی</span>
              </div>
            </motion.div>

          </div>

          {/* Interactive Code & Studio Showcase Card - Right in RTL */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-3xl p-1 bg-gradient-to-b from-purple-500/40 via-indigo-500/20 to-purple-900/40 shadow-2xl purple-glow"
            >
              <div className="bg-slate-950 rounded-[22px] overflow-hidden border border-purple-500/20">
                
                {/* Mock Window Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-english text-xs font-bold text-purple-300 bg-purple-950 px-2.5 py-1 rounded-md border border-purple-500/30">
                      0003_STUDIO.v2
                    </span>
                  </div>
                </div>

                {/* Studio Service Selector Tabs */}
                <div className="grid grid-cols-4 gap-1 p-2 bg-slate-900/40 border-b border-purple-500/10">
                  <button
                    onClick={() => setActiveTab('web')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'web'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">وب و وردپرس</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('app')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'app'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">اپلیکیشن</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('bot')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'bot'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">ربات تلگرام</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('design')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'design'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">بنر و لوگو</span>
                  </button>
                </div>

                {/* Code Window Content */}
                <div className="p-5 font-english text-xs sm:text-sm text-purple-200 bg-slate-950/90 min-h-[220px] overflow-x-auto leading-relaxed">
                  <pre className="text-slate-300 font-mono">
                    <code>{snippetContent[activeTab]}</code>
                  </pre>
                </div>

                {/* Interactive Status Footer inside Card */}
                <div className="p-4 bg-slate-900/80 border-t border-purple-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-slate-300">سرعت تحویل بالا و پشتیبانی کامل</span>
                  </div>
                  <button
                    onClick={onContactClick}
                    className="text-xs text-purple-300 hover:text-white font-medium underline underline-offset-4"
                  >
                    ثبت سفارش این سرویس
                  </button>
                </div>

              </div>
            </motion.div>

            {/* Floating Mini Decorative Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-purple-500/30 shadow-xl backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-300">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">طراحی اختصاصی 0003</p>
                <p className="text-[11px] text-slate-400">تضمین بالاترین کیفیت visual</p>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Scroll Down Mouse Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-14 sm:mt-16 flex flex-col items-center justify-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          onClick={onExplorePortfolio}
        >
          <span className="text-xs text-purple-400 font-bold tracking-wider">برای مشاهده بیشتر اسکرول کنید</span>
          <div className="w-5 h-9 rounded-full border-2 border-purple-500/40 flex items-start justify-center p-1 bg-purple-950/20 backdrop-blur-xs">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-purple-400 to-indigo-400"
            />
          </div>
          <ChevronDown className="w-4 h-4 text-purple-400/70 -mt-1 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};
