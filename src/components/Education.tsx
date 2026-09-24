import { useState } from 'react';
import { GraduationCap, Calendar, BookOpen, Globe, ChevronDown } from 'lucide-react';
import { EducationItem, LanguageItem } from '../types';

interface EducationLanguagesProps {
  education: EducationItem[];
  languages: LanguageItem[];
}

export function EducationLanguages({ education, languages }: EducationLanguagesProps) {
  // Collapsed by default
  const [expandedEduIds, setExpandedEduIds] = useState<Set<string>>(new Set());

  const toggleEdu = (id: string) => {
    setExpandedEduIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="education" className="py-20 bg-[#F4F6F8] dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Education Section (Col-Span-7) - Expandable Degree Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#0F766E] dark:text-teal-400 uppercase">
                Academic Background
              </span>
              <h2 className="mt-1 text-3xl font-extrabold text-[#0F2747] dark:text-white tracking-tight">
                Education
              </h2>
              <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400">
                Formal business administration and banking & finance higher education foundation.
              </p>
            </div>

            {education.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
                Information will be added soon.
              </div>
            ) : (
              <div className="space-y-4">
                {education.map((item) => {
                  const isExpanded = expandedEduIds.has(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border transition-all duration-200 shadow-xs overflow-hidden ${
                        isExpanded
                          ? 'bg-white dark:bg-slate-900 border-[#0F766E]/50 dark:border-teal-500/50 ring-1 ring-[#0F766E]/20 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {/* Clickable Card Header */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleEdu(item.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleEdu(item.id);
                          }
                        }}
                        aria-expanded={isExpanded}
                        className="p-5 sm:p-6 cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#E6F4F1] dark:bg-teal-950/70 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-6 h-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <h3 className="text-base sm:text-lg font-bold text-[#0F2747] dark:text-white">
                                  {item.degree} — {item.specialization}
                                </h3>
                                {item.institution && (
                                  <p className="text-xs font-medium text-[#64748B] dark:text-slate-400 mt-0.5">
                                    {item.institution}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F2937] dark:text-slate-300 bg-[#F4F6F8] dark:bg-slate-800 px-2.5 py-1 rounded-md">
                                  <Calendar className="w-3 h-3 text-[#0F766E] dark:text-teal-400" />
                                  {item.period}
                                </span>

                                <div
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
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
                          </div>
                        </div>
                      </div>

                      {/* Expandable Details Area */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100 dark:border-slate-800 bg-[#F4F6F8] dark:bg-slate-800/30'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-5 sm:p-6 pt-4 space-y-2.5 text-xs text-[#1F2937] dark:text-slate-300">
                            <div className="flex items-center gap-2 font-medium">
                              <BookOpen className="w-4 h-4 text-[#0F766E] dark:text-teal-400 shrink-0" />
                              <span>Specialization: <strong className="text-[#0F2747] dark:text-white">{item.specialization}</strong></span>
                            </div>
                            <p className="leading-relaxed text-[#64748B] dark:text-slate-400">
                              Comprehensive academic training in corporate finance, financial accounting, banking regulations, credit analysis, and financial management.
                            </p>
                            {item.institution && (
                              <p className="text-[#64748B] dark:text-slate-400">
                                Institution: <span className="font-semibold text-[#0F2747] dark:text-slate-200">{item.institution}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Subtle Professional Finance / MBA Visual Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs group">
              <img
                src="/images/mba_finance_academic.jpg"
                alt="Master of Business Administration in Finance and Accounting Academic Background"
                referrerPolicy="no-referrer"
                className="w-full h-36 sm:h-44 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2747]/90 via-[#0F2747]/30 to-transparent flex items-end p-4">
                <div className="text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300 bg-[#0F2747]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                    MBA — Banking & Finance Specialization
                  </span>
                  <p className="text-xs font-semibold text-slate-100 mt-1">
                    Post-Graduate Financial Analysis, Capital Budgeting & Management Accounting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Languages Section (Col-Span-5) - Directly Visible */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#0F766E] dark:text-teal-400 uppercase">
                Communication
              </span>
              <h2 className="mt-1 text-3xl font-extrabold text-[#0F2747] dark:text-white tracking-tight">
                Languages
              </h2>
              <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400">
                Linguistic versatility supporting multinational teams, Saudi vendor dealings, and corporate correspondence.
              </p>
            </div>

            {languages.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
                Information will be added soon.
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="p-4 rounded-xl bg-[#F4F6F8] dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#E6F4F1] dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-300 flex items-center justify-center font-bold text-sm">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0F2747] dark:text-white">
                          {lang.name}
                        </h4>
                        {lang.notes && (
                          <span className="text-xs text-[#64748B] dark:text-slate-400">
                            {lang.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#E6F4F1] dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-300 border border-[#0F766E]/20">
                      Fluent / Working
                    </span>
                  </div>
                ))}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-[#64748B] dark:text-slate-400 leading-relaxed">
                  Daily professional communication with Saudi governmental portals (ZATCA), corporate bank officers, suppliers, and internal stakeholders.
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
