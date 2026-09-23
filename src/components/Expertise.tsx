import { useState, useMemo } from 'react';
import { 
  Calculator, 
  Search, 
  CheckCircle, 
  ChevronDown,
  Layers
} from 'lucide-react';
import { ExpertiseItem } from '../types';

interface ExpertiseProps {
  expertise: ExpertiseItem[];
}

export function Expertise({ expertise }: ExpertiseProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  // All collapsed by default
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', label: 'All Expertise' },
    { id: 'accounting', label: 'Accounting' },
    { id: 'finance', label: 'Finance & Treasury' },
    { id: 'reconciliation', label: 'Reconciliations' },
    { id: 'compliance', label: 'Tax & Compliance' },
  ];

  const filteredItems = useMemo(() => {
    return expertise.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [expertise, activeCategory, searchTerm]);

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

  const allExpanded = filteredItems.length > 0 && filteredItems.every((item) => expandedIds.has(item.id));

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(filteredItems.map((item) => item.id)));
    }
  };

  return (
    <section id="expertise" className="py-20 bg-[#F4F6F8] dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#0F766E] dark:text-teal-400 uppercase">
              Financial Capabilities
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-[#0F2747] dark:text-white sm:text-4xl tracking-tight">
              Accounting & Finance Expertise
            </h2>
            <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400 max-w-xl">
              {expertise.length} core operational capabilities honed across 14+ years of hands-on accounting, finance, and ERP operations in Saudi Arabia and Pakistan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Quick toggle all */}
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#1F2937] dark:text-slate-300 hover:bg-[#E6F4F1]/60 hover:text-[#0F766E] dark:hover:bg-slate-800 transition-colors cursor-pointer select-none"
            >
              <Layers className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />
              <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
            </button>

            {/* Search box */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter competencies..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#1F2937] dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F766E]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-[#64748B] dark:text-slate-300 hover:bg-[#E6F4F1]/60 hover:text-[#0F766E] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of 15 Expertise Cards (Expandable / Collapsible) */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
            No matching expertise found for "{searchTerm}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const isExpanded = expandedIds.has(item.id);

              return (
                <div
                  key={item.id}
                  className={`group rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs ${
                    isExpanded
                      ? 'bg-white dark:bg-slate-900 border-[#0F766E]/50 dark:border-teal-500/50 ring-1 ring-[#0F766E]/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
                  }`}
                >
                  {/* Card Header & Title (Clickable) */}
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
                    className="p-5 cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-lg bg-[#E6F4F1] dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] dark:text-slate-400 bg-[#F4F6F8] dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-[#0F2747] dark:text-slate-100 group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors">
                        {item.title}
                      </h3>
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-slate-400 transition-transform duration-300 shrink-0 ${
                          isExpanded ? 'rotate-180 text-[#0F766E] dark:text-teal-400' : 'group-hover:text-slate-600'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Expandable Explanation Area */}
                  {item.description && (
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100 dark:border-slate-800 bg-[#F4F6F8] dark:bg-slate-800/30'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-4 pt-3.5 text-xs text-[#1F2937] dark:text-slate-300 leading-relaxed font-normal">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interactive Footer Button Indicator */}
                  <div className="px-5 py-2.5 bg-[#F4F6F8]/60 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(item.id);
                      }}
                      className="text-[11px] font-semibold text-[#0F766E] dark:text-teal-400 hover:text-[#0c625c] dark:hover:text-teal-300 flex items-center gap-1 cursor-pointer select-none"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      Operational
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
