import { AnyAction } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import {
  createSlicesStore,
  createConnectProps,
} from "./tquinlan92-typescript-redux-utils";
import { createLogger } from "redux-logger";
import { state1, state1ThunkActions } from "./state1";
import { merge } from "lodash";
import { createSelector } from "reselect";

const logger = createLogger();

export const initialStates = {
  state1,
};

export const {
  actions: storeActions,
  reducers,
  selectors,
  initalState,
  reducer,
  store,
} = createSlicesStore(initialStates, [thunk, logger]);

export const inputWithResults = createSelector(
  selectors.state1.input,
  selectors.state1.results,
  (input, results) => [...results, input]
);

const thunkActions = {
  state1: state1ThunkActions,
};

export const actions = merge(storeActions, thunkActions);

export type AppState = typeof initalState;

export const connectProps = createConnectProps<AppState>();
