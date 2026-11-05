import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastNotice {
  message: string;
  type: ToastType;
}

interface ToastRegionProps {
  toast: ToastNotice | null;
  onDismiss: () => void;
}

export function ToastRegion({ toast, onDismiss }: ToastRegionProps) {
  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(onDismiss, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [toast, onDismiss]);

  return (
    <div id="toasts" aria-live="polite" aria-atomic="true">
      {toast && (
        <div
          className={`toast toast--${toast.type}`}
          role={toast.type === 'error' ? 'alert' : 'status'}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
