import { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileDown, 
  ArrowLeft 
} from 'lucide-react';
import { AppData } from '../types';
import { PrintableCV } from './PrintableCV';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AppData;
}

export function CVModal({ isOpen, onClose, data }: CVModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const { profile, experience, skills, software, education, languages } = data;
    
    let text = `${profile.fullName.toUpperCase()}\n`;
    text += `${profile.professionalTitle}\n`;
    text += `Location: ${profile.location}\n`;
    text += `Email: ${profile.email}\n`;
    text += `Phone: ${profile.primaryPhone} | ${profile.altPhone}\n\n`;

    text += `--- PROFESSIONAL SUMMARY ---\n${profile.summary}\n\n`;

    text += `--- WORK EXPERIENCE ---\n`;
    experience.forEach((job) => {
      text += `\n${job.role} - ${job.company} (${job.period}) - ${job.location}\n`;
      job.responsibilities.forEach((r) => {
        text += `• ${r}\n`;
      });
    });

    text += `\n--- SKILLS & COMPETENCIES ---\n`;
    skills.forEach((c) => {
      text += `${c.categoryName}: ${c.skills.join(', ')}\n`;
    });

    text += `\n--- ERP & SOFTWARE ---\n`;
    software.forEach((s) => {
      text += `${s.name} (${s.category}): ${s.description}\n`;
    });

    text += `\n--- EDUCATION ---\n`;
    education.forEach((e) => {
      text += `${e.degree} - ${e.specialization} (${e.period})${e.institution ? ` - ${e.institution}` : ''}\n`;
    });

    text += `\n--- LANGUAGES ---\n`;
    languages.forEach((l) => {
      text += `${l.name}${l.notes ? ` (${l.notes})` : ''}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-slate-100 dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col my-auto border border-slate-300 dark:border-slate-800 print:border-none print:shadow-none print:m-0 print:w-full print:max-w-none">
        
        {/* Modal Toolbar (hidden on print) */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 rounded-t-2xl no-print">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Muhammad Salman — Professional CV
              </h3>
              <p className="text-[11px] text-slate-500">
                Ready to Print, Save as PDF, or Copy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy button */}
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            {/* Print / Save to PDF button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Body */}
        <div className="p-4 sm:p-8 overflow-y-auto max-h-[82vh] print:max-h-none print:p-0">
          <PrintableCV data={data} />
        </div>

      </div>

    </div>
  );
}
