import { combineReducers, createStore, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { makeNestedStore, createConnectedProps } from './tquinlan92-typescript-redux-utils';
import { createLogger } from 'redux-logger';
import { state1ThunkActions, initialStates } from './state1';

const logger = createLogger();

const thunkActions = {
    state1: state1ThunkActions
};

export const { actions: storeActions, reducers, selectors, initalState } = 
makeNestedStore(initialStates, thunkActions);

type AppState = typeof initalState;

export type AppThunk = ThunkAction<void, AppState, void, AnyAction>;

const appReducer = combineReducers(reducers);

export const reduxStore = createStore(appReducer, applyMiddleware(thunk, logger));

export const { connectedWithOwnProps, connectedNoOwnProps } = createConnectedProps<AppState>();