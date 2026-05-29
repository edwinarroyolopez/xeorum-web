import type { Drop } from './drops.types';
import { DropCard as DSDropCard } from '../design-system';

export function DropCard({ drop }: Readonly<{ drop: Drop }>) {
  return <DSDropCard drop={drop} />;
}
