import styled from 'styled-components';

const QuizInput = styled.input`
  height: 38px;
  width: 281px;
  left: 1px;
  top: 1px;
  border-radius: 3.5px;
  background-color: #1c1814;
  color: ${({ theme }) => theme.colors.contrastText};
  padding: 0 .9375rem;
  border: .125rem solid ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1.5625rem;
`;

export default QuizInput;
