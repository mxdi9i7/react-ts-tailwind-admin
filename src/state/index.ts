import { createState } from '@hookstate/core';

export const globalAuthToken = createState<string | null>(null);

export const globalNotifications = createState<{
  show: boolean;
  title: string;
  description?: string;
  duration?: number;
  type: 'error' | 'success' | 'warning';
}>({
  show: false,
  title: '',
  description: '',
  duration: 0,
  type: 'success',
});

export const globalSidebarOpen = createState<boolean>(false);
