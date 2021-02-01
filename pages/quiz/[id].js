import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen questions={externalDb.questions} bg={externalDb.bg} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const externalDb = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((response) => {
      if (response.ok) { return response.json(); }

      throw new Error('Falha ao pegar os dados');
    })
    .then((response) => response);

  return {
    props: {
      externalDb,
    },
  };
}
