import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import typography from '../../typography';
import AppPresenter from './AppPresenter';

const GlobalStyle = createGlobalStyle`
  ${reset};
  ${typography};
`;

class AppContainer extends Component {
  public render() {
    return (
      <>
        <GlobalStyle />
        <AppPresenter />
      </>
    );
  }
}

export default AppContainer;
