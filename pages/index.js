import React from 'react';
import styled from 'styled-components';
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

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

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
              Teste os seus conhecimentos sobre Xadrez
              e divirta-se criando o seu AluraQuiz!
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
              />

              <QuizButton type="submit" disabled={name.length === 0}>
                Jogar
                {name}
              </QuizButton>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão Alguma coisa fez:</p>

            <QuizzesCards quizzes={db.quizzes} />
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/josafaverissimo" />
    </QuizBackground>
  );
}
