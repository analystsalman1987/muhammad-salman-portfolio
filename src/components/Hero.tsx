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
}

export function Hero({ profile, onOpenCV }: HeroProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle corporate ambient background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy (Left / Top) */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            
            {/* Status & Location Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>14+ Years Corporate Experience</span>
              <span className="text-emerald-300 dark:text-emerald-700">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                {profile.location || 'Dammam, Saudi Arabia'}
              </span>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {profile.fullName || 'Muhammad Salman'}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-emerald-700 dark:text-emerald-400 tracking-tight">
                {profile.professionalTitle || 'Accountant | MBA Accounting & Finance'}
              </p>
            </div>

            {/* Introduction paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {profile.heroIntro ||
                'Accounting professional with 14+ years of experience across Saudi Arabia and Pakistan, specializing in financial reporting, bookkeeping, accounts payable and receivable, reconciliations, month-end closing, inventory costing, and ERP-based accounting operations. Experienced in VAT and ZATCA compliance, customer and supplier reconciliation, credit control, payment management, and financial documentation. Proficient in Oracle ERP, QuickBooks, SMACC, Delta Financial, and Advanced Microsoft Excel.'}
            </p>

            {/* Key Value Badges */}
            <div className="pt-2 flex flex-wrap gap-2.5 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>ZATCA VAT Compliance</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700">
                <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Full AP / AR & Reconciliation</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>MBA Banking & Finance</span>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="pt-4 flex flex-wrap gap-3.5 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo('experience')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Briefcase className="w-4 h-4" />
                <span>View My Experience</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={onOpenCV}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border dark:border-slate-700 font-semibold text-sm transition-all shadow-sm hover:shadow"
              >
                <FileDown className="w-4 h-4" />
                <span>Download CV</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 font-semibold text-sm transition-all shadow-xs"
              >
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Contact Me</span>
              </button>
            </div>

          </div>

          {/* Profile Card / Avatar (Right / Bottom) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-72 sm:w-80">
              
              {/* Subtle background glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500/20 via-slate-400/20 to-blue-500/20 rounded-2xl blur-xl" />

              {/* Main executive card container */}
              <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl space-y-5">
                
                {/* Avatar Display */}
                <div className="flex justify-center">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.fullName || 'Muhammad Salman'}
                      className="w-44 h-44 rounded-xl object-cover border-2 border-emerald-500/40 shadow-md"
                    />
                  ) : (
                    <div className="w-44 h-44 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 dark:from-emerald-950 dark:via-slate-900 dark:to-slate-950 border-2 border-emerald-500/30 flex flex-col items-center justify-center text-center p-4 shadow-md">
                      <span className="text-4xl font-extrabold tracking-widest text-emerald-400">
                        MS
                      </span>
                      <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-widest mt-2">
                        Professional Profile
                      </span>
                      <div className="w-8 h-0.5 bg-emerald-500/60 rounded-full mt-2" />
                    </div>
                  )}
                </div>

                {/* Quick Info Block */}
                <div className="text-center pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Muhammad Salman
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    MBA Banking & Finance (2009–2011)
                  </p>
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Dammam, Eastern Province, KSA</span>
                  </p>
                </div>

                {/* Fast metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-center">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">14+</div>
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Years Exp.</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">ZATCA</div>
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">VAT Filing</div>
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
