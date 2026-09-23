import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  CheckCircle, 
  Layers, 
  Globe 
} from 'lucide-react';
import { AppData } from '../types';

interface PrintableCVProps {
  data: AppData;
}

export const PrintableCV: React.FC<PrintableCVProps> = ({ data }) => {
  const { profile, experience, skills, software, education, languages } = data;

  return (
    <div className="bg-white text-slate-900 p-8 sm:p-12 max-w-4xl mx-auto shadow-lg print:shadow-none print:p-0 print:max-w-none text-left font-sans">
      
      {/* CV Header */}
      <div className="border-b-2 border-slate-800 pb-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {profile.fullName}
            </h1>
            <p className="text-base font-semibold text-emerald-800 mt-1">
              {profile.professionalTitle}
            </p>
          </div>
          
          <div className="text-xs text-slate-600 space-y-1 sm:text-right">
            <div className="flex items-center sm:justify-end gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-700" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-700" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-700" />
              <span>{profile.primaryPhone} | {profile.altPhone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
          Professional Summary
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed">
          {profile.summary}
        </p>
      </div>

      {/* Work Experience */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-3">
          Work Experience
        </h2>
        <div className="space-y-4">
          {experience.map((job) => (
            <div key={job.id} className="text-xs">
              <div className="flex items-start justify-between font-bold text-slate-900">
                <span>
                  {job.role} — <span className="font-semibold text-slate-700">{job.company}</span>
                </span>
                <span className="text-slate-600 font-medium whitespace-nowrap ml-2">
                  {job.period} | {job.location}
                </span>
              </div>
              <ul className="mt-1.5 list-disc list-inside space-y-1 text-slate-700">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="leading-normal">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="mb-6 page-break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
          Core Skills & Competencies
        </h2>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {skills.map((cat) => (
            <div key={cat.id}>
              <span className="font-bold text-slate-900">{cat.categoryName}: </span>
              <span className="text-slate-700">{cat.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ERP & Software */}
      <div className="mb-6 page-break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
          ERP & Systems Expertise
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          {software.map((sw) => (
            <div key={sw.id} className="bg-slate-50 border border-slate-200 p-2 rounded">
              <div className="font-bold text-slate-900">{sw.name}</div>
              <div className="text-[11px] text-emerald-800 font-medium">{sw.category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 page-break-inside-avoid">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="font-bold text-slate-900">
                  {edu.degree} — {edu.specialization}
                </div>
                <div className="text-slate-600">
                  {edu.period} {edu.institution ? `| ${edu.institution}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
            Languages
          </h2>
          <div className="space-y-1 text-xs text-slate-700">
            {languages.map((l) => (
              <div key={l.id}>
                <span className="font-bold text-slate-900">{l.name}</span>
                {l.notes && <span className="text-slate-600"> ({l.notes})</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification footer */}
      <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-500">
        Professional CV of Muhammad Salman • Accountant | MBA Accounting & Finance • Dammam, Saudi Arabia
      </div>

    </div>
  );
};
