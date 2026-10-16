import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Phone, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { OrderMessage, PersonalInfo, ThemeMode } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceTitle?: string;
  onAddOrderMessage?: (msg: OrderMessage) => void;
  personalInfo?: PersonalInfo;
  theme?: ThemeMode;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({
  isOpen,
  onClose,
  initialServiceTitle = 'طراحی سایت اختصاصی و وردپرس',
  onAddOrderMessage,
  personalInfo = PERSONAL_INFO,
  theme = 'dark',
}) => {
  const [name, setName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(initialServiceTitle);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
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

  const handleOpenTelegram = () => {
    const text = `سلام آقای ${personalInfo.name}! 👋%0Aنام: ${encodeURIComponent(name || 'مشتری جدید')}%0Aشماره/آیدی: ${encodeURIComponent(contactHandle || 'نامشخص')}%0Aخدمت مورد نیاز: ${encodeURIComponent(serviceNeeded)}%0Aتوضیحات: ${encodeURIComponent(message || 'درخواست مشاوره جهت ثبت سفارش')}`;
    window.open(`https://t.me/${personalInfo.telegram}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto" dir="rtl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl -z-10"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-slate-950 border border-purple-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Purple Light */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-xl bg-slate-900 border border-purple-500/20 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-purple-400">ثبت سفارش و شروع پروژه</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-2">
                مشاوره اولیه رایگان با {personalInfo.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                مشخصات پروژه یا نیازتان را بنویسید تا در سریع‌ترین زمان زمان‌بندی و برآورد هزینه خدمتتان اعلام شود.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    نام و نام خانوادگی <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: رضا محمدی"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    شماره تماس یا آیدی تلگرام <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contactHandle}
                    onChange={(e) => setContactHandle(e.target.value)}
                    placeholder="0912... یا @your_id"
                    dir="ltr"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-400 transition-colors text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    خدمت مورد نظر
                  </label>
                  <select
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-400 transition-colors"
                  >
                    <option value="طراحی سایت اختصاصی و وردپرس">طراحی سایت اختصاصی و وردپرس</option>
                    <option value="طراحی و توسعه اپلیکیشن موبایل">طراحی و توسعه اپلیکیشن موبایل (کتلین و جاوا)</option>
                    <option value="توسعه ربات هوشمند تلگرام">توسعه ربات هوشمند تلگرام</option>
                    <option value="طراحی بنر و لوگو">طراحی هویت بصری، بنر و لوگو</option>
                    <option value="مشاوره یا سفارش سفارشی">مشاوره یا سفارش سفارشی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    توضیحات یا خلاصه ایده
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="امکانات، پیش‌نیازها یا هر نکته دیگری که مد نظرتان است..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>ارسال فرم پیام</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenTelegram}
                    className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-purple-200 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-purple-400 rotate-[-20deg]" />
                    <span>چت در تلگرام</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white">پیام شما با موفقیت ثبت شد!</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                با تشکر از اعتماد شما. در اسرع وقت از طریق شماره یا آیدی ثبت‌شده با شما ارتباط برقرار خواهد شد.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleOpenTelegram}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
                >
                  <Send className="w-4 h-4 rotate-[-20deg]" />
                  <span>پیگیری فوری در تلگرام</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs sm:text-sm font-bold hover:bg-slate-700"
                >
                  بستن
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
