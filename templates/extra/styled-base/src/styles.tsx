import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Logo = styled.img`
height: 6em;
padding: 1.5em;
will-change: filter;
transition: filter 300ms;
&:hover{
  filter: drop-shadow(0 0 2em #646cffaa);
}
`;

export const React = styled(Logo)`
&:hover{
  filter: drop-shadow(0 0 2em #61dafbaa);
  animation: ${rotate} 3s linear infinite;
}
`;

export const Trybe = styled(Logo)`
&:hover{
  filter: drop-shadow(0 0 2em #78d691aa);
  animation: ${rotate} 3s linear infinite;
}
`;

export const Card = styled.div`
padding: 2em;
`;

export const Docs = styled.p`
color: #888;
`;
