import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  Globe, 
  ChevronDown, 
  FileText, 
  ExternalLink, 
  X, 
  Award, 
  Printer, 
  Download, 
  CheckCircle2 
} from 'lucide-react';
import { EducationItem, LanguageItem } from '../types';

interface EducationLanguagesProps {
  education: EducationItem[];
  languages: LanguageItem[];
}

interface DegreeCertificate {
  title: string;
  degreeName: string;
  major: string;
  institution: string;
  location: string;
  date: string;
  regNo: string;
  degNo: string;
  svgUrl: string;
  htmlUrl: string;
}

const CERTIFICATES_DATA: Record<string, DegreeCertificate> = {
  mba: {
    title: 'Master of Business Administration in Finance',
    degreeName: 'Master of Business Administration',
    major: 'Finance',
    institution: 'Preston Institute of Management, Science and Technology',
    location: 'Karachi - Pakistan',
    date: 'November 20, 2012',
    regNo: '1531209016',
    degNo: '20111215207',
    svgUrl: '/certificates/mba-degree-certificate.svg',
    htmlUrl: '/certificates/mba-degree-certificate.html',
  },
  bba: {
    title: 'Bachelor of Business Administration in Finance',
    degreeName: 'Bachelor of Business Administration',
    major: 'Finance',
    institution: 'Preston Institute of Management, Science and Technology',
    location: 'Karachi - Pakistan',
    date: 'August 25, 2012',
    regNo: '1511205039',
    degNo: '25081214462',
    svgUrl: '/certificates/bba-degree-certificate.svg',
    htmlUrl: '/certificates/bba-degree-certificate.html',
  },
};

export function EducationLanguages({ education, languages }: EducationLanguagesProps) {
  // Collapsed by default
  const [expandedEduIds, setExpandedEduIds] = useState<Set<string>>(new Set());
  const [activeCertificate, setActiveCertificate] = useState<DegreeCertificate | null>(null);

  // Close certificate modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCertificate(null);
      }
    };
    if (activeCertificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCertificate]);

  const toggleEdu = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
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

  const getCertificateForItem = (item: EducationItem): DegreeCertificate | null => {
    const deg = item.degree.toLowerCase();
    if (deg.includes('mba') || item.id === 'edu-1') {
      return CERTIFICATES_DATA.mba;
    }
    if (deg.includes('bba') || item.id === 'edu-2') {
      return CERTIFICATES_DATA.bba;
    }
    return null;
  };

  return (
    <section id="education" className="py-20 bg-[#F4F6F8] dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Education Section (Col-Span-7) - Expandable Degree Cards with Certificate Access */}
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
                  const cert = getCertificateForItem(item);

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border transition-all duration-200 shadow-xs overflow-hidden ${
                        isExpanded
                          ? 'bg-white dark:bg-slate-900 border-[#0F766E]/50 dark:border-teal-500/50 ring-1 ring-[#0F766E]/20 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-[#0F766E]/40 dark:hover:border-teal-600/40'
                      }`}
                    >
                      {/* Clickable Card Header - Clicking opens the attached Degree Certificate */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          if (cert) {
                            setActiveCertificate(cert);
                          } else {
                            toggleEdu(item.id);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            if (cert) {
                              setActiveCertificate(cert);
                            } else {
                              toggleEdu(item.id);
                            }
                          }
                        }}
                        aria-label={`View ${item.degree} degree certificate`}
                        className="p-5 sm:p-6 cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F766E] group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#E6F4F1] dark:bg-teal-950/70 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <GraduationCap className="w-6 h-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <h3 className="text-base sm:text-lg font-bold text-[#0F2747] dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors flex items-center gap-2 flex-wrap">
                                  <span>{item.degree} — {item.specialization}</span>
                                </h3>
                                {item.institution && (
                                  <p className="text-xs font-medium text-[#64748B] dark:text-slate-400 mt-0.5">
                                    {item.institution}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F2937] dark:text-slate-300 bg-[#F4F6F8] dark:bg-slate-800 px-2.5 py-1 rounded-md">
                                  <Calendar className="w-3 h-3 text-[#0F766E] dark:text-teal-400" />
                                  {item.period}
                                </span>

                                {/* Degree Certificate Action Indicator */}
                                {cert && (
                                  <span
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-[#E6F4F1] text-[#0F766E] dark:bg-teal-950/60 dark:text-teal-300 border border-[#0F766E]/30 dark:border-teal-800 group-hover:bg-[#0F766E] group-hover:text-white dark:group-hover:bg-teal-600 dark:group-hover:text-white transition-all shadow-2xs"
                                    title="Click to view official degree certificate"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>Certificate</span>
                                    <ExternalLink className="w-3 h-3 opacity-70" />
                                  </span>
                                )}

                                {/* Details expansion toggle */}
                                <button
                                  type="button"
                                  onClick={(e) => toggleEdu(item.id, e)}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                                    isExpanded
                                      ? 'bg-[#0F766E] text-white'
                                      : 'bg-[#F4F6F8] text-[#475569] hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                  }`}
                                  title="Toggle academic overview"
                                >
                                  <span>{isExpanded ? 'Hide' : 'Details'}</span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                                      isExpanded ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
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
                          <div className="p-5 sm:p-6 pt-4 space-y-3 text-xs text-[#1F2937] dark:text-slate-300">
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

                            {/* Direct Certificate Button inside expanded details */}
                            {cert && (
                              <div className="pt-2 flex items-center gap-3 flex-wrap">
                                <button
                                  type="button"
                                  onClick={() => setActiveCertificate(cert)}
                                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0F766E] text-white hover:bg-[#0D9488] shadow-xs transition-colors cursor-pointer"
                                >
                                  <Award className="w-4 h-4" />
                                  <span>Open Official Degree Certificate</span>
                                </button>
                                <a
                                  href={cert.htmlUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] dark:text-teal-400 hover:underline"
                                >
                                  <span>Open in new tab</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
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

      {/* Clean Degree Certificate Viewer Modal */}
      {activeCertificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          onClick={() => setActiveCertificate(null)}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-[11px] font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Verified Credential
                </span>
                <div>
                  <h3 id="cert-modal-title" className="text-sm sm:text-base font-bold text-white">
                    {activeCertificate.title}
                  </h3>
                  <p className="text-xs text-slate-400 hidden sm:block">
                    {activeCertificate.institution} • Reg: {activeCertificate.regNo} • Conferred: {activeCertificate.date}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2">
                <a
                  href={activeCertificate.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Open certificate viewer in dedicated browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <a
                  href={activeCertificate.svgUrl}
                  download={`Muhammad-Salman-${activeCertificate.degreeName.replace(/\s+/g, '-')}-Certificate.svg`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Download vector certificate"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Print certificate"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCertificate(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
                  aria-label="Close certificate viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Certificate Viewport */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 bg-[#0B1727] flex items-center justify-center">
              <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-300">
                <img
                  src={activeCertificate.svgUrl}
                  alt={`${activeCertificate.title} — Muhammad Salman`}
                  className="w-full h-auto block select-none"
                  loading="eager"
                />
              </div>
            </div>

            {/* Modal Verification Footer */}
            <div className="px-5 py-2.5 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
              <span>
                Preston Institute of Management, Science and Technology • Reg. No: <strong>{activeCertificate.regNo}</strong> • Deg. No: <strong>{activeCertificate.degNo}</strong>
              </span>
              <span className="text-teal-400 font-medium">
                Conferred: {activeCertificate.date}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
