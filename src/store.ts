import { combineReducers, createStore, applyMiddleware, AnyAction } from 'redux';
import { makeNestedSimpleStore } from 'tquinlan92-typescript-redux-utils';
import thunk, { ThunkAction } from 'redux-thunk';

interface State1 {
    input: string;
    results: string[];
}

const state1: State1 = {
    input: '',
    results: []
};

const initialStates = {
    state1,
};

export type AppState = typeof initialStates;

export type AppThunkAction = ThunkAction<void, AppState, void, AnyAction>;

function getResults(): AppThunkAction {
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


export const { actions: storeActions, reducers } = makeNestedSimpleStore(initialStates, thunkActions);

const appReducer = combineReducers(reducers);

export const reduxStore = createStore(appReducer, applyMiddleware(thunk));
