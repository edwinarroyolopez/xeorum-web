'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { Button } from './Button';
import { useDialogAccessibility } from './dialog.shared';
import { ActionRow } from './ActionRow';
import styles from './Modal.module.css';
import { cn } from '../../../lib/ui/cn';

export function Modal({
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
    <div className={cn(styles.backdrop, 'ds-dialog-backdrop')} onClick={onClose}>
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className={cn(styles.modal, 'ds-modal')}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={cn(styles.header, 'ds-dialog-header')}>
          <div className={cn(styles.heading, 'ds-dialog-heading')}>
            <h2>{title}</h2>
            {description ? <p>{description}</p> : null}
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} aria-label={`${closeLabel} ${title}`}>
            {closeLabel}
          </Button>
        </div>
        <div className={cn(styles.body, 'ds-dialog-body')}>{children}</div>
        {footer ? <ActionRow className={cn(styles.footer, 'ds-dialog-footer')} justify="end">{footer}</ActionRow> : null}
      </div>
    </div>
  );
}
