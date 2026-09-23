import { useState, useRef } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Trash2, 
  Plus, 
  Check, 
  AlertTriangle,
  User,
  Camera,
  Briefcase,
  Layers,
  GraduationCap,
  Globe,
  Sliders,
  Mail,
  FileSpreadsheet,
  Award,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { AppData, ContactMessage, WorkExperienceItem, ExpertiseItem, EducationItem, LanguageItem, SoftwareItem } from '../../types';
import { storageService } from '../../services/storageService';

interface AdminDashboardProps {
  data: AppData;
  onUpdateData: (updater: (prev: AppData) => AppData) => void;
  onResetData: () => void;
  messages: ContactMessage[];
  onDeleteMessage: (id: string) => void;
  onClearMessages: () => void;
  onClose: () => void;
  onLogout: () => void;
  isFullPage?: boolean;
}

type TabType = 
  | 'profile'
  | 'photo'
  | 'experience'
  | 'expertise'
  | 'skills'
  | 'software'
  | 'education'
  | 'languages'
  | 'visibility'
  | 'inbox'
  | 'backup';

export function AdminDashboard({
  data,
  onUpdateData,
  onResetData,
  messages,
  onDeleteMessage,
  onClearMessages,
  onClose,
  onLogout,
  isFullPage = false,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);

  // Local draft state for quick editing
  const [localData, setLocalData] = useState<AppData>(data);

  // Sync when prop updates
  const handleSaveAll = () => {
    onUpdateData(() => localData);
    setSaveStatus('Changes saved successfully to browser storage!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Image Upload handler with canvas compression
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaveStatus('Compressing and saving profile photo...');
      const compressedDataUrl = await storageService.compressImage(file, 400, 0.82);
      
      const updated = {
        ...localData,
        profile: {
          ...localData.profile,
          avatarUrl: compressedDataUrl,
        },
      };
      setLocalData(updated);
      onUpdateData(() => updated);
      setSaveStatus('Profile photo updated successfully!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      alert('Could not process image. Please try a standard JPG/PNG file under 5MB.');
    }
  };

  const handleRemovePhoto = () => {
    const updated = {
      ...localData,
      profile: {
        ...localData.profile,
        avatarUrl: '',
      },
    };
    setLocalData(updated);
    onUpdateData(() => updated);
    setSaveStatus('Photo removed. Using initials MS placeholder.');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Export JSON backup
  const handleExport = () => {
    const jsonStr = storageService.exportAppData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `muhammad-salman-profile-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = storageService.importAppData(content);
      if (res.success) {
        setLocalData(storageService.getAppData());
        setImportSuccess(true);
        setImportError(null);
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError(res.error || 'Failed to import JSON file');
      }
    };
    reader.readAsText(file);
  };

  const outerWrapper = isFullPage
    ? "min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col p-2 sm:p-6"
    : "fixed inset-0 z-50 overflow-y-auto bg-slate-900/90 backdrop-blur-md flex justify-center p-2 sm:p-6";
  const innerCard = isFullPage
    ? "w-full max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col flex-1 min-h-[90vh] overflow-hidden"
    : "w-full max-w-6xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col my-auto max-h-[95vh] overflow-hidden";

  return (
    <div className={outerWrapper}>
      <div className={innerCard}>
        
        {/* Admin Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="Return to Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Profile Management Console
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Local Mode
                </span>
              </div>
              <p className="text-xs text-slate-500">
                All changes immediately update the public website and persist in LocalStorage.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveStatus && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md animate-fade-in flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{saveStatus}</span>
              </span>
            )}

            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 scrollbar-none">
          {[
            { id: 'profile', label: 'Personal & Bio', icon: User },
            { id: 'photo', label: 'Profile Photo', icon: Camera },
            { id: 'experience', label: 'Work Experience', icon: Briefcase },
            { id: 'expertise', label: `Expertise (${localData.expertise.length})`, icon: Layers },
            { id: 'skills', label: 'Skills', icon: Award },
            { id: 'software', label: 'ERP & Software', icon: FileSpreadsheet },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'languages', label: 'Languages', icon: Globe },
            { id: 'visibility', label: 'Section Toggles', icon: Sliders },
            { id: 'inbox', label: `Inquiries (${messages.length})`, icon: Mail },
            { id: 'backup', label: 'Backup & Reset', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <div className="space-y-5 max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={localData.profile.fullName}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        profile: { ...localData.profile, fullName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={localData.profile.professionalTitle}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        profile: { ...localData.profile, professionalTitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={localData.profile.location}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        profile: { ...localData.profile, location: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={localData.profile.email}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        profile: { ...localData.profile, email: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Phone (WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={localData.profile.primaryPhone}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        profile: { ...localData.profile, primaryPhone: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Alternative Phone
                  </label>
                  <input
                    type="text"
                    value={localData.profile.altPhone}
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        profile: { ...localData.profile, altPhone: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Driving License
                  </label>
                  <input
                    type="text"
                    value={localData.profile.drivingLicense || ''}
                    placeholder="e.g. Valid Saudi Driving License"
                    onChange={(e) =>
                      setLocalData({
                        ...localData,
                        profile: { ...localData.profile, drivingLicense: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hero Section Introduction
                </label>
                <textarea
                  rows={3}
                  value={localData.profile.heroIntro}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      profile: { ...localData.profile, heroIntro: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  About Section Summary
                </label>
                <textarea
                  rows={4}
                  value={localData.profile.summary}
                  onChange={(e) =>
                    setLocalData({
                      ...localData,
                      profile: { ...localData.profile, summary: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                >
                  Save Personal Information
                </button>
              </div>
            </div>
          )}

          {/* TAB: PROFILE PHOTO */}
          {activeTab === 'photo' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Profile Photo Management
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload your professional headshot. Images are automatically compressed via client-side Canvas to fit comfortably within LocalStorage (~100KB limit).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                {localData.profile.avatarUrl ? (
                  <img
                    src={localData.profile.avatarUrl}
                    alt="Muhammad Salman"
                    className="w-36 h-36 rounded-xl object-cover border-2 border-emerald-500 shadow-md"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-xl bg-slate-900 text-emerald-400 border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center text-center p-3">
                    <span className="text-3xl font-extrabold">MS</span>
                    <span className="text-[10px] text-slate-400 mt-1">Default Initials Avatar</span>
                  </div>
                )}

                <div className="space-y-3 text-center sm:text-left">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                    >
                      Upload New Photo
                    </button>
                    {localData.profile.avatarUrl && (
                      <button
                        onClick={handleRemovePhoto}
                        className="px-4 py-2 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold hover:bg-rose-100"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Supports JPG, PNG, WebP. If no photo is uploaded, the website cleanly renders the corporate "MS" initials badge.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: WORK EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Work Experience History ({localData.experience.length} records)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Edit roles, periods, companies, or add/remove responsibilities.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newJob: WorkExperienceItem = {
                      id: 'job-' + Date.now(),
                      role: 'Accountant',
                      company: 'New Organization',
                      location: 'Saudi Arabia',
                      period: `${new Date().getFullYear()} – Present`,
                      isCurrent: false,
                      responsibilities: ['Financial reporting and bookkeeping.'],
                    };
                    const updated = {
                      ...localData,
                      experience: [newJob, ...localData.experience],
                    };
                    setLocalData(updated);
                    onUpdateData(() => updated);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-5">
                {localData.experience.map((job, jIdx) => (
                  <div
                    key={job.id}
                    className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                        Position #{jIdx + 1}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm('Delete this employment entry?')) {
                            const updated = {
                              ...localData,
                              experience: localData.experience.filter((x) => x.id !== job.id),
                            };
                            setLocalData(updated);
                            onUpdateData(() => updated);
                          }
                        }}
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Role Title
                        </label>
                        <input
                          type="text"
                          value={job.role}
                          onChange={(e) => {
                            const next = [...localData.experience];
                            next[jIdx].role = e.target.value;
                            setLocalData({ ...localData, experience: next });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={job.company}
                          onChange={(e) => {
                            const next = [...localData.experience];
                            next[jIdx].company = e.target.value;
                            setLocalData({ ...localData, experience: next });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={job.location}
                          onChange={(e) => {
                            const next = [...localData.experience];
                            next[jIdx].location = e.target.value;
                            setLocalData({ ...localData, experience: next });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                          Period
                        </label>
                        <input
                          type="text"
                          value={job.period}
                          onChange={(e) => {
                            const next = [...localData.experience];
                            next[jIdx].period = e.target.value;
                            setLocalData({ ...localData, experience: next });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                          Responsibilities ({job.responsibilities.length})
                        </label>
                        <button
                          onClick={() => {
                            const next = [...localData.experience];
                            next[jIdx].responsibilities.push('New responsibility item');
                            setLocalData({ ...localData, experience: next });
                          }}
                          className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {job.responsibilities.map((resp, rIdx) => (
                          <div key={rIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={resp}
                              onChange={(e) => {
                                const next = [...localData.experience];
                                next[jIdx].responsibilities[rIdx] = e.target.value;
                                setLocalData({ ...localData, experience: next });
                              }}
                              className="flex-1 px-2.5 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                            />
                            <button
                              onClick={() => {
                                const next = [...localData.experience];
                                next[jIdx].responsibilities.splice(rIdx, 1);
                                setLocalData({ ...localData, experience: next });
                              }}
                              className="text-slate-400 hover:text-rose-600 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EXPERTISE (17 ITEMS) */}
          {activeTab === 'expertise' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Accounting & Finance Expertise Cards ({localData.expertise.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add, edit, or categorize your accounting competencies.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newItem: ExpertiseItem = {
                      id: 'exp-' + Date.now(),
                      title: 'New Competency',
                      category: 'accounting',
                      description: 'Operational practice description.',
                    };
                    const updated = {
                      ...localData,
                      expertise: [...localData.expertise, newItem],
                    };
                    setLocalData(updated);
                    onUpdateData(() => updated);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Competency</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {localData.expertise.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const next = [...localData.expertise];
                          next[idx].title = e.target.value;
                          setLocalData({ ...localData, expertise: next });
                        }}
                        className="font-bold text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex-1"
                      />
                      <select
                        value={item.category}
                        onChange={(e) => {
                          const next = [...localData.expertise];
                          next[idx].category = e.target.value as any;
                          setLocalData({ ...localData, expertise: next });
                        }}
                        className="text-[11px] px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      >
                        <option value="accounting">Accounting</option>
                        <option value="finance">Finance</option>
                        <option value="reconciliation">Reconciliation</option>
                        <option value="compliance">Compliance</option>
                      </select>
                      <button
                        onClick={() => {
                          const updated = {
                            ...localData,
                            expertise: localData.expertise.filter((x) => x.id !== item.id),
                          };
                          setLocalData(updated);
                          onUpdateData(() => updated);
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.description || ''}
                      onChange={(e) => {
                        const next = [...localData.expertise];
                        next[idx].description = e.target.value;
                        setLocalData({ ...localData, expertise: next });
                      }}
                      placeholder="Brief description..."
                      className="w-full text-[11px] px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Skill Categories & Badges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localData.skills.map((cat, cIdx) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {cat.categoryName}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        >
                          <span>{s}</span>
                          <button
                            onClick={() => {
                              const next = [...localData.skills];
                              next[cIdx].skills.splice(sIdx, 1);
                              setLocalData({ ...localData, skills: next });
                            }}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Add skill..."
                        id={`add-skill-${cIdx}`}
                        className="flex-1 px-2.5 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val) {
                              const next = [...localData.skills];
                              next[cIdx].skills.push(val);
                              setLocalData({ ...localData, skills: next });
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ERP & SOFTWARE */}
          {activeTab === 'software' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    ERP & Software Systems
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage software tool cards (Oracle, QuickBooks, SMACC, Delta Financial, Excel, Office).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {localData.software.map((sw, idx) => (
                  <div
                    key={sw.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Software Name</label>
                        <input
                          type="text"
                          value={sw.name}
                          onChange={(e) => {
                            const next = [...localData.software];
                            next[idx].name = e.target.value;
                            setLocalData({ ...localData, software: next });
                          }}
                          className="w-full text-xs font-bold px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Category</label>
                        <input
                          type="text"
                          value={sw.category}
                          onChange={(e) => {
                            const next = [...localData.software];
                            next[idx].category = e.target.value;
                            setLocalData({ ...localData, software: next });
                          }}
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                      <textarea
                        rows={2}
                        value={sw.description}
                        onChange={(e) => {
                          const next = [...localData.software];
                          next[idx].description = e.target.value;
                          setLocalData({ ...localData, software: next });
                        }}
                        className="w-full text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Education Background
                </h3>
                <p className="text-xs text-slate-500">
                  MBA & BBA degrees. (Institutions remain blank unless you choose to specify them).
                </p>
              </div>

              <div className="space-y-4">
                {localData.education.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const next = [...localData.education];
                            next[idx].degree = e.target.value;
                            setLocalData({ ...localData, education: next });
                          }}
                          className="w-full text-xs font-bold px-2 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Specialization</label>
                        <input
                          type="text"
                          value={edu.specialization}
                          onChange={(e) => {
                            const next = [...localData.education];
                            next[idx].specialization = e.target.value;
                            setLocalData({ ...localData, education: next });
                          }}
                          className="w-full text-xs px-2 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Period</label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={(e) => {
                            const next = [...localData.education];
                            next[idx].period = e.target.value;
                            setLocalData({ ...localData, education: next });
                          }}
                          className="w-full text-xs px-2 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Institution (Optional)</label>
                        <input
                          type="text"
                          placeholder="Leave blank or specify..."
                          value={edu.institution || ''}
                          onChange={(e) => {
                            const next = [...localData.education];
                            next[idx].institution = e.target.value;
                            setLocalData({ ...localData, education: next });
                          }}
                          className="w-full text-xs px-2 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: LANGUAGES */}
          {activeTab === 'languages' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Spoken & Written Languages
              </h3>
              <div className="space-y-3">
                {localData.languages.map((lang, idx) => (
                  <div
                    key={lang.id}
                    className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3"
                  >
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => {
                        const next = [...localData.languages];
                        next[idx].name = e.target.value;
                        setLocalData({ ...localData, languages: next });
                      }}
                      className="font-bold text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 w-32"
                    />
                    <input
                      type="text"
                      value={lang.notes || ''}
                      onChange={(e) => {
                        const next = [...localData.languages];
                        next[idx].notes = e.target.value;
                        setLocalData({ ...localData, languages: next });
                      }}
                      placeholder="Notes / Proficiency..."
                      className="text-xs px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: VISIBILITY TOGGLES */}
          {activeTab === 'visibility' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Section Visibility Controls
                </h3>
                <p className="text-xs text-slate-500">
                  Toggle any section on or off on the public website.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
                {Object.entries(localData.settings.sectionVisibility).map(([key, isVisible]) => (
                  <div key={key} className="py-2.5 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 capitalize">
                      {key} Section
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={(e) => {
                          const updated = {
                            ...localData,
                            settings: {
                              ...localData.settings,
                              sectionVisibility: {
                                ...localData.settings.sectionVisibility,
                                [key]: e.target.checked,
                              },
                            },
                          };
                          setLocalData(updated);
                          onUpdateData(() => updated);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: INBOX / CONTACT FORM SUBMISSIONS */}
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Contact Inquiries Inbox ({messages.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Messages submitted through the public contact form stored in your browser storage.
                  </p>
                </div>

                {messages.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Clear all messages from the inbox?')) {
                        onClearMessages();
                      }
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 hover:bg-rose-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Inbox</span>
                  </button>
                )}
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
                  No inquiries received yet. When visitors fill in the contact form, messages appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {msg.name}
                          </span>
                          <span className="text-slate-400">•</span>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            {msg.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-slate-400">
                            {new Date(msg.createdAt).toLocaleString()}
                          </span>
                          <button
                            onClick={() => onDeleteMessage(msg.id)}
                            className="text-slate-400 hover:text-rose-600"
                            title="Delete Message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {msg.subject && (
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Subject: {msg.subject}
                        </div>
                      )}

                      <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Backup, Restore & Reset
                </h3>
                <p className="text-xs text-slate-500">
                  Export your website configuration as JSON, import previous backups, or restore original CV information.
                </p>
              </div>

              {/* Export Block */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Export Website Data (JSON)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Download a complete JSON snapshot of all profile content, jobs, skills, and settings.
                  </p>
                </div>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup</span>
                </button>
              </div>

              {/* Import Block */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Import Backup Data (JSON)
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Upload a previously exported JSON file to restore all website content.
                    </p>
                  </div>
                  <input
                    type="file"
                    ref={importFileRef}
                    onChange={handleImportFile}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={() => importFileRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-xs whitespace-nowrap"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Select JSON File</span>
                  </button>
                </div>

                {importSuccess && (
                  <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Backup restored successfully!</span>
                  </div>
                )}

                {importError && (
                  <div className="p-2.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{importError}</span>
                  </div>
                )}
              </div>

              {/* Reset to Default Block */}
              <div className="p-5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200">
                    Reset to Default Data
                  </h4>
                  <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-0.5">
                    Restores the original authentic CV details of Muhammad Salman provided in the specification.
                  </p>
                </div>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Default</span>
                </button>
              </div>

              {/* Confirmation Modal */}
              {showResetConfirm && (
                <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
                  <div className="max-w-md w-full bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                    <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
                      <AlertTriangle className="w-6 h-6" />
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Confirm Reset to Default?
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      This will reset all edits, customized experience notes, and photo uploads back to Muhammad Salman's pristine default CV information. Are you sure you want to proceed?
                    </p>
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          onResetData();
                          setLocalData(storageService.getAppData());
                          setShowResetConfirm(false);
                          setSaveStatus('Data reset to default.');
                          setTimeout(() => setSaveStatus(null), 3000);
                        }}
                        className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white"
                      >
                        Yes, Reset Everything
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
