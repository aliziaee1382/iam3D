import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Send, Instagram, Copy, Check, MessageSquare, ChevronDown, Sparkles, HelpCircle } from 'lucide-react';
import { PERSONAL_INFO, FAQ_DATA } from '../data/portfolioData';
import { ThemeMode, OrderMessage } from '../types';

interface ContactSectionProps {
  theme: ThemeMode;
  initialServiceTitle?: string;
  onAddOrderMessage?: (msg: OrderMessage) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme, initialServiceTitle = '', onAddOrderMessage }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [name, setName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(initialServiceTitle || 'طراحی سایت اختصاصی و وردپرس');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactHandle.trim()) return;

    const newMsg: OrderMessage = {
      id: `msg_${Date.now()}`,
      name: name.trim(),
      contactHandle: contactHandle.trim(),
      serviceNeeded: serviceNeeded || 'طراحی سایت اختصاصی و وردپرس',
      message: message.trim() || 'درخواست مشاوره جهت ثبت سفارش',
      createdAt: new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }) + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    if (onAddOrderMessage) {
      onAddOrderMessage(newMsg);
    }

    setSubmitted(true);
  };

  const handleOpenInTelegram = () => {
    const text = `سلام آقای علی ضیائی!👋%0Aنام: ${encodeURIComponent(name || 'مشتری جدید')}%0Aشماره/آیدی: ${encodeURIComponent(contactHandle || 'نامشخص')}%0Aخدمت مورد نیاز: ${encodeURIComponent(serviceNeeded)}%0Aتوضیحات: ${encodeURIComponent(message || 'درخواست مشاوره جهت ثبت سفارش')}`;
    window.open(`https://t.me/${PERSONAL_INFO.telegram}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-12">
      
      {/* Title */}
      <div>
        <h2 className={`text-2xl sm:text-3xl font-black article-title-accent mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          راه ارتباطی و سفارش پروژه
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
        }`}>
          جهت ثبت سفارش، مشاوره فنی رایگان و استعلام هزینه‌ها می‌توانید مستقیم پیام دهید یا فرم زیر را تکمیل نمایید.
        </p>
      </div>

      {/* Quick Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Phone */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
          theme === 'dark' ? 'bg-slate-900/60 border-purple-500/20' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
              <Phone className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className={`text-base font-bold mb-1 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              تماس مستقیم
            </h3>
            <p className={`text-xs mb-3 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              جهت مشاوره فوری تلفنی
            </p>

            <div className={`p-3 rounded-xl border flex items-center justify-between font-english font-bold text-base mb-4 ${
              theme === 'dark' ? 'bg-slate-950 border-purple-500/20 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <span>{PERSONAL_INFO.phone}</span>
              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                className="p-1 rounded-lg text-slate-400 hover:text-purple-400"
              >
                {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>برقراری تماس</span>
          </a>
        </div>

        {/* Telegram */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
          theme === 'dark' ? 'bg-slate-900/60 border-purple-500/20' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
              <Send className="w-5 h-5 text-sky-400 rotate-[-20deg]" />
            </div>
            <h3 className={`text-base font-bold mb-1 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              آیدی تلگرام
            </h3>
            <p className={`text-xs mb-3 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              ثبت سفارش و ارسال مستندات
            </p>

            <div className={`p-3 rounded-xl border flex items-center justify-between font-english font-bold text-base mb-4 ${
              theme === 'dark' ? 'bg-slate-950 border-purple-500/20 text-sky-400' : 'bg-white border-slate-200 text-sky-600'
            }`}>
              <span>@{PERSONAL_INFO.telegram}</span>
              <button
                onClick={() => copyToClipboard(`@${PERSONAL_INFO.telegram}`, 'telegram')}
                className="p-1 rounded-lg text-slate-400 hover:text-purple-400"
              >
                {copiedKey === 'telegram' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-purple-600/30"
          >
            <Send className="w-3.5 h-3.5 rotate-[-20deg]" />
            <span>چت در تلگرام</span>
          </a>
        </div>

        {/* Instagram */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
          theme === 'dark' ? 'bg-slate-900/60 border-purple-500/20' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
              <Instagram className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className={`text-base font-bold mb-1 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              پیج اینستاگرام
            </h3>
            <p className={`text-xs mb-3 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              مشاهده دموها و استوری‌ها
            </p>

            <div className={`p-3 rounded-xl border flex items-center justify-between font-english font-bold text-base mb-4 ${
              theme === 'dark' ? 'bg-slate-950 border-purple-500/20 text-rose-400' : 'bg-white border-slate-200 text-rose-600'
            }`}>
              <span>@{PERSONAL_INFO.instagram}</span>
              <button
                onClick={() => copyToClipboard(`@${PERSONAL_INFO.instagram}`, 'instagram')}
                className="p-1 rounded-lg text-slate-400 hover:text-purple-400"
              >
                {copiedKey === 'instagram' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2 shadow-md"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>پیج اینستاگرام</span>
          </a>
        </div>

      </div>

      {/* Form & FAQ Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${
          theme === 'dark' ? 'bg-slate-900/60 border-purple-500/20' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                فرم سریع ثبت سفارش
              </h3>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                اطلاعات پروژه خود را ارسال فرمایید
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-purple-600/10 border border-purple-500/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                درخواست شما ثبت شد!
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                با تشکر از شما {name}. پیام جهت پیگیری دریافت شد. برای تسریع می‌توانید مستقیم در تلگرام پیام دهید.
              </p>
              
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleOpenInTelegram}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md"
                >
                  <Send className="w-4 h-4 rotate-[-20deg]" />
                  <span>چت مستقیم در تلگرام</span>
                </button>

                <button
                  onClick={() => setSubmitted(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold ${
                    theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  ارسال پیام جدید
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs font-semibold block mb-1.5 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    نام و نام خانوادگی <span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً: علی محمدی"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:border-purple-500 ${
                      theme === 'dark' ? 'bg-slate-950 border-purple-500/20 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-semibold block mb-1.5 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    شماره یا آیدی تلگرام <span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactHandle}
                    onChange={(e) => setContactHandle(e.target.value)}
                    placeholder="0912... یا ID@"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:border-purple-500 ${
                      theme === 'dark' ? 'bg-slate-950 border-purple-500/20 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`text-xs font-semibold block mb-1.5 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  نوع خدمت
                </label>
                <select
                  value={serviceNeeded}
                  onChange={(e) => setServiceNeeded(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:border-purple-500 ${
                    theme === 'dark' ? 'bg-slate-950 border-purple-500/20 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="طراحی سایت اختصاصی و وردپرس">طراحی سایت اختصاصی و وردپرس</option>
                  <option value="طراحی و توسعه اپلیکیشن موبایل (کتلین و جاوا)">طراحی و توسعه اپلیکیشن موبایل (کتلین و جاوا)</option>
                  <option value="توسعه ربات هوشمند تلگرام">توسعه ربات هوشمند تلگرام</option>
                  <option value="طراحی گرافیک، بنر و لوگو">طراحی گرافیک، بنر و لوگو</option>
                  <option value="مشاوره عمومی">مشاوره عمومی و موارد دیگر</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-semibold block mb-1.5 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  توضیحات پروژه
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="نیازمندی‌ها یا خلاصه‌ای از پروژه خود را بنویسید..."
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:border-purple-500 resize-none ${
                    theme === 'dark' ? 'bg-slate-950 border-purple-500/20 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="pt-2 flex flex-wrap sm:flex-nowrap gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all"
                >
                  ثبت پیام
                </button>

                <button
                  type="button"
                  onClick={handleOpenInTelegram}
                  className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-slate-950 border-purple-500/30 text-purple-300 hover:bg-slate-900'
                      : 'bg-white border-slate-300 text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 rotate-[-20deg]" />
                  <span>ارسال مستقیم به تلگرام</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* FAQ Accordion */}
        <div className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border ${
          theme === 'dark' ? 'bg-slate-900/60 border-purple-500/20' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              سوالات متداول
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    theme === 'dark' ? 'bg-slate-950 border-purple-500/20' : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className={`w-full p-3.5 text-right flex items-center justify-between font-bold text-xs transition-colors ${
                      theme === 'dark' ? 'text-slate-200 hover:text-purple-300' : 'text-slate-800 hover:text-purple-700'
                    }`}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-purple-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`px-3.5 pb-3.5 pt-1 text-xs leading-relaxed border-t ${
                          theme === 'dark' ? 'text-slate-400 border-purple-500/10' : 'text-slate-600 border-slate-100'
                        }`}
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};

