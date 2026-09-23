import { 
  Award, 
  Calculator, 
  ArrowLeftRight, 
  FileText, 
  ShieldCheck, 
  Layers, 
  FileSpreadsheet, 
  Building2,
  LucideIcon
} from 'lucide-react';
import { HighlightItem } from '../types';

interface HighlightsProps {
  highlights: HighlightItem[];
}

const iconMap: Record<string, LucideIcon> = {
  Award,
  Calculator,
  ArrowLeftRight,
  FileText,
  ShieldCheck,
  Layers,
  Sheet: FileSpreadsheet,
  FileSpreadsheet,
  Building2,
};

export function Highlights({ highlights }: HighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return (
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          Information will be added soon.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#F4F6F8] dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold tracking-widest text-[#0F766E] dark:text-teal-400 uppercase">
            Executive Competencies
          </h2>
          <p className="mt-1 text-2xl font-bold text-[#0F2747] dark:text-white sm:text-3xl tracking-tight">
            Professional Highlights
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Calculator;
            return (
              <div
                key={item.id || idx}
                className="group p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-[#0F766E]/50 dark:hover:border-teal-500/50 transition-all flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E6F4F1] dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F2747] dark:text-slate-100 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
