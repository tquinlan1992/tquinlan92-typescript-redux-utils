import { AnyAction } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { makeNestedStore, createConnectedProps } from './tquinlan92-typescript-redux-utils';
import { createLogger } from 'redux-logger';
import { state1 } from './state1';
import { state1ThunkActions } from './state1Thunks';
import { merge } from 'lodash';

const logger = createLogger();

export const initialStates = {
    state1
};

export const { actions: storeActions, reducers, selectors, initalState, reducer, store } = 
makeNestedStore(initialStates, [thunk, logger]);

const thunkActions = {
    state1: state1ThunkActions
};

export const actions = merge(storeActions, thunkActions); 

export type AppState = typeof initalState;

export type AppThunk = ThunkAction<void, AppState, void, AnyAction>;

export const { connectedWithOwnProps, connectedNoOwnProps } = createConnectedProps<AppState>();