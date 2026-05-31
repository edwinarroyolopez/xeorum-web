import React from 'react';
import { homeQuestions } from '../services/home.content';
import { HomeQuestionCard } from './HomeQuestionCard';

export function HomeRitualPreview() {
  return (
    <div className="home-ritual-panel">
      <p className="home-kicker">Ritual breve</p>
      <h2 className="home-section-title">El test no interrumpe la venta. Afina la lectura.</h2>
      <p className="home-panel-copy">La experiencia permite comprar ahora. Cuando el cliente busca profundidad, el test transforma deseo, estetica y conducta en una ruta util de producto.</p>
      <div className="home-questions-list">
        {homeQuestions.map((question) => <HomeQuestionCard key={question.id} id={question.id} title={question.title} options={question.options} />)}
      </div>
    </div>
  );
}
