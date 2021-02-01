import React from 'react';
import PropTypes from 'prop-types';

import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';
import QuizButton from '../../components/QuizButton';

import DefaultSpinner from '../../components/DefaultSpinner';
import GitHubCorner from '../../components/GitHubCorner';

import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultado
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

function LoadingWidget({ CustomLoading }) {
  if (CustomLoading) {
    return <CustomLoading />;
  }

  const message = 'Que comece os jogos!';
  const [messageVisibility, setMessageVisibility] = React.useState('collapse');

  React.useEffect(() => {
    setTimeout(() => {
      setMessageVisibility('visible');
    }, 3 * 1000);
  }, []);

  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <p style={{
          textAlign: 'center',
          visibility: messageVisibility,
        }}
        >
          {message}
        </p>
        <DefaultSpinner />
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
        <BackLinkArrow href="/" />

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

export default function QuizPage({ questions, bg, Loading }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const question = questions[currentQuestion];
  const questionsLength = questions.length;

  function addResult(result) {
    setResults([...results, result]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 3700);
  }, []);

  function handleQuizSubmit() {
    const nextQuestion = currentQuestion + 1;

    setTimeout(() => {
      if (nextQuestion < questionsLength) setCurrentQuestion(currentQuestion + 1);
      else setScreenState(screenStates.RESULT);
    }, 3 * 1000);
  }

  return (
    <QuizBackground backgroundImage={bg}>
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

        {screenState === screenStates.LOADING && <LoadingWidget CustomLoading={Loading} />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/josafaverissimo" />
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
