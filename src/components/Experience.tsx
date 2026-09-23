import { 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Briefcase 
} from 'lucide-react';
import { WorkExperienceItem } from '../types';

interface ExperienceProps {
  experience: WorkExperienceItem[];
}

export function Experience({ experience }: ExperienceProps) {
  if (!experience || experience.length === 0) {
    return (
      <section id="experience" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          Information will be added soon.
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
            Career Timeline
          </span>
          <h2 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            Work Experience
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            A sustained record of financial management, regulatory adherence, and accounting across manufacturing, trade, hospitality, and automotive sectors in Saudi Arabia and Pakistan.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
          {experience.map((job) => (
            <div key={job.id} className="relative group">
              
              {/* Timeline marker node */}
              <div 
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                  job.isCurrent
                    ? 'bg-emerald-500 border-emerald-200 dark:border-emerald-950 ring-4 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-400 dark:border-slate-600 group-hover:border-emerald-500 group-hover:scale-110'
                }`}
              />

              {/* Card Container */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs">
                
                {/* Header: Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-700/60">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {job.role}
                      </h3>
                      {job.isCurrent && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Present Role
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600 dark:text-slate-300 flex-wrap">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {job.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{job.period}</span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                    Core Key Responsibilities
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
