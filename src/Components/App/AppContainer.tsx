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

interface IProps {
  sharedPort: string;
}

interface IState {
  address: string;
}

class AppContainer extends Component<IProps, IState> {
  public state: IState = {
    address: '',
  };

  public componentDidMount() {
    const { sharedPort } = this.props;
    this.connectOnMaster(sharedPort);
    this.getAddress(sharedPort);
  }

  public connectOnMaster = async (port: string) => {
    const request = await axios.post(`${MASTER_NODE}/peers`, {
      peer: SELF_P2P_NODE(port),
    });
  }

  public getAddress = async (port: string) => {
    const { data: { address } } = await axios.get(`${SELF_NODE(port)}/me/address`);

    this.setState({ address });
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
