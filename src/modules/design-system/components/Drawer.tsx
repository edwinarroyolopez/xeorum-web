'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { Button } from './Button';
import { useDialogAccessibility } from './dialog.shared';

export function Drawer({
  open,
  title,
  onClose,
  children,
}: Readonly<{ open: boolean; title: string; onClose: () => void; children: ReactNode }>) {
  const containerRef = useDialogAccessibility(open, onClose);

  if (!open) {
    return null;
  }

  return (
    <div className="ds-dialog-backdrop" onClick={onClose}>
      <aside
        ref={containerRef}
        className="ds-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ds-dialog-header">
          <h2>{title}</h2>
          <Button type="button" variant="ghost" onClick={onClose} aria-label={`Close ${title}`}>
            Close
          </Button>
        </div>
        <div className="ds-dialog-body">{children}</div>
      </aside>
    </div>
  );
}
