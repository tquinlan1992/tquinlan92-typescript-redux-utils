# tquinlan92-typescript-redux-utils

This exports a utility for creating a nested redux store with thunk actions.  It gives back `reducers` to use with `combineReducers` and  `actions` to update the state.  The `actions` include `simpleActions` to change the state with the same name as the state properties.  It also includes methods `set`, to set a partial state with type checking, `setAll` to set the state with type checking, and `reset` to reset the state to its initial state.  If a second argument is passed in it will merge the object with the `action`.  It's recommened to pass in thunk actions as the second argument matching the nested store type.

```ts
export const { actions: storeActions, reducers } = makeNestedSimpleStore(initialStates, thunkActions);
```

The code below this shows the full basic usage.  There's also a typescript create-react-app, redux, and redux thunk usage starting with `./src/index.tsx` demonstrating the usage in a real app.  The app example is just a create-react-app with typescript and the instructions can be found here [here](./Create-React-App.md).

```ts
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

/* thunkActions can be anything.  It's lodash.merged with the storeActions.  
A good use case would be thunk actions.
*/
export const { actions: storeActions, reducers } = makeNestedSimpleStore(initialStates, thunkActions);

const appReducer = combineReducers(reducers);

export const reduxStore = createStore(appReducer, applyMiddleware(thunk));

describe('dispatching state1 actions', () => {
    describe('when state1.input is dispatched', () => {
        it('should set the state1.input value', () => {
            reduxStore.dispatch(storeActions.state1.input('newValue'));
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: 'newValue',
                    results: []
                }
            })
        })
    });
    describe('when state1.reset is dispatched', () => {
        it('should reset the state1 state to its initial state', () => {
            reduxStore.dispatch(storeActions.state1.reset());
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: '',
                    results: []
                }
            })
        })
    });
    describe('when state1.set is dispatched', () => {
        it('should update the properties on state1', () => {
            reduxStore.dispatch(storeActions.state1.set({input: 'newValueFromSet'}));
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: 'newValueFromSet',
                    results: []
                }
            })
        })
    });
    describe('when state1.setAll is dispatched', () => {
        it('should update the properties on state1', () => {
            reduxStore.dispatch(storeActions.state1.setAll({input: 'newValueFromSetAll', results: ['item1']}));
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: 'newValueFromSetAll',
                    results: ['item1']
                }
            })
        })
    });
});
```