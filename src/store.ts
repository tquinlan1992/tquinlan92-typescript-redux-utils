import { combineReducers, createStore, applyMiddleware, AnyAction } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { makeNestedSimpleStore, createConnectedProps, makeActionCreatorWithReducer } from './tquinlan92-typescript-redux-utils';

const state1NoActions = {
    input: '',
    results: [] as string[]
}

type State1 = typeof state1NoActions;

const state1 = {
    input: '',
    results: [] as string[],
    actions: {
        firstOtherAction: makeActionCreatorWithReducer<State1, {value: Number}>('firstOtherAction', (state, {value}) => {
            return {
                ...state,
                input: String(value)
            }
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

export const reduxStore = createStore(appReducer, applyMiddleware(thunk));

export const { connectedWithOwnProps, connectedNoOwnProps } = createConnectedProps<AppState>();