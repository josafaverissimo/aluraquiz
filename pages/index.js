import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizzesCards from '../src/components/QuizzesCards';
import QuizInput from '../src/components/QuizInput';
import QuizButton from '../src/components/QuizButton';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  const handlerQuizInput = (event) => {
    setName(event.target.value);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura quiz - Xadrez</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Xadrez</h1>
          </Widget.Header>

          <Widget.Content>
            <p>
              Teste os seus conhecimentos sobre Xadrez e tente dar xeque-mate neste quiz.
            </p>

            <form onSubmit={function (e) {
              e.preventDefault();

              router.push(`/quiz?nome=${name}`);
            }}
            >
              <QuizInput
                onChange={handlerQuizInput}
                name="name"
                placeholder="Digita seu nome aí ;)"
                autoComplete="off"
              />

              <QuizButton type="submit" disabled={name.length === 0}>
                Xeque!
              </QuizButton>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão React 2.0 fez:</p>

            <QuizzesCards quizzes={db.quizzes} />
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/josafaverissimo" />
    </QuizBackground>
  );
}
