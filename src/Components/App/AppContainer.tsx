import axios from 'axios';
import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { MASTER_P2P_NODE, SELF_NODE } from '../../Constants/server';
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
    amount: '',
    balance: 0,
    isMining: false,
    toAddress: '',
  };

  public componentDidMount() {
    const { sharedPort } = this.props;
    this.connectOnMaster(sharedPort);
    this.getAddress(sharedPort);
    this.getBalance(sharedPort);
    setInterval(() => this.getBalance(sharedPort), 1000);
  }

  public connectOnMaster = async (port: string) => {
    await axios.post(`${SELF_NODE(port)}/peers`, {
      peer: MASTER_P2P_NODE,
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

  public handleInput = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const { target: { name, value } } = e;

    this.setState({
      [name as any]: value,
    } as Pick<IState, keyof IState>);
  }

  public handleSubmit = async (e: any) => {
    e.preventDefault();
    const { sharedPort } = this.props;
    const { amount, toAddress } = this.state;
    await axios.post(`${SELF_NODE(sharedPort)}/transactions`, {
      address: toAddress,
      amount: Number(amount ? amount : '0'),
    });
    this.setState({
      amount: '',
      toAddress: '',
    });
  }

  public render() {
    return (
      <>
        <GlobalStyle />
        <AppPresenter
          {...this.state}
          mineBlock={this.mineBlock}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default AppContainer;
