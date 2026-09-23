import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { ProfileInfo } from '../types';

interface FooterProps {
  profile: ProfileInfo;
  onOpenAdmin: () => void;
  onOpenCV: () => void;
}

export function Footer({ profile, onOpenAdmin, onOpenCV }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F2747] text-slate-300 border-t border-slate-800 transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Title */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F2747] border border-teal-500/50 text-teal-300 font-bold flex items-center justify-center text-base tracking-wider shadow-xs">
                MS
              </div>
              <div>
                <span className="text-base font-bold text-white block">
                  {profile.fullName || 'Muhammad Salman'}
                </span>
                <span className="text-xs text-teal-400 font-medium block">
                  {profile.professionalTitle || 'Accountant | MBA Accounting & Finance'}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300/80 max-w-md leading-relaxed">
              Accounting professional with 14+ years across Saudi Arabia and Pakistan specializing in financial reporting, bookkeeping, reconciliations, month-end closing, ERP systems, and ZATCA VAT compliance.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300/80 pt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>{profile.location || 'Dammam, Saudi Arabia'}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Direct Contact
            </h4>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <a href={`tel:${profile.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                {profile.primaryPhone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Alt: {profile.altPhone}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenCV}
                  className="hover:text-teal-300 transition-colors text-left cursor-pointer"
                >
                  View & Print CV / Resume
                </button>
              </li>
              <li>
                <a href="#experience" className="hover:text-teal-300 transition-colors">
                  Career History
                </a>
              </li>
              <li>
                <a href="#software" className="hover:text-teal-300 transition-colors">
                  ERP & Accounting Software
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenAdmin();
                  }}
                  className="text-slate-400 hover:text-teal-300 transition-colors text-left flex items-center gap-1 cursor-pointer"
                >
                  <span>Admin Panel</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {profile.fullName || 'Muhammad Salman'}. All rights reserved.
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-[#0F766E] text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
