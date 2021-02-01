import React from 'react';
import { questions, bg } from '../../db.json';
import QuizScreen from '../../src/screens/Quiz';
import Widget from '../../src/components/Widget';
import HorseSpinner from '../../src/components/HorseSpinner';

function LoadingWidget() {
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
        Preparando o tabuleiro...
      </Widget.Header>

      <Widget.Content>
        <p style={{
          textAlign: 'center',
          visibility: messageVisibility,
        }}
        >
          {message}
        </p>
        <HorseSpinner />
      </Widget.Content>
    </Widget>
  );
}

export default function QuizPage() {
  return (<QuizScreen questions={questions} bg={bg} Loading={LoadingWidget} />);
}
