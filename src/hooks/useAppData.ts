import { useState, useEffect, useCallback } from 'react';
import { AppData, ContactMessage } from '../types';
import { storageService } from '../services/storageService';

export function useAppData() {
  const [data, setData] = useState<AppData>(() => storageService.getAppData());
  const [messages, setMessages] = useState<ContactMessage[]>(() => storageService.getMessages());

  useEffect(() => {
    // Subscribe to external/cross-component updates
    const unsubscribe = storageService.subscribe((updated) => {
      setData(updated);
    });
    return () => unsubscribe();
  }, []);

  const updateData = useCallback((updater: (prev: AppData) => AppData) => {
    setData((prev) => {
      const next = updater(prev);
      storageService.saveAppData(next);
      return next;
    });
  }, []);

  const resetData = useCallback(() => {
    const defaultData = storageService.resetAppData();
    setData(defaultData);
  }, []);

  const refreshMessages = useCallback(() => {
    setMessages(storageService.getMessages());
  }, []);

  const addContactMessage = useCallback((msg: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const created = storageService.saveMessage(msg);
    setMessages((prev) => [created, ...prev]);
    return created;
  }, []);

  const deleteContactMessage = useCallback((id: string) => {
    storageService.deleteMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const clearContactMessages = useCallback(() => {
    storageService.clearAllMessages();
    setMessages([]);
  }, []);

  return {
    data,
    updateData,
    resetData,
    messages,
    refreshMessages,
    addContactMessage,
    deleteContactMessage,
    clearContactMessages,
  };
}
