import styled from 'styled-components';

const QuizCard = styled.div`
  background: #110F0D;
  height: 36px;
  width: 283px;
  left: 0px;
  top: 0px;
  border-radius: 4px;

  display: flex;
  align-items: center;

  margin-bottom: 1.5rem;
`;

QuizCard.QuizUrl = styled.div`
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0 .9375rem;
  padding: 0;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.contrastText};
  }
`;

export default QuizCard;
