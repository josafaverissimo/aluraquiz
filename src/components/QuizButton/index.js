import styled from 'styled-components';

const QuizButton = styled.button`
  height: 2.25rem;
  width: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};

  border: none;
`;

export default QuizButton;
