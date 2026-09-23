import { useState } from 'react';
import { 
  CheckCircle2, 
  Building, 
  Calculator, 
  ShieldCheck, 
  Workflow,
  Receipt,
  ChevronDown
} from 'lucide-react';
import { ProfileInfo } from '../types';

interface AboutProps {
  profile: ProfileInfo;
}

export function About({ profile }: AboutProps) {
  const [isSummaryExpanded, setIsSummaryExpanded] = useState<boolean>(false);

  const fullSummary = profile.summary ||
    'Accounting professional with 14+ years of experience across Saudi Arabia and Pakistan, specializing in financial reporting, bookkeeping, accounts payable and receivable, reconciliations, month-end closing, inventory costing, and ERP-based accounting operations. Experienced in VAT and ZATCA compliance, customer and supplier reconciliation, credit control, payment management, and financial documentation. Proficient in Oracle ERP, QuickBooks, SMACC, Delta Financial, and Advanced Microsoft Excel.';

  // Short preview for initial collapsed state
  const previewSummary = 
    'Accounting professional with 14+ years of experience across Saudi Arabia and Pakistan, specializing in financial reporting, bookkeeping, accounts payable and receivable, reconciliations, and month-end closing...';

  const coreCompetencies = [
    {
      title: 'Full Financial Cycle & Reporting',
      desc: 'Rigorous preparation of general ledgers, journal entries, trial balance scrutiny, and month-end closing.',
      icon: Calculator,
    },
    {
      title: 'ZATCA VAT & Statutory Compliance',
      desc: 'Expertise in Saudi ZATCA electronic invoicing, quarterly VAT returns, tax audit readiness, and tax filing.',
      icon: ShieldCheck,
    },
    {
      title: 'Cross-Functional Department Liaison',
      desc: 'Seamless daily coordination between procurement, sales pipelines, and warehouse inventory control teams.',
      icon: Workflow,
    },
    {
      title: 'Working Capital & Treasury Control',
      desc: 'Active bank reconciliations, cash flow pacing, customer credit limit administration, and supplier statement checks.',
      icon: Receipt,
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header & Bio Summary */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                Profile Overview
              </span>
              <h2 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
                About Muhammad Salman
              </h2>
            </div>

            {/* Expandable Professional Summary Card */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 transition-all shadow-xs">
              <div className="space-y-3">
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {isSummaryExpanded ? fullSummary : previewSummary}
                </p>

                {/* Read More / Show Less Toggle Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                    aria-expanded={isSummaryExpanded}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer select-none"
                  >
                    <span>{isSummaryExpanded ? 'Show Less' : 'Read More'}</span>
                    <ChevronDown 
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isSummaryExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span>Operating with full compliance in Dammam, Kingdom of Saudi Arabia</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                Core Professional Focus
              </h4>
              <ul className="space-y-2.5">
                {[
                  'Customer & vendor reconciliation with dispute mitigation',
                  'Rigorous inventory valuation (costing, purchase orders & GRN validation)',
                  'Direct audit assistance and internal control strengthening',
                  'ERP implementation workflows & transactional integrity',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pillars & Competency Cards (Right) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreCompetencies.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {comp.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {comp.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
