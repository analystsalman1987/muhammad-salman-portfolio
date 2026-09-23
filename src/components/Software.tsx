import { useState } from 'react';
import { 
  Database, 
  Layers, 
  FileSpreadsheet, 
  Server, 
  AppWindow,
  CheckCircle,
  ChevronDown
} from 'lucide-react';
import { SoftwareItem } from '../types';

interface SoftwareProps {
  software: SoftwareItem[];
}

export function Software({ software }: SoftwareProps) {
  // Collapsed by default
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  if (!software || software.length === 0) {
    return (
      <section id="software" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          Information will be added soon.
        </div>
      </section>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const allExpanded = software.length > 0 && expandedIds.size === software.length;

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(software.map((s) => s.id)));
    }
  };

  const getSoftwareIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('excel')) return FileSpreadsheet;
    if (lower.includes('oracle')) return Database;
    if (lower.includes('smacc')) return Server;
    if (lower.includes('quickbooks')) return Layers;
    return AppWindow;
  };

  return (
    <section id="software" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              Systems & Infrastructure
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
              ERP & Software Experience
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Operational expertise navigating enterprise ERP platforms, accounting systems, and financial spreadsheet modeling.
            </p>
          </div>

          {/* Quick toggle all button */}
          <button
            type="button"
            onClick={toggleAll}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer select-none"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
          </button>
        </div>

        {/* Software Grid (Expandable Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {software.map((item) => {
            const isExpanded = expandedIds.has(item.id);
            const Icon = getSoftwareIcon(item.name);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs ${
                  isExpanded
                    ? 'bg-slate-50/90 dark:bg-slate-800/60 border-emerald-500/50 dark:border-emerald-500/50 ring-1 ring-emerald-500/20'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Clickable Header / Summary */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }
                  }}
                  aria-expanded={isExpanded}
                  className="p-6 cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    {item.badge && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                        {item.category}
                      </p>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 transition-all ${
                        isExpanded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      }`}
                    >
                      <span>{isExpanded ? 'Hide' : 'Details'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Expandable Details Area */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? 'grid-rows-[1fr] opacity-100 border-t border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/40'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-4 space-y-3">
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Production Environment Experience</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
