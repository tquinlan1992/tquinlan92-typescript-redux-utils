import { combineReducers, createStore, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { makeNestedSimpleStore, createConnectedProps, getActionCreator } from './tquinlan92-typescript-redux-utils';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  // ...options
});

const state1NoActions = {
    input: '',
    results: [] as string[]
}

type State1 = typeof state1NoActions;

const state1ActionCreator = getActionCreator<State1>();

const state1 = {
    input: '',
    results: [] as string[],
    actions: {
        firstOtherAction: state1ActionCreator<{value: Number;}>('nextOne', (state, {value}) => {
            return {
                ...state,
                input: String(value)
            };
        })
    }
};

const initialStates = {
    state1
};

export type AppState = typeof initialStates;

function getResults(): ThunkAction<void, AppState, void, AnyAction> {
    return async (dispatch) => {
        dispatch(storeActions.state1.results(['item1', 'item2', 'item3']))
    };
}

const state1ThunkActions = {
    getResults
};

const thunkActions = {
    state1: state1ThunkActions
};

export const { actions: storeActions, reducers, selectors } = makeNestedSimpleStore(initialStates, thunkActions);

const appReducer = combineReducers(reducers);

export const reduxStore = createStore(appReducer, applyMiddleware(thunk, logger));

reduxStore.dispatch(storeActions.state1.firstOtherAction({value: 4}));

export const { connectedWithOwnProps, connectedNoOwnProps } = createConnectedProps<AppState>();