import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Briefcase, 
  FileDown, 
  Mail, 
  ChevronRight, 
  ShieldCheck, 
  GraduationCap,
  Calendar
} from 'lucide-react';
import { ProfileInfo } from '../types';

interface HeroProps {
  profile: ProfileInfo;
  onOpenCV: () => void;
  onSelectExperience?: () => void;
}

export function Hero({ profile, onOpenCV, onSelectExperience }: HeroProps) {
  const [isHomeActive, setIsHomeActive] = useState(true);

  useEffect(() => {
    // Detect if Home is selected via hash or scroll
    const checkHash = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#home' || hash === '#') {
        setIsHomeActive(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('popstate', checkHash);

    // Watch intersection for smooth activation when scrolled into view
    const homeEl = document.getElementById('home');
    let observer: IntersectionObserver | null = null;

    if (homeEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
              setIsHomeActive(true);
            }
          });
        },
        { threshold: [0.2] }
      );
      observer.observe(homeEl);
    }

    // Listen to clicks on navigation links pointing to #home
    const handleHomeClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (target) {
        const href = target.getAttribute('href') || target.getAttribute('data-href');
        const text = target.textContent?.trim().toLowerCase();
        if (href === '#home' || text === 'home') {
          setIsHomeActive(true);
        }
      }
    };

    document.addEventListener('click', handleHomeClick);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('popstate', checkHash);
      document.removeEventListener('click', handleHomeClick);
      if (observer && homeEl) {
        observer.unobserve(homeEl);
      }
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle Corporate Accounting & Finance Background Image */}
      <div 
        className={`absolute inset-0 pointer-events-none -z-10 transition-opacity duration-700 ease-in-out ${
          isHomeActive ? 'opacity-100' : 'opacity-85'
        }`}
        aria-hidden="true"
      >
        <img 
          src="/images/hero_accounting_bg.jpg" 
          alt="" 
          className="w-full h-full object-cover object-center opacity-[0.18] dark:opacity-[0.13] filter contrast-105 select-none transition-transform duration-1000 ease-out"
          style={{
            transform: isHomeActive ? 'scale(1.008)' : 'scale(1.0)',
          }}
          loading="eager"
        />
        {/* Soft gradient overlay to preserve optimal contrast and text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/50 to-white dark:from-slate-900/90 dark:via-slate-900/65 dark:to-slate-900" />
      </div>

      {/* Subtle corporate ambient background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy (Left / Top) */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            
            {/* Status & Location Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E6F4F1] text-[#0F766E] dark:bg-teal-950/60 dark:text-teal-300 border border-[#0F766E]/30 dark:border-teal-800/80 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F766E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F766E]"></span>
              </span>
              <span>14+ Years Corporate Experience</span>
              <span className="text-[#0F766E]/50 dark:text-teal-700">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#0F766E] dark:text-teal-400" />
                {profile.location || 'Dammam, Saudi Arabia'}
              </span>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2747] dark:text-white tracking-tight leading-tight">
                {profile.fullName || 'Muhammad Salman'}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-[#0F766E] dark:text-teal-400 tracking-tight">
                {profile.professionalTitle || 'Accountant | MBA Accounting & Finance'}
              </p>
            </div>

            {/* Introduction paragraph */}
            <p className="text-base sm:text-lg text-[#1F2937] dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {profile.heroIntro ||
                'Accounting professional with 14+ years of experience across Saudi Arabia and Pakistan, specializing in financial reporting, bookkeeping, accounts payable and receivable, reconciliations, month-end closing, inventory costing, and ERP-based accounting operations. Experienced in VAT and ZATCA compliance, customer and supplier reconciliation, credit control, payment management, and financial documentation. Proficient in Oracle ERP, QuickBooks, SMACC, Delta Financial, and Advanced Microsoft Excel.'}
            </p>

            {/* Key Value Badges */}
            <div className="pt-2 flex flex-wrap gap-2.5 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-800/80 text-[#1F2937] dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />
                <span>ZATCA VAT Compliance</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-800/80 text-[#1F2937] dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-[#0F2747] dark:text-slate-300" />
                <span>Full AP / AR & Reconciliation</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-800/80 text-[#1F2937] dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />
                <span>MBA Banking & Finance</span>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="pt-4 flex flex-wrap gap-3.5 justify-center lg:justify-start">
              <button
                onClick={() => {
                  onSelectExperience?.();
                  scrollTo('experience');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#0F766E] hover:bg-[#0c625c] active:bg-[#0a4f4a] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>View My Experience</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={onOpenCV}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#0F2747] hover:bg-[#16365f] text-white font-semibold text-sm transition-all shadow-sm hover:shadow"
              >
                <FileDown className="w-4 h-4" />
                <span>Download CV</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white dark:bg-slate-900 text-[#0F2747] dark:text-slate-200 hover:bg-[#E6F4F1]/60 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 font-semibold text-sm transition-all shadow-xs"
              >
                <Mail className="w-4 h-4 text-[#0F766E] dark:text-teal-400" />
                <span>Contact Me</span>
              </button>
            </div>

          </div>

          {/* Profile Card / Avatar (Right / Bottom) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-72 sm:w-80">
              
              {/* Subtle background glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#0F766E]/20 via-[#0F2747]/20 to-teal-500/20 rounded-2xl blur-xl" />

              {/* Main executive card container */}
              <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-5">
                
                {/* Avatar Display */}
                <div className="flex justify-center">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.fullName || 'Muhammad Salman'}
                      className="w-44 h-44 rounded-xl object-cover border-2 border-[#0F766E]/40 shadow-md"
                    />
                  ) : (
                    <div className="w-44 h-44 rounded-xl bg-gradient-to-br from-[#0F2747] via-slate-900 to-[#0F766E]/40 border-2 border-[#0F766E]/30 flex flex-col items-center justify-center text-center p-4 shadow-md">
                      <span className="text-4xl font-extrabold tracking-widest text-teal-300">
                        MS
                      </span>
                      <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-widest mt-2">
                        Professional Profile
                      </span>
                      <div className="w-8 h-0.5 bg-[#0F766E] rounded-full mt-2" />
                    </div>
                  )}
                </div>

                {/* Quick Info Block */}
                <div className="text-center pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                  <h3 className="text-base font-bold text-[#0F2747] dark:text-slate-100">
                    Muhammad Salman
                  </h3>
                  <p className="text-xs text-[#64748B] dark:text-slate-400">
                    MBA Banking & Finance (2009–2011)
                  </p>
                  <p className="text-xs font-medium text-[#0F766E] dark:text-teal-400 flex items-center justify-center gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Dammam, Eastern Province, KSA</span>
                  </p>
                </div>

                {/* Fast metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-center">
                  <div className="p-2.5 rounded-lg bg-[#F4F6F8] dark:bg-slate-800/50">
                    <div className="text-base font-extrabold text-[#0F2747] dark:text-white">14+</div>
                    <div className="text-[10px] font-medium text-[#64748B] dark:text-slate-400 uppercase tracking-wider">Years Exp.</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F4F6F8] dark:bg-slate-800/50">
                    <div className="text-base font-extrabold text-[#0F766E] dark:text-teal-400">ZATCA</div>
                    <div className="text-[10px] font-medium text-[#64748B] dark:text-slate-400 uppercase tracking-wider">VAT Filing</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
