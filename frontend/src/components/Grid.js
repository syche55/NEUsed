import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 30px;
  margin: 70px;
`;

const Grid = props => {
  return <Container>{props.children}</Container>;
};

export default Grid;