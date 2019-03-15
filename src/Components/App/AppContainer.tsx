import axios from 'axios';
import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { MASTER_NODE, SELF_NODE, SELF_P2P_NODE } from '../../Constants/server';
import typography from '../../typography';
import AppPresenter, { IAppData } from './AppPresenter';

const GlobalStyle = createGlobalStyle`
  ${reset};
  ${typography};
  h1, h2, h3, h4 {
    margin-bottom: 0 !important;
  }
`;

interface IProps {
  sharedPort: string;
}

type IState = IAppData;

class AppContainer extends Component<IProps, IState> {
  public state: IState = {
    address: '',
    balance: 0,
    isMining: false,
  };

  public componentDidMount() {
    const { sharedPort } = this.props;
    this.connectOnMaster(sharedPort);
    this.getAddress(sharedPort);
    this.getBalance(sharedPort);
    setInterval(() => this.getBalance(sharedPort), 1000);
  }

  public connectOnMaster = async (port: string) => {
    await axios.post(`${MASTER_NODE}/peers`, {
      peer: SELF_P2P_NODE(port),
    });
  }

  public getAddress = async (port: string) => {
    const { data: { address } } = await axios.get(`${SELF_NODE(port)}/me/address`);

    this.setState({ address });
  }

  public getBalance = async (port: string) => {
    const { data: { balance } } = await axios.get(`${SELF_NODE(port)}/me/balance`);

    this.setState({ balance });
  }

  public mineBlock = async () => {
    const { sharedPort } = this.props;
    this.setState({ isMining: true });
    await axios.post(`${SELF_NODE(sharedPort)}/mine`);
    this.setState({ isMining: false });
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppPresenter
          {...this.state}
          mineBlock={this.mineBlock}
        />
      </>
    );
  }
}

export default AppContainer;
