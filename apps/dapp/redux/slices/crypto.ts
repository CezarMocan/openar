import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChainId,
} from '@usedapp/core'

export type CryptoState = {
  connected: boolean;
  chainId: ChainId | null;
  ethAccount: string | null;  
}

export type CryptoStateWalletInfo = {
  connected: boolean;
  chainId: ChainId | null;
  ethAccount: string | null;  
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    connected: false,
    chainId: null,
    ethAccount: null,
  } as CryptoState,
  reducers: {
    cryptoWalletConnect(state, action: PayloadAction<CryptoStateWalletInfo>) {
      console.log("State change: cryptoUpdateWalletInfo");

      state = {
        ...state,
        connected: action.payload.connected,
        chainId: action.payload.chainId,
        ethAccount: action.payload.ethAccount,
      }
    },
    cryptoWalletDisconnect(state) {
      console.log("State change: cryptoUpdateWalletInfo");

      state = {
        ...state,
        connected: false,
        chainId: null,
        ethAccount: null,
      }
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = cryptoSlice;

// Extract and export each action creator by name
export const {
  cryptoWalletConnect,
  cryptoWalletDisconnect,
} = actions;

// Export the reducer, either as a default or named export
export default reducer;
