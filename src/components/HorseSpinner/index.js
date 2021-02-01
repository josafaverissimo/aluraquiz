/* eslint-disable no-tabs */
import React from 'react';
import styled from 'styled-components';
import Horse from '../../icons/horse-chess-piece.svg';

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSvg = styled.div`
  width: 200px;

  path {
    fill: transparent;
    stroke-width: 5;
    stroke: ${({ theme }) => `${theme.colors.secondary}`};

    stroke-dasharray: 975;
    stroke-dashoffset: 0;
    animation: animate-horse 3s linear forwards;
  }

  @keyframes animate-horse {
    0% {
      stroke-dashoffset: 0;
    }
    40% {
      stroke-dashoffset: 975;
    }
    80% {
      stroke-dashoffset: 1950;
      fill: transparent;
    }
    100% {
      stroke-dashoffset: 1950;
      fill: ${({ theme }) => `${theme.colors.primary}`};
    }
  }
`;

export default function HorseSpinner() {
  return (
    <Center>
      <StyledSvg>
        <Horse viewBox="0 -10 223.687 313.687" />
      </StyledSvg>
    </Center>
  );
}
