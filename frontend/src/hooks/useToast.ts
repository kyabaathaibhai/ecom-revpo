import { useCallback } from 'react';
import toast from 'react-hot-toast';

interface ToastOptions {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useToast = () => {
  const showToast = useCallback(({ title, message, type }: ToastOptions) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast(message);
        break;
      default:
        toast(message);
    }
  }, []);

  return { showToast };
}; 