import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { ToastRegion } from '../shared/components/ToastRegion.js';
import type {
  ToastNotice,
  ToastType,
} from '../shared/components/ToastRegion.js';
import { ToastContext } from './toast-context.js';

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastNotice | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType): void => {
      setToast({ message, type });
    },
    [setToast],
  );

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  function dismissToast(): void {
    setToast(null);
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastRegion toast={toast} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}
