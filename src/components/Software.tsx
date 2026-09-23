import { 
  Database, 
  Layers, 
  FileSpreadsheet, 
  Briefcase, 
  Server, 
  AppWindow,
  CheckCircle 
} from 'lucide-react';
import { SoftwareItem } from '../types';

interface SoftwareProps {
  software: SoftwareItem[];
}

export function Software({ software }: SoftwareProps) {
  if (!software || software.length === 0) {
    return (
      <section id="software" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          Information will be added soon.
        </div>
      </section>
    );
  }

  return (
    <section id="software" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            Systems & Infrastructure
          </span>
          <h2 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            ERP & Software Experience
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Extensive operational experience navigating enterprise ERP platforms, accounting systems, and financial spreadsheet modeling.
          </p>
        </div>

        {/* Software Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {software.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                    {item.name.toLowerCase().includes('excel') ? (
                      <FileSpreadsheet className="w-6 h-6" />
                    ) : item.name.toLowerCase().includes('oracle') ? (
                      <Database className="w-6 h-6" />
                    ) : item.name.toLowerCase().includes('smacc') ? (
                      <Server className="w-6 h-6" />
                    ) : item.name.toLowerCase().includes('quickbooks') ? (
                      <Layers className="w-6 h-6" />
                    ) : (
                      <AppWindow className="w-6 h-6" />
                    )}
                  </div>
                  {item.badge && (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {item.category}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Production Environment Experience</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
