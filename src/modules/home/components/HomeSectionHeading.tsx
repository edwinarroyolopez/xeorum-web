import React from 'react';

export function HomeSectionHeading({
  kicker,
  title,
  description,
  action,
}: Readonly<{
  kicker: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}>) {
  return (
    <div className="home-section-heading">
      <div>
        <p className="home-kicker">{kicker}</p>
        <h2 className="home-section-title">{title}</h2>
      </div>
      {description ? <p className="home-section-description">{description}</p> : null}
      {action ? <div className="home-section-action">{action}</div> : null}
    </div>
  );
}
