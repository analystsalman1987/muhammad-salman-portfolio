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
    <section id="education" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Education Section (Col-Span-7) - Expandable Degree Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                Academic Background
              </span>
              <h2 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Education
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
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
                          ? 'bg-white dark:bg-slate-900 border-emerald-500/50 dark:border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-sm'
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
                        className="p-5 sm:p-6 cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-6 h-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                  {item.degree} — {item.specialization}
                                </h3>
                                {item.institution && (
                                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                                    {item.institution}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                                  <Calendar className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                  {item.period}
                                </span>

                                <div
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
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
                          </div>
                        </div>
                      </div>

                      {/* Expandable Details Area */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30'
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-5 sm:p-6 pt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                            <div className="flex items-center gap-2 font-medium">
                              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              <span>Specialization: <strong>{item.specialization}</strong></span>
                            </div>
                            <p className="leading-relaxed text-slate-500 dark:text-slate-400">
                              Comprehensive academic training in corporate finance, financial accounting, banking regulations, credit analysis, and financial management.
                            </p>
                            {item.institution && (
                              <p className="text-slate-500 dark:text-slate-400">
                                Institution: <span className="font-semibold text-slate-700 dark:text-slate-200">{item.institution}</span>
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
          </div>

          {/* Languages Section (Col-Span-5) - Directly Visible */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                Communication
              </span>
              <h2 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Languages
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
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
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang.name}
                        </h4>
                        {lang.notes && (
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {lang.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-200/60 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      Fluent / Working
                    </span>
                  </div>
                ))}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
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
