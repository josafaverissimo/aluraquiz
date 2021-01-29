import React from 'react';
import PropTypes from 'prop-types';
import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import QuizButton from '../src/components/QuizButton';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  length, questionNumber, image, title, description, alternatives, onSubmit,
}) {
  const questionId = `question__${questionNumber}`;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionNumber + 1} de ${length}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descricao"
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        src={image}
      />
      <Widget.Content>
        <h2>{title}</h2>
        <p>{description}</p>

        <form onSubmit={(event) => {
          event.preventDefault();

          onSubmit();
        }}
        >
          {alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;

            return (
              <Widget.Topic as="label">
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                />

                {alternative}
              </Widget.Topic>
            );
          })}

          <QuizButton>Confimar</QuizButton>
        </form>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const question = db.questions[currentQuestion];
  const questionsLength = db.questions.length;

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleQuizSubmit() {
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questionsLength) setCurrentQuestion(currentQuestion + 1);
    else setScreenState(screenStates.RESULT);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          questionNumber={currentQuestion}
          length={questionsLength}
          image={question.image}
          title={question.title}
          description={question.description}
          alternatives={question.alternatives}
          onSubmit={handleQuizSubmit}
        />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}

QuestionWidget.propTypes = {
  length: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
};
