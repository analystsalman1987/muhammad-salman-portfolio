import { 
  Calculator, 
  Coins, 
  ShieldCheck, 
  Cpu, 
  Check, 
  LucideIcon 
} from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsProps {
  skills: SkillCategory[];
}

const categoryIcons: Record<string, LucideIcon> = {
  Accounting: Calculator,
  Finance: Coins,
  'Tax & Compliance': ShieldCheck,
  Software: Cpu,
};

export function Skills({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) {
    return (
      <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          Information will be added soon.
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-[#F4F6F8] dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest text-[#0F766E] dark:text-teal-400 uppercase">
            Domain Competence
          </span>
          <h2 className="mt-1 text-3xl font-extrabold text-[#0F2747] dark:text-white sm:text-4xl tracking-tight">
            Professional Skills
          </h2>
          <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400">
            Categorized core proficiencies across statutory compliance, financial governance, operational accounting, and reporting tools.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((cat) => {
            const Icon = categoryIcons[cat.categoryName] || Calculator;
            return (
              <div
                key={cat.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#0F766E]/40 dark:hover:border-teal-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#E6F4F1] dark:bg-teal-950/70 text-[#0F766E] dark:text-teal-300 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0F2747] dark:text-white">
                        {cat.categoryName}
                      </h3>
                      <span className="text-xs text-[#64748B] dark:text-slate-400">
                        {cat.skills.length} core competencies
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#F4F6F8] dark:bg-slate-800/80 text-[#1F2937] dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 hover:border-[#0F766E] hover:bg-[#E6F4F1]/60 transition-colors"
                      >
                        <Check className="w-3 h-3 text-[#0F766E] dark:text-teal-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-[11px] text-[#64748B] dark:text-slate-400">
                  <span>Professional Standard</span>
                  <span className="font-semibold text-[#0F766E] dark:text-teal-400">Verified Practice</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
