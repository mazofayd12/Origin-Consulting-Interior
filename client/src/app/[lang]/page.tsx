'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/context';
import { Button } from '@/components/ui/Button';
import { SEOHead } from '@/components/layout/SEOHead';
import {
  ArrowRight,
  Compass,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
  Building2,
  Palette,
  Wrench,
  Users,
  Globe,
  Sparkles,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
   ═══════════════════════════════════════════════════════════════ */
function useCounter(end: number, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, trigger]);
  return count;
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING PARTICLES COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${60 + Math.random() * 40}%`,
    size: 2 + Math.random() * 4,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(183,154,91,${p.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -(150 + Math.random() * 300)],
            x: [-30 + Math.random() * 60, -30 + Math.random() * 60],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1.2, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BEFORE / AFTER COMPARISON SLIDER
   ═══════════════════════════════════════════════════════════════ */
function ComparisonSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Concept',
  afterLabel = 'Completed',
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      setPosition(Math.max(2, Math.min(98, x)));
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => isDragging && handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => isDragging && handleMove(e.touches[0].clientX);
    const handleEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] rounded-xl overflow-hidden cursor-ew-resize select-none border border-brand-gold/20"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After (background) */}
      <img src={afterSrc} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={beforeSrc} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>
      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-1 h-full bg-gradient-to-b from-brand-gold via-brand-goldLight to-brand-gold shadow-[0_0_20px_rgba(183,154,91,0.4)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-neutral-950/90 border-2 border-brand-gold flex items-center justify-center shadow-xl">
          <ChevronLeft className="w-4 h-4 text-brand-gold -mr-1" />
          <ChevronRight className="w-4 h-4 text-brand-gold -ml-1" />
        </div>
      </div>
      {/* Labels */}
      <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-brand-gold z-10">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-brand-gold z-10">
        {afterLabel}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROJECT CAROUSEL
   ═══════════════════════════════════════════════════════════════ */
function ProjectCarousel({ projects, lang }: { projects: any[]; lang: string }) {
  const [active, setActive] = useState(0);

  const next = () => setActive((i) => (i + 1) % projects.length);
  const prev = () => setActive((i) => (i - 1 + projects.length) % projects.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-brand-gold/20 shadow-luxury">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="relative h-[550px]"
          >
            <img
              src={projects[active].image}
              alt={projects[active].title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold"
              >
                {projects[active].category} — {projects[active].location}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-white mt-2"
              >
                {projects[active].title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-neutral-300 text-sm mt-3 max-w-xl leading-relaxed"
              >
                {projects[active].desc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Link href={`/${lang}/portfolio/${projects[active].slug}`}>
                  <Button variant="gold" size="md" className="btn-premium gap-2">
                    <span>View Full Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? 'w-10 bg-brand-gold' : 'w-4 bg-neutral-700 hover:bg-neutral-500'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-neutral-700 hover:border-brand-gold flex items-center justify-center text-neutral-400 hover:text-brand-gold transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-neutral-700 hover:border-brand-gold flex items-center justify-center text-neutral-400 hover:text-brand-gold transition-all"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CLIENT LOGO MARQUEE
   ═══════════════════════════════════════════════════════════════ */
function ClientLogoMarquee() {
  const logos = [
    'Al Qasimi Holdings',
    'Rostova Hospitality',
    'KAFD Development',
    'Emaar Properties',
    'Saudi Binladin Group',
    'Al Futtaim Group',
    'Majid Al Futtaim',
    'Dubai Holding',
  ];
  const doubled = [...logos, ...logos];

  return (
    <div className="overflow-hidden py-10 relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10" />
      <div className="marquee-track">
        {doubled.map((name, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-10 flex items-center gap-3 opacity-40 hover:opacity-90 transition-opacity duration-500"
          >
            <Building2 className="w-6 h-6 text-brand-gold" />
            <span className="text-lg font-semibold text-neutral-400 whitespace-nowrap tracking-wide">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION REVEAL WRAPPER
   ═══════════════════════════════════════════════════════════════ */
function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STAT COUNTER CARD
   ═══════════════════════════════════════════════════════════════ */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCounter(value, 2500, isInView);

  return (
    <div ref={ref} className="text-center group">
      <div className="relative inline-block">
        <span className="text-5xl sm:text-6xl font-black gold-gradient-text tracking-tighter">
          {count}
          {suffix}
        </span>
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
          initial={{ width: 0 }}
          animate={isInView ? { width: '80%' } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <span className="mt-4 block text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICE CARD
   ═══════════════════════════════════════════════════════════════ */
function ServiceCard({
  icon,
  title,
  desc,
  href,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={href} className="block glass-card rounded-xl p-8 h-full group">
        <div className="w-14 h-14 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mt-6 group-hover:text-brand-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="text-neutral-400 text-sm mt-3 leading-relaxed">{desc}</p>
        <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold group-hover:translate-x-2 transition-transform duration-500">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HOMEPAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const { lang, t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const services = [
    {
      slug: 'interior-design',
      title: lang === 'en' ? 'Interior Design' : 'التصميم الداخلي',
      desc: lang === 'en'
        ? 'Bespoke residential villas, luxury penthouses, and high-end commercial interiors crafted with European finesse.'
        : 'فلل سكنية فاخرة وبنتهاوس راقي ومساحات تجارية بلمسات أوروبية.',
      icon: <Palette className="w-6 h-6" />,
    },
    {
      slug: 'architecture',
      title: lang === 'en' ? 'Architecture' : 'العمارة والتخطيط',
      desc: lang === 'en'
        ? 'Iconic master planning, parametric facade design, and sustainable structures that define skylines.'
        : 'تخطيط رئيسي أيقوني وتصميم واجهات بارامترية ومنشآت مستدامة.',
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      slug: 'mep-engineering',
      title: lang === 'en' ? 'MEP Engineering' : 'الهندسة الكهروميكانيكية',
      desc: lang === 'en'
        ? 'Precision mechanical, electrical, and plumbing systems engineered for maximum efficiency.'
        : 'أنظمة ميكانيكية وكهربائية وسباكة عالية الدقة.',
      icon: <Wrench className="w-6 h-6" />,
    },
    {
      slug: 'project-management',
      title: lang === 'en' ? 'Project Management' : 'إدارة المشاريع',
      desc: lang === 'en'
        ? 'End-to-end delivery with rigorous quality control, from design development to handover.'
        : 'تسليم متكامل من التصميم حتى التسليم مع مراقبة جودة صارمة.',
      icon: <Users className="w-6 h-6" />,
    },
    {
      slug: 'structural-engineering',
      title: lang === 'en' ? 'Structural Engineering' : 'الهندسة الإنشائية',
      desc: lang === 'en'
        ? 'Advanced structural analysis and reinforced concrete design for towers and mega developments.'
        : 'تحليل إنشائي متقدم وتصميم خرساني مسلح للأبراج والمشاريع الكبرى.',
      icon: <Globe className="w-6 h-6" />,
    },
    {
      slug: 'landscape-design',
      title: lang === 'en' ? 'Landscape Design' : 'تصميم الحدائق والمناظر',
      desc: lang === 'en'
        ? 'Luxury landscape architecture with water features, hardscape, and sustainable green systems.'
        : 'هندسة حدائق فاخرة مع نوافير ومسارات ومساحات خضراء مستدامة.',
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  const featuredProjects = [
    {
      slug: 'royal-palms-villa',
      title: lang === 'en' ? 'Royal Palms Luxury Villa' : 'فيلا رويال بالمس الفاخرة',
      category: 'Luxury Villas',
      location: 'Emirates Hills, Dubai',
      desc: lang === 'en'
        ? 'A 2,400 SQM architectural masterpiece featuring Italian marble, German automation, and panoramic landscape design.'
        : 'تحفة معمارية بمساحة 2,400 متر مربع مع رخام إيطالي وأتمتة ألمانية.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
    },
    {
      slug: 'horizon-corporate-tower',
      title: lang === 'en' ? 'Horizon FinTech HQ' : 'المقر الرئيسي لشركة هورايزون',
      category: 'Commercial',
      location: 'KAFD, Riyadh',
      desc: lang === 'en'
        ? 'A 45-floor smart tower with parametric glass facades, LEED Platinum certified, home to 3,000+ executives.'
        : 'برج ذكي من 45 طابقاً بواجهات زجاجية بارامترية ومعتمد LEED Platinum.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    },
    {
      slug: 'azure-waterfront-residences',
      title: lang === 'en' ? 'Azure Waterfront Residences' : 'مساكن أزور الواجهة المائية',
      category: 'Residential',
      location: 'Palm Jumeirah, Dubai',
      desc: lang === 'en'
        ? 'Ultra-luxury waterfront living with private marina berths, infinity pools, and biophilic interior design.'
        : 'معيشة فاخرة على الواجهة المائية مع مراسي خاصة ومسابح لا نهائية.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    },
    {
      slug: 'karama-heritage-hotel',
      title: lang === 'en' ? 'Al Karama Heritage Hotel' : 'فندق الكرامة التراثي',
      category: 'Hospitality',
      location: 'Al Ula, KSA',
      desc: lang === 'en'
        ? 'A boutique desert resort blending Nabataean heritage with contemporary luxury — 120 keys, spa, and observatory.'
        : 'منتجع صحراوي بوتيكي يمزج التراث النبطي مع الفخامة المعاصرة.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80',
    },
  ];

  const statistics = [
    { value: 250, suffix: '+', label: lang === 'en' ? 'Landmark Projects' : 'مشاريع بارزة' },
    { value: 1200, suffix: 'K', label: lang === 'en' ? 'SQM Delivered' : 'متر مربع مُسلّم' },
    { value: 18, suffix: '', label: lang === 'en' ? 'International Awards' : 'جوائز دولية' },
    { value: 15, suffix: '+', label: lang === 'en' ? 'Years of Excellence' : 'سنوات من التميز' },
  ];

  return (
    <>
      <SEOHead
        title="Origin Consulting Interior | Architecture & Luxury Interior Design"
        description="Designing Spaces. Creating Experiences. Origin Consulting Interior delivers world-class Architecture, Interior Design, MEP Engineering, and Project Management across Dubai, Riyadh, and international luxury markets."
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: CINEMATIC HERO
          ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Video Background */}
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90"
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-an-aerial-view-of-a-city-1573/1080p.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

        {/* Cinematic Gradient Overlay */}
        <div className="hero-video-overlay absolute inset-0 z-[1]" />

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Ambient Light Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none z-[2]" />

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel border border-brand-gold/30 text-brand-gold mb-8"
          >
            <Compass className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">
              {lang === 'en' ? 'GCC Premier Architecture & Interior Atelier' : 'أتيليه العمارة والتصميم الداخلي الرائد في الخليج'}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[0.95] font-poppins"
          >
            {lang === 'en' ? (
              <>
                Designing Spaces.
                <br />
                <span className="gold-shimmer-text">Creating Experiences.</span>
              </>
            ) : (
              <>
                نُصمم المساحات.
                <br />
                <span className="gold-shimmer-text">نصنع التجارب.</span>
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-lg sm:text-xl text-neutral-300 max-w-3xl leading-relaxed font-light"
          >
            {lang === 'en'
              ? 'Pioneering luxury architecture, interior design, and multi-disciplinary engineering across Dubai, Riyadh, and global luxury markets.'
              : 'رواد العمارة الفاخرة والتصميم الداخلي والهندسة المتكاملة عبر دبي والرياض والأسواق الدولية.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center gap-5"
          >
            <Link href={`/${lang}/portfolio`}>
              <Button size="lg" variant="gold" className="btn-premium gap-3 text-sm">
                <span>{lang === 'en' ? 'Explore Our Portfolio' : 'استكشف أعمالنا'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/${lang}/contact`}>
              <Button size="lg" variant="outline" className="gap-3 text-sm">
                <Play className="w-4 h-4" />
                <span>{lang === 'en' ? 'Schedule Consultation' : 'حجز استشارة'}</span>
              </Button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 rounded-full border-2 border-brand-gold/40 flex items-start justify-center p-1.5"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: CLIENT LOGO MARQUEE
          ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-neutral-800/50 bg-neutral-950">
        <ClientLogoMarquee />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: ANIMATED STATISTICS
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900/40 to-neutral-950" />
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {statistics.map((stat, idx) => (
            <StatCard key={idx} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: ABOUT PREVIEW
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="luxury-line mb-6" />
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold">
              {lang === 'en' ? 'Our Legacy' : 'إرثنا'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-4 leading-tight">
              {lang === 'en' ? (
                <>
                  Crafting <span className="gold-gradient-text">Architectural</span> Excellence Since 2011
                </>
              ) : (
                <>
                  صناعة <span className="gold-gradient-text">التميز المعماري</span> منذ 2011
                </>
              )}
            </h2>
            <p className="mt-8 text-neutral-300 leading-relaxed font-light text-lg">
              {lang === 'en'
                ? 'Origin Consulting Interior is a multi-award-winning architecture and interior design consultancy delivering iconic projects across the Gulf region. From royal villas in Emirates Hills to smart towers in KAFD, we bring visionary design to life.'
                : 'أوريجين للإستشارات والديكور هي شركة استشارات معمارية وتصميم داخلي حائزة على جوائز دولية، تقدم مشاريع أيقونية عبر منطقة الخليج.'}
            </p>
            <div className="mt-10 space-y-4">
              {[
                lang === 'en' ? 'Turnkey Architecture & MEP Engineering' : 'هندسة معمارية وكهروميكانيكية متكاملة',
                lang === 'en' ? 'Custom European Millwork Procurement' : 'توريد أثاث أوروبي مخصص',
                lang === 'en' ? 'Full Authority Approval Handling' : 'إدارة كاملة للاعتمادات الحكومية',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span className="text-neutral-200 text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
            <Link href={`/${lang}/about`} className="inline-block mt-10">
              <Button variant="outline" size="md" className="btn-premium">
                {lang === 'en' ? 'Discover Our Story' : 'اكتشف قصتنا'}
              </Button>
            </Link>
          </div>
          <div className="relative">
            <motion.div
              whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="w-full h-[550px] rounded-xl overflow-hidden border border-brand-gold/20 shadow-luxury">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="Origin Architecture Studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating awards badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass-panel rounded-xl p-5 border border-brand-gold/30 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-brand-gold/15 flex items-center justify-center">
                    <Award className="w-6 h-6 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-white">18</span>
                    <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      {lang === 'en' ? 'Design Awards' : 'جوائز التصميم'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: SERVICES GRID
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection className="py-28 bg-gradient-to-b from-neutral-950 via-neutral-900/30 to-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="luxury-line mx-auto mb-6" />
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold">
              {lang === 'en' ? 'Our Disciplines' : 'تخصصاتنا'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
              {lang === 'en' ? 'Comprehensive Engineering & Design Solutions' : 'حلول هندسية وتصميمية شاملة'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <ServiceCard
                key={idx}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                href={`/${lang}/services/${s.slug}`}
                index={idx}
              />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: FEATURED PROJECTS CAROUSEL
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection className="py-28 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="luxury-line mb-6" />
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold">
              {lang === 'en' ? 'Selected Works' : 'أعمال مختارة'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
              {lang === 'en' ? 'Featured Luxury Projects' : 'مشاريع فاخرة مميزة'}
            </h2>
          </div>
          <Link href={`/${lang}/portfolio`} className="mt-6 md:mt-0">
            <Button variant="outline" size="md" className="btn-premium gap-2">
              <span>{lang === 'en' ? 'View Complete Portfolio' : 'عرض جميع المشاريع'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <ProjectCarousel projects={featuredProjects} lang={lang} />
      </RevealSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: BEFORE / AFTER COMPARISON
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection className="py-28 bg-gradient-to-b from-neutral-950 via-neutral-900/20 to-neutral-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="luxury-line mx-auto mb-6" />
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold">
              {lang === 'en' ? 'Design Transformation' : 'التحول التصميمي'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
              {lang === 'en' ? 'From Concept to Reality' : 'من المفهوم إلى الواقع'}
            </h2>
            <p className="text-neutral-400 mt-4 text-base">
              {lang === 'en'
                ? 'Drag the slider to witness our transformative design process.'
                : 'اسحب المؤشر لمشاهدة عملية التصميم التحويلية.'}
            </p>
          </div>
          <ComparisonSlider
            beforeSrc="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
            afterSrc="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
            beforeLabel={lang === 'en' ? '3D Concept' : 'المفهوم ثلاثي الأبعاد'}
            afterLabel={lang === 'en' ? 'Final Execution' : 'التنفيذ النهائي'}
          />
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: TESTIMONIALS
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="luxury-line mx-auto mb-6" />
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold">
            {lang === 'en' ? 'Client Voices' : 'آراء عملائنا'}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
            {lang === 'en' ? 'Trusted by Visionary Leaders' : 'موثوقون من قبل قادة الرؤية'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: lang === 'en'
                ? 'Origin transformed our 4,000 SQM villa into an architectural icon. Their attention to detail is unmatched.'
                : 'حوّلت أوريجين فيلتنا البالغة 4,000 متر مربع إلى أيقونة معمارية. اهتمامهم بالتفاصيل لا مثيل له.',
              name: 'Sheikh Mohammed Al Qasimi',
              title: lang === 'en' ? 'Chairman, Al Qasimi Holdings' : 'رئيس مجلس إدارة القاسمي القابضة',
            },
            {
              quote: lang === 'en'
                ? 'The MEP engineering precision for our 45-floor tower was extraordinary. Delivered ahead of schedule.'
                : 'دقة الهندسة الكهروميكانيكية لبرجنا من 45 طابقاً كانت استثنائية. تم التسليم قبل الموعد.',
              name: 'Dr. Tariq Al-Mansoor',
              title: lang === 'en' ? 'CEO, Horizon FinTech Corp' : 'الرئيس التنفيذي، هورايزون فينتك',
            },
            {
              quote: lang === 'en'
                ? 'Their landscape design elevated our resort experience. Every guest mentions the architecture first.'
                : 'ارتقى تصميم الحدائق لديهم بتجربة منتجعنا. كل ضيف يذكر العمارة أولاً.',
              name: 'Elena Rostova',
              title: lang === 'en' ? 'Founder, Rostova Hospitality' : 'مؤسسة، روستوفا للضيافة',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-card rounded-xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-brand-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-neutral-300 leading-relaxed italic text-sm">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-neutral-800">
                <span className="text-white font-bold block">{item.name}</span>
                <span className="text-brand-gold text-xs">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9: HIGH-IMPACT CTA
          ═══════════════════════════════════════════════════════════ */}
      <RevealSection className="py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/70" />
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="luxury-line mx-auto mb-8" />
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            {lang === 'en' ? (
              <>
                Ready to Build Your
                <br />
                <span className="gold-shimmer-text">Architectural Masterpiece?</span>
              </>
            ) : (
              <>
                هل أنت جاهز لبناء
                <br />
                <span className="gold-shimmer-text">تحفتك المعمارية؟</span>
              </>
            )}
          </h2>
          <p className="mt-6 text-neutral-300 text-lg font-light max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Consult with our principal architects and engineering directors for tailored, world-class project planning.'
              : 'تشاور مع كبار مهندسينا المعماريين ومدراء الهندسة لتخطيط مشاريع عالمية المستوى.'}
          </p>
          <div className="mt-10 flex justify-center gap-5">
            <Link href={`/${lang}/contact`}>
              <Button size="lg" variant="gold" className="btn-premium gap-3 text-sm">
                <span>{lang === 'en' ? 'Schedule Executive Consultation' : 'حجز استشارة تنفيذية'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
