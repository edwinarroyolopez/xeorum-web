import React from 'react';
import type { ReactNode } from 'react';
import { Text } from '../primitives/Text';

type StateProps = {
  children: ReactNode;
};

function BaseState({ children }: StateProps) {
  return (
    <Text as="p" tone="secondary" className="ds-state" role="status">
      {children}
    </Text>
  );
}

export function LoadingState({ children }: StateProps) {
  return <BaseState>{children}</BaseState>;
}

export function ErrorState({ children }: StateProps) {
  return <BaseState>{children}</BaseState>;
}

export function EmptyState({ children }: StateProps) {
  return <BaseState>{children}</BaseState>;
}
