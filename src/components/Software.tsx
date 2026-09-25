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

  const getSoftwareLogo = (name: string) => {
    const lower = name.toLowerCase();

    if (lower.includes('oracle')) {
      return {
        src: '/images/software/oracle-logo.svg',
        alt: 'Oracle ERP',
        className: 'h-4 sm:h-4.5 w-auto object-contain',
        containerClassName: 'h-11 px-3 min-w-11',
      };
    }

    if (lower.includes('quickbooks')) {
      return {
        src: '/images/software/quickbooks-logo.svg',
        alt: 'Intuit QuickBooks',
        className: 'h-5 sm:h-5.5 w-auto object-contain',
        containerClassName: 'h-11 px-3 min-w-11',
      };
    }

    if (lower.includes('excel')) {
      return {
        src: '/images/software/excel-logo.svg',
        alt: 'Microsoft Excel',
        className: 'h-6 sm:h-7 w-auto object-contain',
        containerClassName: 'h-11 w-11 px-2',
      };
    }

    if (lower.includes('office')) {
      return {
        src: '/images/software/office-logo.svg',
        alt: 'Microsoft Office',
        className: 'h-6 sm:h-7 w-auto object-contain',
        containerClassName: 'h-11 w-11 px-2',
      };
    }

    if (lower.includes('smacc')) {
      return {
        src: '/images/software/smacc-logo.png',
        alt: 'SMACC Cloud Accounting',
        className: 'h-7 sm:h-7.5 w-auto object-contain',
        containerClassName: 'h-11 px-2.5 min-w-11',
      };
    }

    return null;
  };

  return (
    <section id="software" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#0F766E] dark:text-teal-400 uppercase">
              Systems & Infrastructure
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-[#0F2747] dark:text-white sm:text-4xl tracking-tight">
              ERP & Software Experience
            </h2>
            <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400">
              Operational expertise navigating enterprise ERP platforms, accounting systems, and financial spreadsheet modeling.
            </p>
          </div>

          {/* Quick toggle all button */}
          <button
            type="button"
            onClick={toggleAll}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#1F2937] dark:text-slate-300 bg-[#F4F6F8] hover:bg-[#E6F4F1] dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer select-none"
          >
            <Layers className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />
            <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
          </button>
        </div>

        {/* Software Grid (Expandable Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {software.map((item) => {
            const isExpanded = expandedIds.has(item.id);
            const Icon = getSoftwareIcon(item.name);
            const logoInfo = getSoftwareLogo(item.name);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs ${
                  isExpanded
                    ? 'bg-white dark:bg-slate-800/60 border-[#0F766E]/50 dark:border-teal-500/50 ring-1 ring-[#0F766E]/20'
                    : 'bg-[#F4F6F8] dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
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
                  className="p-6 cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div 
                      className={`rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shadow-xs transition-colors overflow-hidden ${
                        logoInfo ? logoInfo.containerClassName : 'w-11 h-11'
                      }`}
                    >
                      {logoInfo ? (
                        <img
                          src={logoInfo.src}
                          alt={logoInfo.alt}
                          referrerPolicy="no-referrer"
                          className={logoInfo.className}
                          loading="lazy"
                        />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>

                    {item.badge && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#E6F4F1] text-[#0F766E] dark:bg-teal-950/70 dark:text-teal-300 border border-[#0F766E]/30 dark:border-teal-800">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[#0F2747] dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#0F766E] dark:text-teal-400 mt-0.5">
                        {item.category}
                      </p>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold shrink-0 transition-all ${
                        isExpanded
                          ? 'bg-[#0F766E] text-white'
                          : 'bg-[#E6F4F1] text-[#0F766E] hover:bg-[#d5eee8] dark:bg-teal-950/60 dark:text-teal-300 border border-[#0F766E]/30 dark:border-teal-800'
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
                      ? 'grid-rows-[1fr] opacity-100 border-t border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-900/40'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-4 space-y-3">
                      <p className="text-xs text-[#1F2937] dark:text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>

                      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center gap-1.5 text-xs text-[#64748B] dark:text-slate-300 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />
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
