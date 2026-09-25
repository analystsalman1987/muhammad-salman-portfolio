import { useState } from 'react';
import {
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { WorkExperienceItem } from '../types';
import alyamiLogo from '../assets/alyami-logo.png';

interface ExperienceProps {
  experience: WorkExperienceItem[];
  backgroundImage?: string;
  showBackgroundImage?: boolean;
}

export function Experience({
  experience,
  backgroundImage,
  showBackgroundImage = false,
}: ExperienceProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  if (!experience || experience.length === 0) {
    return (
      <section
        id="experience"
        className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          Experience information will be added soon.
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

  const allExpanded =
    experience.length > 0 && expandedIds.size === experience.length;

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(experience.map((item) => item.id)));
    }
  };

  const getCompanyLogo = (company: string) => {
    const lower = company.toLowerCase();

    if (
      lower.includes('ahmed alyami') ||
      lower.includes('alyami group') ||
      lower.includes('ahmed yahya alyami')
    ) {
      return {
        src: alyamiLogo,
        alt: 'Ahmed Alyami Group',
      };
    }

    if (
      lower.includes('palestine') ||
      lower.includes('palestine hotel')
    ) {
      return {
        src: '/images/palestine-hotel-logo.png',
        alt: 'Palestine Hotel Makkah',
      };
    }

    if (lower.includes('al raya')) {
      return {
        src: '/images/alraya-logo.svg',
        alt: 'Al Raya Specialties',
      };
    }

    if (lower.includes('honda')) {
      return {
        src: '/images/honda-logo.svg',
        alt: 'Honda Canal Bank',
      };
    }

    return null;
  };

  const getRole = (item: WorkExperienceItem) => {
    return (
      (item as any).role ||
      (item as any).position ||
      (item as any).title ||
      (item as any).designation ||
      'Accountant'
    );
  };

  const getCompany = (item: WorkExperienceItem) => {
    return (
      (item as any).company ||
      (item as any).organization ||
      (item as any).employer ||
      ''
    );
  };

  const getLocation = (item: WorkExperienceItem) => {
    return (
      (item as any).location ||
      (item as any).city ||
      ''
    );
  };

  const getPeriod = (item: WorkExperienceItem) => {
    return (
      (item as any).period ||
      (item as any).date ||
      (item as any).duration ||
      ''
    );
  };

  const getResponsibilities = (item: WorkExperienceItem) => {
    const responsibilities =
      (item as any).responsibilities ||
      (item as any).duties ||
      (item as any).details ||
      [];

    if (Array.isArray(responsibilities)) {
      return responsibilities;
    }

    if (typeof responsibilities === 'string') {
      return responsibilities
        .split('\n')
        .map((text: string) => text.trim())
        .filter(Boolean);
    }

    return [];
  };

  const getDescription = (item: WorkExperienceItem) => {
    return (item as any).description || '';
  };

  return (
    <section
      id="experience"
      className="relative py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors overflow-hidden"
    >
      {showBackgroundImage && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06] dark:opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#0F766E] dark:text-teal-400 uppercase">
              Professional Journey
            </span>

            <h2 className="mt-1 text-3xl font-extrabold text-[#0F2747] dark:text-white sm:text-4xl tracking-tight">
              Professional Experience
            </h2>

            <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400">
              A progressive accounting career covering financial operations,
              reporting, reconciliation, ERP systems, and compliance.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleAll}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#1F2937] dark:text-slate-300 bg-[#F4F6F8] hover:bg-[#E6F4F1] dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer select-none"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#0F766E] dark:text-teal-400" />

            <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
          </button>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-[14px] sm:left-[20px] top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800"
            aria-hidden="true"
          />

          <div className="space-y-6">
            {experience.map((item, index) => {
              const isExpanded = expandedIds.has(item.id);
              const company = getCompany(item);
              const role = getRole(item);
              const location = getLocation(item);
              const period = getPeriod(item);
              const logo = getCompanyLogo(company);
              const responsibilities = getResponsibilities(item);
              const description = getDescription(item);

              const isAlyami =
                company.toLowerCase().includes('alyami') ||
                company.toLowerCase().includes('ahmed yahya');

              return (
                <div
                  key={item.id}
                  className="relative pl-10 sm:pl-14"
                >
                  {/* Timeline Marker */}
                  <div
                    className={`absolute left-0 top-7 sm:top-8 w-7 h-7 sm:w-10 sm:h-10 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center z-10 transition-colors ${
                      isExpanded
                        ? 'bg-[#0F766E] dark:bg-teal-500'
                        : 'bg-[#E6F4F1] dark:bg-teal-950 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                        isExpanded
                          ? 'bg-white'
                          : 'bg-[#0F766E] dark:bg-teal-400'
                      }`}
                    />
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
                      isExpanded
                        ? 'bg-white dark:bg-slate-800/70 border-[#0F766E]/50 dark:border-teal-500/50 ring-1 ring-[#0F766E]/20 shadow-md'
                        : 'bg-[#F4F6F8] dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {/* FIXED HEADER SIZE */}
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
                      className="relative z-10 px-5 py-4 sm:px-6 sm:py-5 cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        {/* LEFT: JOB INFORMATION */}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-bold leading-tight text-[#0F2747] dark:text-white">
                            {role}
                          </h3>

                          <p className="text-sm font-semibold leading-tight text-[#0F766E] dark:text-teal-400 mt-0.5">
                            {company}
                          </p>

                          {location && (
                            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#64748B] dark:text-slate-400 leading-tight">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span>{location}</span>
                            </div>
                          )}
                        </div>

                        {/* RIGHT: FIXED LOGO + DATE */}
                        <div className="shrink-0 flex flex-col items-center justify-center">
                          {/* Fixed logo area - NEVER changes card size */}
                          <div className="w-[155px] h-[64px] sm:w-[175px] sm:h-[68px] flex items-center justify-center overflow-hidden">
                            {logo ? (
                              <img
                                src={logo.src}
                                alt={logo.alt}
                                referrerPolicy="no-referrer"
                                className="max-w-[140px] sm:max-w-[160px] max-h-[52px] sm:max-h-[56px] w-auto h-auto object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
                              </div>
                            )}
                          </div>

                          {/* DATE - directly below logo */}
                          <div className="mt-0.5 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#64748B] dark:text-slate-400 whitespace-nowrap">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            <span>{period}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AHMED ALYAMI WATERMARK - ONLY THIS COMPANY */}
                    {isAlyami && (
                      <div
                        id="ci9vgp"
                        className={`absolute right-2 sm:right-6 md:right-8 bottom-3 sm:bottom-6 pointer-events-none select-none z-0 transition-all duration-500 ease-out ${
                          isExpanded
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2'
                        }`}
                        aria-hidden="true"
                      >
                        <div className="relative w-44 sm:w-72 md:w-96 lg:w-[440px] max-w-[50vw]">
                          <img
                            src={alyamiLogo}
                            alt="Ahmed Yahya Alyami"
                            referrerPolicy="no-referrer"
                            className="w-full h-auto object-contain opacity-[0.18] pointer-events-none select-none drop-shadow-xs"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    {/* EXPANDED DETAILS */}
                    <div
                      className={`relative z-10 grid transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? 'grid-rows-[1fr] opacity-100 border-t border-slate-200/80 dark:border-slate-700/60'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-5 sm:p-6 pt-4">
                          {description && (
                            <p className="text-sm text-[#1F2937] dark:text-slate-300 leading-relaxed font-normal mb-5">
                              {description}
                            </p>
                          )}

                          {responsibilities.length > 0 && (
                            <div className="space-y-3">
                              {responsibilities.map(
                                (responsibility: string, responsibilityIndex: number) => (
                                  <div
                                    key={`${item.id}-responsibility-${responsibilityIndex}`}
                                    className="flex items-start gap-2.5"
                                  >
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#0F766E] dark:text-teal-400" />

                                    <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                                      {responsibility}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                          {!description && responsibilities.length === 0 && (
                            <p className="text-sm text-[#64748B] dark:text-slate-400">
                              Professional experience details available in the
                              CV.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline continuation spacing */}
                  {index < experience.length - 1 && (
                    <div className="h-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
