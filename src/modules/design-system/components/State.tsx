import React from 'react';
import type { ReactNode } from 'react';
import { ActionRow } from './ActionRow';
import { Text } from '../primitives/Text';
import styles from './State.module.css';
import { cn } from '../../../lib/ui/cn';

type StateProps = {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  variant?: 'default' | 'panel';
  tone?: 'default' | 'danger';
};

function BaseState({ title, description, action, children, variant = 'default', tone = 'default' }: Readonly<StateProps>) {
  return (
    <div className={cn(styles.state, 'ds-state', variantClass[variant], `ds-state-${variant}`, toneClass[tone], `ds-state-tone-${tone}`)} role={tone === 'danger' ? 'alert' : 'status'}>
      {title ? <strong className={cn(styles.title, 'ds-state-title')}>{title}</strong> : null}
      {description ? <Text tone="secondary">{description}</Text> : null}
      {children && !description ? <Text tone="secondary">{children}</Text> : children && description ? children : null}
      {action ? <ActionRow className={cn(styles.actions, 'ds-state-actions')}>{action}</ActionRow> : null}
    </div>
  );
}

const variantClass = {
  default: styles.default,
  panel: styles.panel,
};

const toneClass = {
  default: styles.default,
  danger: styles.toneDanger,
};

export function LoadingState(props: Readonly<StateProps>) {
  return <BaseState title={props.title ?? 'Cargando'} description={props.description ?? props.children} {...(props.action ? { action: props.action } : {})} {...(props.variant ? { variant: props.variant } : {})} {...(props.tone ? { tone: props.tone } : {})} />;
}

export function ErrorState(props: Readonly<StateProps>) {
  return <BaseState title={props.title ?? 'No disponible'} description={props.description ?? props.children} {...(props.action ? { action: props.action } : {})} {...(props.variant ? { variant: props.variant } : {})} tone={props.tone ?? 'danger'} />;
}

export function EmptyState(props: Readonly<StateProps>) {
  return <BaseState title={props.title ?? 'Sin resultados'} description={props.description ?? props.children} {...(props.action ? { action: props.action } : {})} variant={props.variant ?? 'panel'} {...(props.tone ? { tone: props.tone } : {})} />;
}
