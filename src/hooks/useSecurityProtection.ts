import { useEffect } from 'react';

interface SecurityProtectionOptions {
  enableContextMenuProtection?: boolean;
  enableDevToolsBlocker?: boolean;
  enableImageDragProtection?: boolean;
  onSecurityAlert?: (msg: string) => void;
}

export function useSecurityProtection({
  enableContextMenuProtection = true,
  enableDevToolsBlocker = true,
  enableImageDragProtection = true,
  onSecurityAlert,
}: SecurityProtectionOptions = {}) {
  useEffect(() => {
    // 1. Context menu protection (Right click)
    const handleContextMenu = (e: MouseEvent) => {
      if (enableContextMenuProtection) {
        // Prevent default context menu
        e.preventDefault();
        if (onSecurityAlert) {
          onSecurityAlert('محتوى الملف الشخصي محمي ضد النسخ غير المصرح به');
        }
      }
    };

    // 2. Prevent Keyboard shortcuts used for DevTools, Save Page, View Source
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enableDevToolsBlocker) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        if (onSecurityAlert) onSecurityAlert('محاولة فتح أدوات التطوير (DevTools) محجوبة للحماية');
        return;
      }

      // Ctrl+Shift+I or Cmd+Alt+I (Inspect Element)
      if (ctrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
        if (onSecurityAlert) onSecurityAlert('محاولة فحص الصفحة (Inspect) محجوبة للحماية');
        return;
      }

      // Ctrl+Shift+J or Cmd+Alt+J (Console)
      if (ctrlOrCmd && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        if (onSecurityAlert) onSecurityAlert('محاولة فتح لوحة البرمجة (Console) محجوبة للحماية');
        return;
      }

      // Ctrl+U or Cmd+U (View Source)
      if (ctrlOrCmd && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        if (onSecurityAlert) onSecurityAlert('عرض كود المصدر (View Source) محجوب للحماية');
        return;
      }

      // Ctrl+S or Cmd+S (Save Webpage)
      if (ctrlOrCmd && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        if (onSecurityAlert) onSecurityAlert('حفظ الصفحة محجوب للحماية');
        return;
      }
    };

    // 3. Prevent dragging images off the screen
    const handleDragStart = (e: DragEvent) => {
      if (enableImageDragProtection && e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    // Attach event listeners
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dragstart', handleDragStart);
    };
  }, [enableContextMenuProtection, enableDevToolsBlocker, enableImageDragProtection, onSecurityAlert]);
}
