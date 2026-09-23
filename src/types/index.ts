export type ThemeMode = 'light' | 'dark' | 'system';

export interface ProfileInfo {
  fullName: string;
  professionalTitle: string;
  location: string;
  email: string;
  primaryPhone: string;
  altPhone: string;
  drivingLicense?: string;
  avatarUrl?: string; // base64 or empty
  summary: string;
  heroIntro: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  category: 'accounting' | 'finance' | 'reconciliation' | 'compliance';
  description?: string;
}

export interface WorkExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  responsibilities: string[];
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface SoftwareItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  specialization: string;
  period: string;
  institution?: string; // intentionally optional/blank if not provided
}

export interface LanguageItem {
  id: string;
  name: string;
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  highlights: boolean;
  expertise: boolean;
  experience: boolean;
  skills: boolean;
  software: boolean;
  education: boolean;
  languages: boolean;
  cv: boolean;
  contact: boolean;
}

export interface AppSettings {
  theme: ThemeMode;
  sectionVisibility: SectionVisibility;
  adminPin?: string;
}

export interface AppData {
  version: number;
  lastUpdated: string;
  profile: ProfileInfo;
  highlights: HighlightItem[];
  expertise: ExpertiseItem[];
  experience: WorkExperienceItem[];
  skills: SkillCategory[];
  software: SoftwareItem[];
  education: EducationItem[];
  languages: LanguageItem[];
  settings: AppSettings;
}
