import React from 'react';
import QuizCard from '../QuizCard';

export default function QuizzesCards({ quizzes }) {
  return quizzes.map((quiz) => (
    <QuizCard key={quiz.slug}>
      <QuizCard.QuizUrl>
        <a href={quiz.url}>{quiz.slug}</a>
      </QuizCard.QuizUrl>
    </QuizCard>
  ));
}
