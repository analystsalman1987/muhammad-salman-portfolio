import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  ExternalLink, 
  Info,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { ProfileInfo } from '../types';

interface ContactProps {
  profile: ProfileInfo;
  onSendMessage: (msg: { name: string; email: string; message: string; subject?: string }) => void;
}

export function Contact({ profile, onSendMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    try {
      onSendMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'Inquiry from Profile Website',
        message: formData.message.trim(),
      });
      setSubmitted(true);
      setError(null);
    } catch {
      setError('Unable to save message locally.');
    }
  };

  const handleOpenEmailClient = () => {
    const subject = encodeURIComponent(formData.subject || 'Professional Inquiry - Muhammad Salman');
    const body = encodeURIComponent(
      `Hello Muhammad,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-widest text-[#0F766E] dark:text-teal-400 uppercase">
            Get In Touch
          </span>
          <h2 className="mt-1 text-3xl font-extrabold text-[#0F2747] dark:text-white sm:text-4xl tracking-tight">
            Contact Information
          </h2>
          <p className="mt-2 text-sm text-[#64748B] dark:text-slate-400">
            Available for professional accounting, finance management, and corporate opportunities across Saudi Arabia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Direct Cards (Left) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <a
              href={`mailto:${profile.email}`}
              className="p-5 rounded-2xl bg-[#F4F6F8] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-[#0F766E]/50 transition-all flex items-start gap-4 group block"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E6F4F1] dark:bg-teal-950/70 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold text-[#64748B] dark:text-slate-500 uppercase tracking-wider block">
                  Email Address
                </span>
                <span className="text-sm font-semibold text-[#0F2747] dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors break-all">
                  {profile.email}
                </span>
                <span className="text-xs text-[#64748B] dark:text-slate-400 block mt-0.5">
                  Direct primary correspondence
                </span>
              </div>
            </a>

            {/* Primary Phone Card */}
            <a
              href={`tel:${profile.primaryPhone.replace(/\s+/g, '')}`}
              className="p-5 rounded-2xl bg-[#F4F6F8] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-[#0F766E]/50 transition-all flex items-start gap-4 group block"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E6F4F1] dark:bg-teal-950/70 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#64748B] dark:text-slate-500 uppercase tracking-wider block">
                  Primary Mobile / WhatsApp
                </span>
                <span className="text-sm font-semibold text-[#0F2747] dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors">
                  {profile.primaryPhone}
                </span>
                <span className="text-xs text-[#64748B] dark:text-slate-400 block mt-0.5">
                  Direct phone & messaging
                </span>
              </div>
            </a>

            {/* Alternative Phone Card */}
            <a
              href={`tel:${profile.altPhone.replace(/\s+/g, '')}`}
              className="p-5 rounded-2xl bg-[#F4F6F8] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-[#0F766E]/50 transition-all flex items-start gap-4 group block"
            >
              <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 text-[#0F766E] dark:text-teal-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#64748B] dark:text-slate-500 uppercase tracking-wider block">
                  Alternative Phone
                </span>
                <span className="text-sm font-semibold text-[#0F2747] dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors">
                  {profile.altPhone}
                </span>
                <span className="text-xs text-[#64748B] dark:text-slate-400 block mt-0.5">
                  Secondary contact line
                </span>
              </div>
            </a>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-[#F4F6F8] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#E6F4F1] dark:bg-teal-950/70 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#64748B] dark:text-slate-500 uppercase tracking-wider block">
                  Location
                </span>
                <span className="text-sm font-semibold text-[#0F2747] dark:text-white">
                  {profile.location}
                </span>
                <span className="text-xs text-[#64748B] dark:text-slate-400 block mt-0.5">
                  Eastern Province, Kingdom of Saudi Arabia
                </span>
              </div>
            </div>

            {/* Driving License Card */}
            {profile.drivingLicense && (
              <div className="p-5 rounded-2xl bg-[#F4F6F8] dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E6F4F1] dark:bg-teal-950/70 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#64748B] dark:text-slate-500 uppercase tracking-wider block">
                    Driving License
                  </span>
                  <span className="text-sm font-semibold text-[#0F2747] dark:text-white">
                    {profile.drivingLicense}
                  </span>
                  <span className="text-xs text-[#64748B] dark:text-slate-400 block mt-0.5">
                    Authorized in Kingdom of Saudi Arabia
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7">
            <div className="p-7 rounded-2xl bg-[#F4F6F8] dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-[#0F2747] dark:text-white">
                    Send a Message
                  </h3>
                  <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                    Messages are stored locally and can also be opened directly in your email client.
                  </p>
                </div>
              </div>

              {/* Informational callout as explicitly requested in prompt */}
              <div className="mb-5 p-3 rounded-xl bg-[#E6F4F1] dark:bg-teal-950/40 border border-[#0F766E]/20 dark:border-teal-900/60 text-xs text-[#0F766E] dark:text-teal-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#0F766E] dark:text-teal-400" />
                <span>
                  Notice: This frontend application stores inquiry messages locally in your browser storage (viewable in the Admin Panel inbox). You can also click below to open your native email software.
                </span>
              </div>

              {submitted ? (
                <div className="p-6 text-center space-y-4 rounded-xl bg-[#E6F4F1] dark:bg-teal-950/40 border border-[#0F766E]/30 dark:border-teal-800">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-teal-900/60 text-[#0F766E] dark:text-teal-400 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0F2747] dark:text-teal-200">
                      Message Saved Successfully!
                    </h4>
                    <p className="text-xs text-[#0F766E] dark:text-teal-300 mt-1 max-w-md mx-auto">
                      Your inquiry has been stored locally in the admin inbox. Would you also like to transmit this directly to Muhammad Salman's email inbox?
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center pt-2">
                    <button
                      onClick={handleOpenEmailClient}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F766E] hover:bg-[#0c625c] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Send Via Email App</span>
                    </button>
                    <button
                      onClick={resetForm}
                      className="px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 text-[#1F2937] dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-[#F4F6F8] transition-colors cursor-pointer"
                    >
                      Write Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] dark:text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Abdullah Al-Harbi"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#1F2937] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] dark:text-slate-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@company.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#1F2937] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Professional Accounting Opportunity"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#1F2937] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] dark:text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your inquiry or proposal here..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#1F2937] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0F766E] hover:bg-[#0c625c] text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message (Save Locally)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenEmailClient}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg text-[#0F766E] dark:text-teal-300 hover:bg-[#E6F4F1]/60 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Direct Email Client</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
