import React from 'react';

export function HomeQuestionCard({ id, title, options }: Readonly<{ id: string; title: string; options: readonly string[] }>) {
  return (
    <article className="home-question-card">
      <div className="home-question-header">
        <h3>{title}</h3>
        <span>{id}</span>
      </div>
      <div className="home-question-options">
        {options.map((option) => <span key={option}>{option}</span>)}
      </div>
    </article>
  );
}
