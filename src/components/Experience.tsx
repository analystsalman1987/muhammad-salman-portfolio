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
}

export default function Experience({ experience }: ExperienceProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [showBackground, setShowBackground] = useState(true);

  const toggleItem = (index: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  };

  const expandAll = () => {
    setExpandedItems(new Set(experience.map((_, index) => index)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  if (!experience || experience.length === 0) {
    return (
      <section id="experience" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <Briefcase className="mx-auto mb-4 h-10 w-10 text-slate-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              No work experience added
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Work experience information will appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <Briefcase className="h-3.5 w-3.5" />
              Career
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Professional Experience
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-400">
              A detailed overview of my professional accounting and finance
              experience.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Expand All
            </button>

            <button
              type="button"
              onClick={collapseAll}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Collapse All
            </button>

            <button
              type="button"
              onClick={() => setShowBackground((prev) => !prev)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                showBackground
                  ? 'border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
                  : 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'
              }`}
            >
              {showBackground ? 'Hide Background' : 'Show Background'}
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[10px] top-0 hidden h-full w-px bg-slate-200 sm:left-[15px] sm:block dark:bg-slate-700" />

          <div className="space-y-5">
            {experience.map((job, index) => {
              const isExpanded = expandedItems.has(index);

              const companyName = job.company?.toLowerCase() || '';

              const isAlyami =
                companyName.includes('ahmed alyami') ||
                companyName.includes('alyami');

              const isPalestine =
                companyName.includes('palestine hotel') ||
                companyName.includes('palestine');

              const isAlRaya =
                companyName.includes('al raya') ||
                companyName.includes('alraya');

              const isHonda =
                companyName.includes('honda') ||
                companyName.includes('canal bank');

              return (
                <div
                  key={index}
                  className="relative pl-0 sm:pl-12"
                >
                  {/* Timeline Marker */}
                  <div className="absolute left-[5px] top-7 z-20 hidden sm:flex">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-slate-700 shadow-sm dark:border-slate-950 dark:bg-slate-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-900" />
                    </div>
                  </div>

                  <div
                    className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 ${
                      isExpanded
                        ? 'shadow-md'
                        : 'hover:-translate-y-0.5 hover:shadow-md'
                    }`}
                  >
                    {/* Optional background image */}
                    {showBackground && job.backgroundImage && (
                      <div className="pointer-events-none absolute inset-0 z-0">
                        <img
                          src={job.backgroundImage}
                          alt=""
                          className="h-full w-full object-cover opacity-[0.035]"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    {/* Header */}
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      className="relative z-10 w-full text-left"
                      aria-expanded={isExpanded}
                    >
                      <div className="px-5 py-4 sm:px-6 sm:py-5">
                        <div className="flex items-center justify-between gap-5">

                          {/* Left: Job / Company / Location */}
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base font-bold leading-tight text-slate-900 sm:text-lg dark:text-white">
                              {job.role}
                            </h3>

                            <div className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold leading-tight text-slate-700 dark:text-slate-300">
                              <Building2 className="h-3.5 w-3.5 shrink-0" />
                              <span>{job.company}</span>
                            </div>

                            <div className="mt-0.5 flex items-center gap-1.5 text-xs leading-tight text-slate-500 sm:text-sm dark:text-slate-400">
                              <MapPin className="h-3.5 w-3.5 shrink-0" />
                              <span>{job.location}</span>
                            </div>
                          </div>

                          {/* Right: ONE Logo + Date */}
                          <div className="shrink-0 flex flex-col items-center justify-center">
                            <div className="flex h-[64px] w-[155px] items-center justify-center sm:h-[68px] sm:w-[175px]">

                              {/* Ahmed Alyami Group */}
                              {isAlyami && (
                                <img
                                  src={alyamiLogo}
                                  alt="Ahmed Alyami Group"
                                  referrerPolicy="no-referrer"
                                  className="h-auto max-h-[52px] w-auto max-w-[140px] object-contain sm:max-h-[56px] sm:max-w-[160px]"
                                />
                              )}

                              {/* Palestine Hotel */}
                              {isPalestine && (
                                <img
                                  src="/images/palestine-hotel-logo.png"
                                  alt="Palestine Hotel"
                                  className="h-auto max-h-[52px] w-auto max-w-[140px] object-contain sm:max-h-[56px] sm:max-w-[160px]"
                                />
                              )}

                              {/* Al Raya */}
                              {isAlRaya && (
                                <img
                                  src="/images/alraya-logo.svg"
                                  alt="Al Raya"
                                  className="h-auto max-h-[52px] w-auto max-w-[140px] object-contain sm:max-h-[56px] sm:max-w-[160px]"
                                />
                              )}

                              {/* Honda */}
                              {isHonda && (
                                <img
                                  src="/images/honda-logo.svg"
                                  alt="Honda"
                                  className="h-auto max-h-[52px] w-auto max-w-[140px] object-contain sm:max-h-[56px] sm:max-w-[160px]"
                                />
                              )}

                              {/* Fallback icon if no company logo */}
                              {!isAlyami &&
                                !isPalestine &&
                                !isAlRaya &&
                                !isHonda && (
                                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                                    <Building2 className="h-6 w-6 text-slate-400" />
                                  </div>
                                )}
                            </div>

                            {/* Date directly below logo */}
                            <div className="mt-0.5 flex items-center justify-center gap-1.5 text-[11px] font-semibold leading-tight text-slate-500 sm:text-xs dark:text-slate-400">
                              <Calendar className="h-3.5 w-3.5 shrink-0" />
                              <span>{job.period}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Details */}
                    <div
                      className={`relative z-10 grid transition-all duration-500 ease-out ${
                        isExpanded
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="relative border-t border-slate-200 px-5 pb-6 pt-5 sm:px-6 dark:border-slate-700">

                          {/* Ahmed Alyami watermark ONLY */}
                          {isAlyami && (
                            <div
                              className={`pointer-events-none absolute bottom-3 right-2 z-0 select-none transition-all duration-500 ease-out sm:bottom-6 sm:right-6 md:right-8 ${
                                isExpanded
                                  ? 'translate-y-0 opacity-100'
                                  : 'translate-y-2 opacity-0'
                              }`}
                              aria-hidden="true"
                            >
                              <div className="relative w-44 max-w-[50vw] sm:w-72 md:w-96 lg:w-[440px]">
                                <img
                                  src={alyamiLogo}
                                  alt="Ahmed Yahya Alyami"
                                  referrerPolicy="no-referrer"
                                  className="pointer-events-none h-auto w-full select-none object-contain opacity-[0.18] drop-shadow-xs"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          )}

                          {/* Responsibilities */}
                          <div className="relative z-10">
                            <div className="mb-4 flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />

                              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                Key Responsibilities
                              </h4>
                            </div>

                            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                              {job.responsibilities?.map(
                                (responsibility, responsibilityIndex) => (
                                  <div
                                    key={responsibilityIndex}
                                    className="flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-400"
                                  >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />

                                    <span>{responsibility}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
