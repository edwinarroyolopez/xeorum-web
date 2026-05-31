import React from 'react';
import type { ComponentProps } from 'react';
import { HomeIcon } from './HomeIcon';

export function HomeDetailTile({ icon, title, body }: Readonly<{ icon: ComponentProps<typeof HomeIcon>['name']; title: string; body: string }>) {
  return (
    <article className="home-detail-tile">
      <div className="home-detail-icon">
        <HomeIcon name={icon} color="#d8b76b" />
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
