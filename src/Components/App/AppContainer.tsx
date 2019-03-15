import axios from 'axios';
import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from '../../Constants/server';
import typography from '../../typography';
import AppPresenter from './AppPresenter';

const GlobalStyle = createGlobalStyle`
  ${reset};
  ${typography};
`;

class AppContainer extends Component {
  public componentDidMount() {
    this.connectOnMaster();
  }

  public connectOnMaster = async () => {
    const request = await axios.post(`${MASTER_NODE}/peers`, {
      peer: SELF_P2P_NODE,
    });
  }

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
