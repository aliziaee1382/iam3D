import React, { useState } from 'react';
import { Phone, Send, Instagram, ChevronDown, Copy, Check, ExternalLink, Mail, MapPin, Globe, Link2, MessageSquare } from 'lucide-react';
import { PersonalInfo, ThemeMode, CustomContact } from '../types';

interface SidebarProps {
  theme: ThemeMode;
  personalInfo: PersonalInfo;
}

export const Sidebar: React.FC<SidebarProps> = ({ theme, personalInfo }) => {
  const [showContacts, setShowContacts] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getCustomIcon = (iconName?: string) => {
    switch (iconName) {
      case 'mail': return <Mail className="w-4 h-4 text-amber-400" />;
      case 'map': return <MapPin className="w-4 h-4 text-purple-400" />;
      case 'globe': return <Globe className="w-4 h-4 text-indigo-400" />;
      case 'phone': return <Phone className="w-4 h-4 text-emerald-400" />;
      case 'send': return <Send className="w-4 h-4 text-sky-400 rotate-[-20deg]" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-rose-400" />;
      default: return <Link2 className="w-4 h-4 text-fuchsia-400" />;
    }
  };

  const baseContactItems = [
    {
      icon: <Phone className="w-4 h-4 text-emerald-400" />,
      title: 'شماره تماس مستقیم',
      value: personalInfo.phone,
      copyValue: personalInfo.phone,
      key: 'phone',
      link: `tel:${personalInfo.phone}`
    },
    {
      icon: <Send className="w-4 h-4 text-sky-400 rotate-[-20deg]" />,
      title: 'تلگرام',
      value: `@${personalInfo.telegram}`,
      copyValue: `@${personalInfo.telegram}`,
      key: 'telegram',
      link: personalInfo.telegramUrl
    },
    {
      icon: <Instagram className="w-4 h-4 text-rose-400" />,
      title: 'اینستاگرام',
      value: `@${personalInfo.instagram}`,
      copyValue: `@${personalInfo.instagram}`,
      key: 'instagram',
      link: personalInfo.instagramUrl
    }
  ];

  const customItemsMapped = (personalInfo.customContacts || []).map((cc) => ({
    icon: getCustomIcon(cc.iconName),
    title: cc.title,
    value: cc.value,
    copyValue: cc.value,
    key: cc.id,
    link: cc.link
  }));

  const allContactItems = [...baseContactItems, ...customItemsMapped];

  const avatarSrc = personalInfo.avatarImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";
  const statusText = personalInfo.statusText || "آنلاین";

  return (
    <aside
      className={`w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 self-start z-30 rounded-3xl transition-all duration-300 relative overflow-hidden ${
        theme === 'dark'
          ? 'vcard-panel-dark text-slate-100 p-6 sm:p-8'
          : 'vcard-panel-light text-slate-900 p-6 sm:p-8'
      }`}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      {/* Profile Header Block */}
      <div className="flex flex-row lg:flex-col items-center gap-5 text-right lg:text-center relative">
        
        {/* Avatar Container with Glow Ring */}
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-amber-400 p-1 shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/50 transition-all duration-300">
            <div className={`w-full h-full rounded-[14px] overflow-hidden relative flex items-center justify-center ${
              theme === 'dark' ? 'bg-slate-950' : 'bg-slate-900'
            }`}>
              <img
                src={avatarSrc}
                alt={personalInfo.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Active Status Badge Dot */}
          <div className="absolute -bottom-1 -left-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[10px] text-emerald-400 font-semibold shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{statusText}</span>
          </div>
        </div>

        {/* Name and Title */}
        <div className="flex-1 lg:flex-initial">
          <div className="flex items-center gap-2 justify-start lg:justify-center mb-1">
            <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              {personalInfo.name}
            </h1>
            <span className="font-english font-black text-xs px-2 py-0.5 rounded-md bg-purple-600 text-white shadow-sm">
              {personalInfo.brand}
            </span>
          </div>

          <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-xs ${
            theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
          }`}>
            {personalInfo.tagline}
          </p>
        </div>

      </div>

      {/* Mobile Toggle Button for contacts */}
      <div className="lg:hidden mt-4 pt-4 border-t border-purple-500/20">
        <button
          onClick={() => setShowContacts(!showContacts)}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-bold ${
            theme === 'dark'
              ? 'bg-slate-900/80 border-purple-500/30 text-purple-300'
              : 'bg-purple-50 border-purple-200 text-purple-900'
          }`}
        >
          <span>{showContacts ? 'بستن اطلاعات تماس' : 'نمایش اطلاعات تماس'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showContacts ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Separator Line (desktop) */}
      <div className={`hidden lg:block my-6 border-t ${
        theme === 'dark' ? 'border-purple-500/20' : 'border-slate-200'
      }`} />

      {/* Contacts List */}
      <div className={`${showContacts ? 'block mt-4' : 'hidden'} lg:block space-y-3`}>
        
        {allContactItems.map((item) => (
          <div
            key={item.key}
            className={`flex items-start gap-3 p-3 rounded-2xl transition-all group border ${
              theme === 'dark'
                ? 'bg-slate-900/60 border-purple-500/10 hover:border-purple-500/30 hover:bg-slate-900'
                : 'bg-slate-50 border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border shadow-sm ${
              theme === 'dark'
                ? 'bg-slate-950 border-purple-500/20'
                : 'bg-white border-slate-200'
            }`}>
              {item.icon}
            </div>

            <div className="flex-1 min-w-0">
              <span className={`text-[11px] block font-semibold mb-0.5 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {item.title}
              </span>

              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`text-xs font-bold transition-colors truncate block flex items-center gap-1 ${
                    theme === 'dark' ? 'text-slate-200 hover:text-purple-300' : 'text-slate-800 hover:text-purple-700'
                  }`}
                >
                  <span className="truncate">{item.value}</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-60" />
                </a>
              ) : (
                <span className={`text-xs font-bold block truncate ${
                  theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  {item.value}
                </span>
              )}
            </div>

            {item.copyValue && (
              <button
                onClick={(e) => copyToClipboard(item.copyValue!, item.key, e)}
                className={`p-1.5 rounded-lg opacity-80 hover:opacity-100 transition-all ${
                  theme === 'dark' ? 'hover:bg-purple-950 text-slate-400' : 'hover:bg-purple-100 text-slate-500'
                }`}
                title="کپی"
              >
                {copiedKey === item.key ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        ))}

        {/* Separator */}
        <div className={`my-6 border-t ${
          theme === 'dark' ? 'border-purple-500/20' : 'border-slate-200'
        }`} />

        {/* Social Links Row & Direct Telegram CTA */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <a
              href={personalInfo.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-2xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-purple-500/20 text-sky-400 hover:bg-sky-950 hover:border-sky-500/40'
                  : 'bg-slate-50 border-slate-200 text-sky-600 hover:bg-sky-50'
              }`}
              title="تلگرام"
            >
              <Send className="w-5 h-5 rotate-[-20deg]" />
            </a>

            <a
              href={personalInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-2xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-purple-500/20 text-rose-400 hover:bg-rose-950 hover:border-rose-500/40'
                  : 'bg-slate-50 border-slate-200 text-rose-600 hover:bg-rose-50'
              }`}
              title="اینستاگرام"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href={`tel:${personalInfo.phone}`}
              className={`p-3 rounded-2xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-purple-500/20 text-emerald-400 hover:bg-emerald-950 hover:border-emerald-500/40'
                  : 'bg-slate-50 border-slate-200 text-emerald-600 hover:bg-emerald-50'
              }`}
              title="تماس تلفنی"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          <a
            href={personalInfo.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="vcard-sidebar-telegram-cta"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Send className="w-4 h-4 rotate-[-20deg]" />
            <span>سفارش مستقیم در تلگرام</span>
          </a>
        </div>

      </div>

    </aside>
  );
};
