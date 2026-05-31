'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { Button } from './Button';
import { useDialogAccessibility } from './dialog.shared';
import { ActionRow } from './ActionRow';

export function Drawer({
  open,
  title,
  description,
  onClose,
  footer,
  closeLabel = 'Cerrar',
  children,
}: Readonly<{ open: boolean; title: string; description?: ReactNode; onClose: () => void; footer?: ReactNode; closeLabel?: string; children: ReactNode }>) {
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
          <div className="ds-dialog-heading">
            <h2>{title}</h2>
            {description ? <p>{description}</p> : null}
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} aria-label={`${closeLabel} ${title}`}>
            {closeLabel}
          </Button>
        </div>
        <div className="ds-dialog-body">{children}</div>
        {footer ? <ActionRow className="ds-dialog-footer" justify="end">{footer}</ActionRow> : null}
      </aside>
    </div>
  );
}

export const SidePanel = Drawer;
