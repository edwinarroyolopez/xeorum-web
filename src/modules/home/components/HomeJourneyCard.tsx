import React from 'react';

export function HomeJourneyCard({ step, title, body }: Readonly<{ step: string; title: string; body: string }>) {
  return (
    <article className="home-journey-card">
      <p>{step}</p>
      <h3>{title}</h3>
      <span>{body}</span>
    </article>
  );
}
