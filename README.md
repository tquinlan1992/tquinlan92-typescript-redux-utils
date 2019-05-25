# tquinlan92-typescript-redux-utils

This package gives a few useful type-safe redux, react-redux, and react utilities.

## `makeNestedSimpleStore`
makeNestedSimpleStore creates a nested redux store with thunk actions.  It gives back `reducers` to use with `combineReducers` and  `actions` to update the state.  The `actions` include `simpleActions` to change the state with the same name as the state properties.  It also includes methods `set`, to set a partial state with type checking, `setAll` to set the state with type checking, `reset` to reset a state to its initial state, `resetAll` to reset the state whole to its initial state.  If a second argument is passed in it will merge the object with the `action`.  It's recommened to pass in thunk actions as the second argument matching the nested store type.

```ts
export const { actions: storeActions, reducers, selectors } = makeNestedSimpleStore(initialStates, thunkActions);
```

The code below this shows the full basic usage.  There's also a typescript create-react-app, redux, and redux thunk usage starting with `./src/index.tsx` demonstrating the usage in a real app.  The app example is just a create-react-app with typescript and the instructions can be found here [here](./Create-React-App.md).

Also you can access a sandbox using it without typescript [here](https://codesandbox.io/s/tquinlan92typescriptreduxutils-k2the).

```ts
import { combineReducers, createStore, applyMiddleware, AnyAction } from 'redux';
import { makeNestedSimpleStore } from 'tquinlan92-typescript-redux-utils';
import thunk, { ThunkAction } from 'redux-thunk';
import { createSelector } from 'reselect';

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
A good use case would be to use it with thunk actions.
*/
export const { actions: storeActions, reducers, selectors } = makeNestedSimpleStore(initialStates, thunkActions);

// Create the redux store
const appReducer = combineReducers(reducers);

export const reduxStore = createStore(appReducer, applyMiddleware(thunk));

// Create a Selector using a exported selectors
function mapResults(results: string[]) {
    times(1000, () => {
        console.log('heavy computation');
    });
    return results.map(result => result);
}

const getResultsSelector = createSelector(
    selectors.state1.results,
    mapResults
)

// Tests demonstrationg the usage of the storeActions
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
    describe('when state1.resetAll is dispatched', () => {
        it('should reset the state1 state to its initial state', () => {
            reduxStore.dispatch(storeActions.state1.resetAll());
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
    describe('when state1.reset is dispatched', () => {
        it('should reset the properties in params', () => {
            reduxStore.dispatch(storeActions.state1.results(['result1', 'result2', 'result3']));
            reduxStore.dispatch(storeActions.state1.reset(['results']));
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: 'newValueFromSetAll',
                    results: []
                }
            })
        })
    });
});
```

## `createConnectedProps`
createConnectedComponent takes a `AppState` as a generic type.  It returns back two methods `connectedWithOwnProps` and `connectedNoOwnProps` to create a connected component with optional JSS styles.

### `connectedNoOwnProps`
`connectedNoOwnProps` Is a method to create a connected component.  T

### `connectedWithOwnProps`
`connectedWithOwnProps` takes `OwnProps` as a generic type and returns back a method to create a connected compnent.  This method is the same as `connectedNoOwnProps` but with `OwnProps`.

```ts
function createConnectedProps<AppState>(): {
    connectedWithOwnProps: <OwnProps>() => (mapStateToProps: MapStateToProps, mapDispatchToProps: MapDispatchToProps, styles: Styles) => (Component: React.FunctionComponent) => {
        Component: React.FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps & WithStyles<Styles>>;
        mapStateToProps: MapStateToProps;
        mapDispatchToProps: MapDispatchToProps;
        Connected: import("react-redux").ConnectedComponentClass<OwnProps>;
    };
    connectedNoOwnProps: (mapStateToProps: MapStateToProps, mapDispatchToProps: MapDispatchToProps, styles: Styles) => (Component: React.FunctionComponent) => {
        Component: React.FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps & WithStyles<Styles>>>;
        mapStateToProps: MapStateToProps;
        mapDispatchToProps: MapDispatchToProps;
        Connected: import("react-redux").ConnectedComponentClass;
    };
};
```

#### Usage of `connectedNoOwnProps`
```tsx
import React from 'react';
import { storeActions, createConnectedProps, AppState } from "./store";

export const { connectedNoOwnProps } = createConnectedProps<AppState>();

export const { Connected: State1ComponentConnected } = connectedNoOwnProps(
    state => {
        const { input, results } = state.state1;
        return {
            input,
            results
        }
    }, 
    {
        onChange: storeActions.state1.input,
        getResults: storeActions.state1.getResults,
        reset: storeActions.state1.reset
    }, 
    ({ input, results, onChange, getResults, reset, classes }) => {
        return (
            <>
                <input value={input} onChange={event => onChange(event.target.value)} />
                <button onClick={getResults} className={classes.button}> Get Results </button>
                <button onClick={reset}>Reset</button>
                <ul>
                    {results.map(result => {
                        return <li>{result}</li>
                    })}
                </ul>
            </>
        )
    },
    {button: {background: 'green'}},
)
```

#### Usage of `connectedWithOwnProps`
```tsx
import React from 'react';
import { storeActions, createConnectedProps, AppState } from "./store";

export const { connectedWithOwnProps } = createConnectedProps<AppState>();

export const { Connected: State1ComponentConnected } = connectedWithOwnProps<{valueFromProp: string;}>()(
    (state, {valueFromProp}) => {
        const { input, results } = state.state1;
        return {
            input,
            results,
            valueFromProp
        }
    }, 
    {
        onChange: storeActions.state1.input,
        getResults: storeActions.state1.getResults,
        reset: storeActions.state1.reset
    }, 
    ({ input, results, onChange, getResults, reset, classes, valueFromProp }) => {
        return (
            <>
                <input value={input} onChange={event => onChange(event.target.value)} />
                <button onClick={getResults} className={classes.button}> {valueFromProp} </button>
                <button onClick={reset}>Reset</button>
                <ul>
                    {results.map(result => {
                        return <li>{result}</li>
                    })}
                </ul>
            </>
        )
    },
    {button: {background: 'green'}},
)
```

## `withStyles`
`StyleComponent` creates a component with JSS styles given as props
### Usage of `withStyles`
```tsx
import { withStyles, WithStyles } from './tquinlan92-typescript-redux-utils';

// Example with functional component in call
const StyledComponent = withStyles({button: {background: 'green'}})({classes}) => {
    return <button className={classes.button} />
})

// Example with functional component outside of call

const styles = {
    button: {
        background: 'green'
    }
}

const ComponentWithoutStyles: React.FC<WithStyles<typeof styles>>({classes}) {
    return <button className={classes.button} />
}

const StyledComponent2 = withStyles({button: {background: 'green'}})({classes}) => {
    return <button className={classes.button} />
})
```