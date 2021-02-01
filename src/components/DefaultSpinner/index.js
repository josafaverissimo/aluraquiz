/* eslint-disable no-tabs */
import React from 'react';
import styled from 'styled-components';
import Checked from '../../icons/checked.svg';

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

    stroke-dasharray: 2350;
    stroke-dashoffset: 2350;
    animation: animate-checked 3s ease-out forwards;
  }
/* 4700 */
  @keyframes animate-checked {
    0% {
      stroke-dashoffset: 2350;
    }
    40% {
      stroke-dashoffset: 1175;
    }
    80% {
      stroke-dashoffset: 0;
      fill: transparent;
    }
    100% {
      stroke-dashoffset: 0;
      fill: ${({ theme }) => `${theme.colors.secondary}`};
    }
  }
`;

export default function DefaultSpinner() {
  console.log(`> Secondary color theme: ${({ theme }) => `${theme.colors.secondary}`}`);
  return (
    <Center>
      <StyledSvg>
        <Checked viewBox="-15 -15 532 532" />
      </StyledSvg>
    </Center>
  );
}
