import '../@types/global.d';

export const MASTER_NODE = 'https://js-bitcoin.herokuapp.com';
export const SELF_NODE = (port: string) => `http://localhost:${port}`;
export const SELF_P2P_NODE = (port: string) => `ws://localhost:${port}`;
