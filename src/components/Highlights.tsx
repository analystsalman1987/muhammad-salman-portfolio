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
    <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            Executive Competencies
          </h2>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl tracking-tight">
            Professional Highlights
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Calculator;
            return (
              <div
                key={item.id || idx}
                className="group p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
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
