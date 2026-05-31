import React from 'react';
import type { ReactNode } from 'react';
import { ActionRow } from './ActionRow';
import { Text } from '../primitives/Text';

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
    <div className={`ds-state ds-state-${variant} ds-state-tone-${tone}`} role={tone === 'danger' ? 'alert' : 'status'}>
      {title ? <strong className="ds-state-title">{title}</strong> : null}
      {description ? <Text tone="secondary">{description}</Text> : null}
      {children && !description ? <Text tone="secondary">{children}</Text> : children && description ? children : null}
      {action ? <ActionRow className="ds-state-actions">{action}</ActionRow> : null}
    </div>
  );
}

export function LoadingState(props: Readonly<StateProps>) {
  return <BaseState title={props.title ?? 'Cargando'} description={props.description ?? props.children} {...(props.action ? { action: props.action } : {})} {...(props.variant ? { variant: props.variant } : {})} {...(props.tone ? { tone: props.tone } : {})} />;
}

export function ErrorState(props: Readonly<StateProps>) {
  return <BaseState title={props.title ?? 'No disponible'} description={props.description ?? props.children} {...(props.action ? { action: props.action } : {})} {...(props.variant ? { variant: props.variant } : {})} tone={props.tone ?? 'danger'} />;
}

export function EmptyState(props: Readonly<StateProps>) {
  return <BaseState title={props.title ?? 'Sin resultados'} description={props.description ?? props.children} {...(props.action ? { action: props.action } : {})} variant={props.variant ?? 'panel'} {...(props.tone ? { tone: props.tone } : {})} />;
}
