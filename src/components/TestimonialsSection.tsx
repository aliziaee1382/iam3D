import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials = TESTIMONIALS_DATA }) => {
  const testimonialsList = testimonials && testimonials.length > 0 ? testimonials : TESTIMONIALS_DATA;
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    if (testimonialsList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonialsList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonialsList.length]);

  const activeIndex = currentTestimonialIndex >= testimonialsList.length ? 0 : currentTestimonialIndex;
  const currentItem = testimonialsList[activeIndex];

  return (
    <section className="py-16 md:py-24 relative bg-slate-950/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>نظرات و رضایت مشتریان</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            مشتریان درباره خدمات چه می‌گویند؟
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            تعهد به کیفیت، تحویل به موقع و پشتیبانی واقعی پس از تحویل پروژه.
          </p>
        </div>

        {/* Testimonials Auto Slider - Single Row Card */}
        {currentItem && (
          <div className="relative overflow-hidden min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id || activeIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-purple-500/20 shadow-xl flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(currentItem.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-purple-300 bg-purple-950 px-3 py-1 rounded-full border border-purple-500/30">
                      {currentItem.projectType}
                    </span>
                  </div>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 italic">
                    "{currentItem.comment}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-purple-500/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentItem.avatar}
                      alt={currentItem.name}
                      className="w-10 h-10 rounded-full object-cover border border-purple-500/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{currentItem.name}</h4>
                      <p className="text-xs text-slate-400">{currentItem.role}</p>
                    </div>
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {testimonialsList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentTestimonialIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeIndex
                            ? 'w-6 bg-purple-500'
                            : 'w-1.5 bg-slate-700 hover:bg-slate-600'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
