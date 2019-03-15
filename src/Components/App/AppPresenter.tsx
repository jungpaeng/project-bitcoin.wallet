import React from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  background-color: #fafafa;
  min-height: 100vh;
`;

const AppPresenter = () => (
  <AppContainer>
    <p>Hello, World</p>
  </AppContainer>
);

export default AppPresenter;
