import styled from 'styled-components';

const QuizButton = styled.button`
  height: 36px;
  width: 283px;
  left: 0px;
  top: 0px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #1c1814;

  border: none;
`;

export default QuizButton;
