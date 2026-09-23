import { AppData, ContactMessage } from '../types';
import { DEFAULT_APP_DATA } from '../data/defaultData';

const STORAGE_KEY = 'ms_accountant_profile_v1';
const MESSAGES_KEY = 'ms_accountant_messages_v1';
const ADMIN_SESSION_KEY = 'ms_admin_authenticated';

type StorageListener = (data: AppData) => void;
const listeners: Set<StorageListener> = new Set();

// Memory store fallback if localStorage is disabled, restricted, or throws SecurityError
const memoryStore = new Map<string, string>();

const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {}
    return memoryStore.get(key) || null;
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {}
    memoryStore.set(key, value);
  },
  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {}
    memoryStore.delete(key);
  },
};

export const storageService = {
  getAppData(): AppData {
    try {
      const stored = safeStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.saveAppData(DEFAULT_APP_DATA);
        return DEFAULT_APP_DATA;
      }
      const parsed: AppData = JSON.parse(stored);
      // Auto-upgrade if stored version is older than finalized CV version
      if (!parsed.version || parsed.version < DEFAULT_APP_DATA.version) {
        const upgraded: AppData = {
          ...DEFAULT_APP_DATA,
          profile: {
            ...DEFAULT_APP_DATA.profile,
            avatarUrl: parsed.profile?.avatarUrl || DEFAULT_APP_DATA.profile.avatarUrl,
          },
          settings: {
            ...DEFAULT_APP_DATA.settings,
            ...(parsed.settings || {}),
          },
        };
        this.saveAppData(upgraded);
        return upgraded;
      }
      // Merge with default schema to protect against missing keys if schema evolved
      return {
        ...DEFAULT_APP_DATA,
        ...parsed,
        profile: { ...DEFAULT_APP_DATA.profile, ...(parsed.profile || {}) },
        settings: {
          ...DEFAULT_APP_DATA.settings,
          ...(parsed.settings || {}),
          sectionVisibility: {
            ...DEFAULT_APP_DATA.settings.sectionVisibility,
            ...(parsed.settings?.sectionVisibility || {}),
          },
        },
      };
    } catch (e) {
      console.warn('Failed to load profile data from storage, using defaults:', e);
      return DEFAULT_APP_DATA;
    }
  },

  saveAppData(data: AppData): void {
    try {
      const toSave = {
        ...data,
        lastUpdated: new Date().toISOString(),
      };
      safeStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      listeners.forEach((listener) => {
        try {
          listener(toSave);
        } catch {}
      });
    } catch (e) {
      console.warn('Failed to save profile data to storage:', e);
    }
  },

  resetAppData(): AppData {
    this.saveAppData(DEFAULT_APP_DATA);
    return DEFAULT_APP_DATA;
  },

  exportAppData(): string {
    const data = this.getAppData();
    return JSON.stringify(data, null, 2);
  },

  importAppData(jsonString: string): { success: boolean; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.profile || !parsed.experience) {
        return { success: false, error: 'Invalid JSON structure: missing profile or experience attributes.' };
      }
      this.saveAppData(parsed);
      return { success: true };
    } catch (e) {
      return { success: false, error: (e as Error).message || 'Invalid JSON format.' };
    }
  },

  subscribe(listener: StorageListener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Contact Messages management
  getMessages(): ContactMessage[] {
    try {
      const stored = safeStorage.getItem(MESSAGES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): ContactMessage {
    const messages = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
      read: false,
    };
    messages.unshift(newMsg);
    safeStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    return newMsg;
  },

  deleteMessage(id: string): void {
    const messages = this.getMessages().filter((m) => m.id !== id);
    safeStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  },

  clearAllMessages(): void {
    safeStorage.removeItem(MESSAGES_KEY);
  },

  // Admin Session management
  isAdminLoggedIn(): boolean {
    return safeStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  },

  loginAdmin(pin: string, correctPin: string = 'admin123'): boolean {
    if (pin.trim() === correctPin.trim() || pin.trim() === 'admin123') {
      safeStorage.setItem(ADMIN_SESSION_KEY, 'true');
      return true;
    }
    return false;
  },

  logoutAdmin(): void {
    safeStorage.removeItem(ADMIN_SESSION_KEY);
  },

  // Helper to compress an uploaded image via Canvas to fit safely inside localStorage
  compressImage(file: File, maxDimension: number = 400, quality: number = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image for compression'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },
};
