import React from 'react';
import { HomeIcon } from './HomeIcon';

export function HomeChecklistPanel({ kicker, title, description, items }: Readonly<{ kicker: string; title: string; description: string; items: readonly string[] }>) {
  return (
    <div className="home-checklist-panel">
      <p className="home-kicker home-kicker-with-icon"><HomeIcon name="shield" color="#d8b76b" />{kicker}</p>
      <h2 className="home-section-title">{title}</h2>
      <p className="home-panel-copy">{description}</p>
      <div className="home-checklist-items">
        {items.map((item) => (
          <div key={item} className="home-checklist-item">
            <span className="home-identity-check">
              <HomeIcon name="check" color="black" />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
