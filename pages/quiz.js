import React from 'react';
import PropTypes from 'prop-types';
import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import QuizButton from '../src/components/QuizButton';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>

        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              {
                `#${(index + 1).toString().padStart(2, '0')} Resultado: ${result ? 'acertou' : 'errou'}`
              }
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

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
  length, questionNumber, image, title, description, alternatives, onSubmit, answer, addResult,
}) {
  const questionId = `question__${questionNumber}`;

  const [selectedAlternativeIndex, setSelectedAlternativeIndex] = React.useState(undefined);
  const isCorrect = selectedAlternativeIndex === answer;

  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const [alternativeIdChecked, setAlternativeIdChecked] = React.useState('');

  const [alternativeCorrect, setAlternativeCorrect] = React.useState('');
  const [isWrongActive, setIsWrongActive] = React.useState(false);

  const hasAlternativeSelected = selectedAlternativeIndex !== undefined;

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

          setAlternativeCorrect(`alternative__${answer}`);
          setIsWrongActive(true);

          onSubmit();

          setIsQuestionSubmited(true);

          addResult(isCorrect);

          setTimeout(() => {
            setAlternativeCorrect('');
            setIsWrongActive(false);
            setIsQuestionSubmited(false);
            setSelectedAlternativeIndex(undefined);
            setAlternativeIdChecked('');
          }, 3 * 1000);
        }}
        >
          {alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                isCorrect={alternativeCorrect === alternativeId}
                isWrong={isWrongActive && alternativeCorrect !== alternativeId}
                isChecked={alternativeIdChecked === alternativeId}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  onChange={() => {
                    setAlternativeIdChecked(alternativeId);
                    setSelectedAlternativeIndex(alternativeIndex);
                  }}
                  value={alternativeIndex}
                  checked={false}
                  type="radio"
                />

                {alternative}
              </Widget.Topic>
            );
          })}

          <QuizButton disabled={!hasAlternativeSelected}>
            Confimar
          </QuizButton>
          {isCorrect && isQuestionSubmited && (
          <p>
            Parabéns, Você acertou.
          </p>
          )}

          {!isCorrect && isQuestionSubmited && (
          <p>
            Você errou.
          </p>
          )}

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
  const [screenState, setScreenState] = React.useState(screenStates.QUIZ);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const question = db.questions[currentQuestion];
  const questionsLength = db.questions.length;

  function addResult(result) {
    setResults([...results, result]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleQuizSubmit() {
    const nextQuestion = currentQuestion + 1;

    setTimeout(() => {
      if (nextQuestion < questionsLength) setCurrentQuestion(currentQuestion + 1);
      else setScreenState(screenStates.RESULT);
    }, 3 * 1000);
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
          answer={question.answer}
          onSubmit={handleQuizSubmit}
          addResult={addResult}
        />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
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
  answer: PropTypes.number.isRequired,
  addResult: PropTypes.func.isRequired,
};

ResultWidget.propTypes = {
  results: PropTypes.arrayOf(PropTypes.bool).isRequired,
};
