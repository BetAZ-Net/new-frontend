import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { formatNumDynDecimal, formatQueryResultToNumber } from "utils";
import { execContractQuerybyMetadata, getAzeroBalanceOfAddress } from "utils/contracts";
import betaz_core_contract from "utils/contracts/betaz_core";
import betaz_token_contract from "utils/contracts/betaz_token";
import staking_pool_contract from "utils/contracts/staking_pool";

const localCurrentAccount = window?.localStorage?.getItem(
  "localCurrentAccount"
);

const initialState = {
  api: null,
  allAccounts: [],
  currentAccount: JSON.parse(localCurrentAccount) || null,
  adapter: null,
};

export const substrateSlice = createSlice({
  name: "substrate",
  initialState,
  reducers: {
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },

    setCurrentApi: (state, action) => {
      state.api = action.payload;
    },

    disconnectCurrentAccount: (state) => {
      state.currentAccount = null;
    },

    updateAccountsList: (state, action) => {
      state.allAccounts = action.payload;
    },
    
    updateAdapter: (state, action) => {
      state.adapter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserBalance.fulfilled, (state, action) => {
      state.currentAccount = {
        ...state.currentAccount,
        balance: action.payload,
      };
    });
  },
});

export const {
  setCurrentApi,
  setCurrentAccount,
  updateAccountsList,
  disconnectCurrentAccount,
  updateAdapter,
} = substrateSlice.actions;

export default substrateSlice.reducer;

export const fetchUserBalance = createAsyncThunk(
  "wallet/fetchUserBalance",
  async ({ currentAccount, api }, thunkAPI) => {
    // TODO: check can fix warning about storing api on redux?
    const tokenBalance = await execContractQuerybyMetadata(
      currentAccount?.address,
      api,
      betaz_token_contract.CONTRACT_ABI,
      betaz_core_contract.CONTRACT_ADDRESS,
      0,
      "psp22::balanceOf",
      currentAccount?.address
    );

    const betaz = formatQueryResultToNumber(tokenBalance);

    const azeroBalance = await getAzeroBalanceOfAddress({
      api,
      address: currentAccount?.address,
    });

    const azero = formatNumDynDecimal(azeroBalance);
    return { betaz, azero };
  }
);

