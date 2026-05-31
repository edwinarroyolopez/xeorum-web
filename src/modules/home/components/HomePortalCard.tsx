import React from 'react';
import { HomeIcon } from './HomeIcon';

export function HomePortalCard({ name, title, body, note }: Readonly<{ name: string; title: string; body: string; note: string }>) {
  return (
    <article className="home-portal-card">
      <div className="home-portal-icon">
        <HomeIcon name="crown" color="#d8b76b" />
      </div>
      <p className="home-kicker">{name}</p>
      <h3>{title}</h3>
      <span>{body}</span>
      <small>{note}</small>
    </article>
  );
}
