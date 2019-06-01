import { find, mapValues, assign, merge, omit, pick } from 'lodash';
import actionCreatorFactory, { isType } from "typescript-fsa";
import produce from "immer";

export function createReducer(initialState, actions) {
    return (state = initialState, incomingAction) => {
        const actionMatch = find(actions, action => {
            return isType(incomingAction, action.actionCreator);
        });
        if (actionMatch) {
            return actionMatch.reducer(state, incomingAction.payload);
        } else {
            return state;
        }
    };
}
export function makeActionCreatorWithReducer(name, reducer, withImmer) {
    const SimpleActionCreator = actionCreatorFactory();
    return {
        actionCreator: SimpleActionCreator(name),
        reducer: (state, action) => {
            if (withImmer) {
                return produce(state, draft => {
                    reducer(draft, action);
                });
            } else {
                return reducer(state, action)
            }
        }
    };
}


export function getActionCreator() {
    return (name, reducer) => {
        return makeActionCreatorWithReducer(name, reducer);
    }
}

export function getActionCreatorWithImmer() {
    return (name, reducer) => {
        return makeActionCreatorWithReducer(name, reducer, true);
    }
}

export function getCreators(creators) {
    return mapValues(creators, "actionCreator");
}

function getActionName(reducerName, actionName) {
    return JSON.stringify({ reducerName, actionName });
}

export function makeActionCreatorWithReducerWithPrefix(actionName, reducer) {
    return (reducerName) => makeActionCreatorWithReducer(JSON.stringify({ reducerName, actionName }), reducer);
}

export function getReducersFromCombinedActionReducer(creators) {
    return mapValues(creators, "reducer");
}

export function getActionsFromCombinedActionReducer(creators) {
    return mapValues(creators, "actions");
}

export function getActionsAndReducersFromCombinedActionReducer(creators) {
    return {
        actions: getActionsFromCombinedActionReducer(creators),
        reducers: getReducersFromCombinedActionReducer(creators)
    };
}

export function testRunner(reducer) {
    return (initalState, action) => {
        return reducer(initalState, action);
    };
}

export function makeSimpleReducer(reducerName, initialState, otherActions) {
    const actions = mapValues(initialState, (propertyFromState, key) => {
        const creatorReducer = makeActionCreatorWithReducerWithPrefix(
            `UPDATE_${key}`,
            (state, newValue) => {
                return assign({}, state,
                    { [key]: newValue }
                );
            }
        );
        return creatorReducer(reducerName);
    });

    const reset = makeActionCreatorWithReducer(getActionName(reducerName, 'Reset'),
        (state, keysToReset) => {
            return assign({},
                state,
                pick(initialState, keysToReset)
            );
        }
    );
    const resetAllActionCreatorReducer = makeActionCreatorWithReducer(getActionName(reducerName, 'RESET_ALL'),
        () => {
            return initialState;
        }
    );
    const resetAll = () => resetAllActionCreatorReducer.actionCreator(null);
    const setAll = makeActionCreatorWithReducer(getActionName(reducerName, 'SET_ALL'),
        (state, newValue) => {
            return newValue;
        }
    );
    const set = makeActionCreatorWithReducer(getActionName(reducerName, 'SET'),
        (state, newStateValues) => {
            return assign({},
                state,
                newStateValues
            );
        }
    );
    const createdOtherActions = mapValues(otherActions, (reducer, key) => {
        return makeActionCreatorWithReducer(getActionName(reducerName, key), reducer, true);
    })
    return {
        actions: assign({},
            getCreators(assign({}, actions, { setAll, set, reset }, createdOtherActions)),
            { resetAll }
        ),
        reducer: createReducer(initialState, assign({}, actions, { resetAllActionCreatorReducer, setAll, set, reset }, createdOtherActions)),
    };
}

export function getActions(creators) {
    return mapValues(creators, "actions");
}

export function makeNestedSimpleReducerSimpleActions(state) {
    const actionsReducers = mapValues(state, (value, key) => {
        return makeSimpleReducer(key, omit(value, 'actions'), value.actions);
    });
    const reducers = mapValues(actionsReducers, 'reducer');
    const actions = getActions(actionsReducers);
    const selectors = mapValues(state, (stateDepth1, stateDepth1Key) => {
        return mapValues(stateDepth1, (stateDepth2Value, stateDepth2Key) => {
            return (selectorState) => {
                return (selectorState)[stateDepth1Key][stateDepth2Key];
            }
        });
    })
    return ({
        actions,
        reducers,
        selectors
    });
}

export function makeNestedSimpleStore(state, thunkActions) {
    const { actions: simpleActions, reducers, selectors } = makeNestedSimpleReducerSimpleActions(state);
    const actionsWithThunks = merge(simpleActions, thunkActions);
    return {
        actions: actionsWithThunks,
        reducers,
        selectors
    };
}

export function mergeStateWithActions(state, actions) {
    return {
        ...state,
        actions
    };
}