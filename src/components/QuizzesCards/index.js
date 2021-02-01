import React from 'react';
import Widget from '../Widget';
import Link from '../Link';

export default function QuizzesCards({ quizzes, active }) {
  return quizzes.map((quiz) => {
    const [projectName, githubUser] = quiz
      .replace(/\//g, '')
      .replace('https:', '')
      .replace('.vercel.app', '')
      .split('.');

    return (
      <Widget.Topic
        as={Link}
        key={`${githubUser}${projectName}`}
        href={`quiz/${projectName}___${githubUser}`}
        style={{ pointerEvents: active ? 'all' : 'none', opacity: active ? '1' : '.5' }}
      >
        {`${githubUser}/${projectName}`}
      </Widget.Topic>
    );
  });
}
