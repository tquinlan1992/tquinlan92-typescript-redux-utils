import { AnyAction } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { makeNestedStore, createConnectedProps } from './tquinlan92-typescript-redux-utils';
import { createLogger } from 'redux-logger';
import { state1ThunkActions, state1 } from './state1';

const logger = createLogger();

export const initialStates = {
    state1
};

const thunkActions = {
    state1: state1ThunkActions
};

export const { actions, reducers, selectors, initalState, reducer, store } = 
makeNestedStore(initialStates, thunkActions, [thunk, logger]);

type AppState = typeof initalState;

export type AppThunk = ThunkAction<void, AppState, void, AnyAction>;

export const { connectedWithOwnProps, connectedNoOwnProps } = createConnectedProps<AppState>();