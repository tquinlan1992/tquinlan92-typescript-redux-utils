# tquinlan92-typescript-redux-utils

This package gives a few useful type-safe redux, react-redux, and react utilities.

## `makeNestedStore`
makeNestedSimpleStore creates a nested redux store with thunk actions.  It gives back `reducers` to use with `combineReducers` and  `actions` to update the state.  The `actions` include `simpleActions` to change the state with the same name as the state properties.  It also includes methods `set`, to set a partial state with type checking, `setAll` to set the state with type checking, `reset` to reset a state to its initial state, `resetAll` to reset the state whole to its initial state.  

The second parameter takes `middleware` to apply to the store returned.

```ts
export const {
    actions,
    reducers, 
    selectors,
    initalState,
    reducer,
    store
} =
    makeNestedStore(initialStates, [/* middleware */]);
```

The code below this shows the full basic usage.  There's also a typescript create-react-app, redux, and redux thunk usage starting with `./src/index.tsx` demonstrating the usage in a real app.  The app example is just a create-react-app with typescript and the instructions can be found here [here](./Create-React-App.md).

Also you can access a sandbox using it without typescript [here](https://codesandbox.io/s/tquinlan92typescriptreduxutils-k2the).

```ts
import { combineReducers, createStore, applyMiddleware, AnyAction } from 'redux';
import {mergeStateWithActions, makeNestedStore } from 'tquinlan92-typescript-redux-utils';
import thunk, { ThunkAction } from 'redux-thunk';
import { createSelector } from 'reselect';

const state1 = mergeStateWithActions(
    {
        input: '',
        results: [] as string[],
    }, 
    {
        
        immerInput: (state, {value}: {value: string}) => {
            state.input = value;
        }
    }
);

const initialStates = {
    state1,
};

const state1ThunkActions = {
    getResults
};

export const { actions: storeActions, reducers, selectors, initalState, reducer, store } = 
makeNestedStore(initialStates, [thunk, logger]);

export type AppState = typeof initalState;

function getResults(): ThunkAction<void, AppState, void, AnyAction> {
    return async (dispatch) => {
        dispatch(actions.state1.results(['item1', 'item2', 'item3']))
    };
}

const thunkActions = {
    state1: state1ThunkActions
};

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

// Tests demonstrationg the usage of the actions
describe('dispatching state1 actions', () => {
    describe('when state1.input is dispatched', () => {
        it('should set the state1.input value', () => {
            store.dispatch(actions.state1.input('newValue'));
            const newState = store.getState();
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
            store.dispatch(actions.state1.resetAll());
            const newState = store.getState();
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
            store.dispatch(actions.state1.set({input: 'newValueFromSet'}));
            const newState = store.getState();
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
            store.dispatch(actions.state1.setAll({input: 'newValueFromSetAll', results: ['item1']}));
            const newState = store.getState();
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
            store.dispatch(actions.state1.results(['result1', 'result2', 'result3']));
            store.dispatch(actions.state1.reset(['results']));
            const newState = store.getState();
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

### `mergeStateWithActions`
`mergeStateWithActions` takes two parameters `intialState` and `otherActions`.  `otherActions` are reducers that will be typed to to the `initialState` passed and the second parameter to the reducer (the `action type`) will be typed for the `action creator` returned when used with `makeNestedStore`

```ts
import { mergeStateWithActions } from 'tquinlan92-typescript-redux-utils` 

const state1 = mergeStateWithActions(
    {
        input: '',
        results: [] as string[],
    }, 
    {
        
        immerInput: (state, {value}: {value: String}) => {
            state.input = value;
        })
    }
});
```

## `createConnectProps`
createConnectProps takes a `AppState` as a generic type.  It returns back a method to `create connected props` using `mapStateToProps` and `mapDispatchToProps` as its two parameters.

```ts
function createConnectProps<AppState>(): <MapStateToProps extends (state: AppState, ownProps: any) => {}, MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>>(mapStateToProps: MapStateToProps, mapDispatchToProps?: MapDispatchToProps) => (Component: React.FunctionComponent<ReturnType<MapStateToProps> & MapDispatchToProps>) => {
    Component: React.FunctionComponent<ReturnType<MapStateToProps> & MapDispatchToProps>;
    mapStateToProps: MapStateToProps;
    mapDispatchToProps: MapDispatchToProps;
    Connected: import("react-redux").ConnectedComponentClass<(props: any) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, Pick<any, never> & Parameters<MapStateToProps>[1]>;
};
```

#### Usage of `connectProps`
```tsx
import React from 'react';
import { actions, createConnectProps, AppState } from "./store";

const connectProps = createConnectProps<AppState>();

const connectedProps = connectProps(
    (state, {valueFromProp}: {valueFromProp: string;}) => {
        const { input, results } = state.state1;
        return {
            input,
            results,
            valueFromProp
        }
    }, 
    {
        onChange: actions.state1.input,
        getResults: actions.state1.getResults,
        reset: actions.state1.reset
    });

export const { Connected: State1ComponentConnected } = connectedProps(
    { input, results, onChange, getResults, reset, classes, valueFromProp }) => {
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
    })
)
```

## `withStyles`
`StyleComponent` creates a component with JSS styles given as props

### Usage of `withStyles`
```tsx
import { withStyles, WithStyles } from './tquinlan92-typescript-redux-utils';

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