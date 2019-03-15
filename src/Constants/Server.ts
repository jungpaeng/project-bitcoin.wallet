import '../@types/global.d';

export const MASTER_NODE = 'https://js-bitcoin.herokuapp.com';
export const SELF_NODE = `http://localhost:${window.sharedPort}`;
export const SELF_P2P_NODE = port => `ws://localhost:${port}`;
