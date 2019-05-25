import { find, mapValues, assign, Dictionary, merge, omit, pick } from 'lodash';
import actionCreatorFactory, { isType, Action, AnyAction, ActionCreator, Meta } from "typescript-fsa";
import { Reducer } from 'redux';

export interface ActionCreatorWithReducer<StateType> {
    actionCreator: ActionCreator<any>;
    reducer: (state: StateType, action: any) => StateType;
}

export interface ActionCreatorWithReducerGroup<StateType> {
    [key: string]: ActionCreatorWithReducer<StateType>;
}

export function createReducer<StateType>(initialState: StateType, actions: ActionCreatorWithReducerGroup<StateType>) {
    return (state: StateType = initialState, incomingAction: Action<AnyAction>): StateType => {
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

export interface StateTypeReducer<StateType, ActionParams> {
    (state: StateType, action: ActionParams): StateType;
}

export function makeActionCreatorWithReducer<StateType, ActionParams>(name: string, reducer: StateTypeReducer<StateType, ActionParams>) {
    const SimpleActionCreator = actionCreatorFactory();
    return {
        actionCreator: SimpleActionCreator<ActionParams>(name),
        reducer
    };
}

export function getCreators<T extends { [key: string]: ActionCreatorWithReducer<any> }>(creators: T): { [P in keyof T]: T[P]['actionCreator'] } {
    return mapValues(creators, "actionCreator") as { [P in keyof T]: T[P]['actionCreator'] };
}

export function makeActionCreatorWithReducerWithPrefix<StateType, ActionParams>(actionName: string, reducer: StateTypeReducer<StateType, ActionParams>) {
    return (reducerName?: string) => makeActionCreatorWithReducer<StateType, ActionParams>(JSON.stringify({ reducerName, actionName }), reducer);
}

export interface SimpleAndThunkActions {
    [key: string]: any;
}

export interface ActionsAndReducer {
    actions?: SimpleAndThunkActions;
    reducer?: Reducer<any, AnyAction>;
}

export function getReducersFromCombinedActionReducer<T extends { [key: string]: ActionsAndReducer }>(creators: T): { [P in keyof T]: T[P]['reducer'] } {
    return mapValues(creators, "reducer") as { [P in keyof T]: T[P]['reducer'] };
}

export function getActionsFromCombinedActionReducer<T extends { [key: string]: ActionsAndReducer }>(creators: T): { [P in keyof T]: T[P]['actions'] } {
    return mapValues(creators, "actions") as { [P in keyof T]: T[P]['actions'] };
}

export interface ActionsAndReducerSetup {
    [key: string]: ActionsAndReducer;
}

export interface ActionsReducersFromCombinedActionReducer<ActionsReducersInstances extends ActionsAndReducerSetup> {
    actions: { [P in keyof ActionsReducersInstances]: ActionsReducersInstances[P]['actions'] };
    reducers: { [P in keyof ActionsReducersInstances]: ActionsReducersInstances[P]['reducer'] };
}

export function getActionsAndReducersFromCombinedActionReducer<Creators extends ActionsAndReducerSetup>(creators: Creators): ActionsReducersFromCombinedActionReducer<Creators> {
    return {
        actions: getActionsFromCombinedActionReducer(creators) as { [P in keyof Creators]: Creators[P]['actions'] },
        reducers: getReducersFromCombinedActionReducer(creators) as { [P in keyof Creators]: Creators[P]['reducer'] }
    };
}

export function testRunner<ReducerState>(reducer: Reducer) {
    return (initalState: ReducerState, action: AnyAction) => {
        return reducer(initalState, action);
    };
}

type Partial<T> = {
    [P in keyof T]?: T[P];
};

export function makeSimpleReducer<State extends {}>(reducerName: string, initialState: State) {
    const actions = (mapValues(initialState, (propertyFromState, key: keyof State) => {
        const creatorReducer = makeActionCreatorWithReducerWithPrefix<State, State[typeof key]>(
            `UPDATE_${(key as string).toUpperCase()}`,
            (state, newValue) => {
                return assign({}, state,
                    { [key]: newValue }
                );
            }
        );
        return creatorReducer(reducerName) as any;
    }) as any) as {
            [P in keyof State]: {
                actionCreator: ActionCreator<State[P]>;
                reducer: StateTypeReducer<State, State[P]>;
            }
        };
    const reset = makeActionCreatorWithReducerWithPrefix<State, keyof State[]>(
        `RESET`,
        (state, keysToReset) => {
            console.log('here');
            return assign({},
                state,
                pick(initialState, keysToReset)
            );
        }
    )(reducerName);
    const resetAllActionCreatorReducer = makeActionCreatorWithReducerWithPrefix<State, null>(
        `RESET_All`,
        () => {
            return initialState;
        }
    )(reducerName);
    const resetAll = () => resetAllActionCreatorReducer.actionCreator(null);
    const setAll = makeActionCreatorWithReducerWithPrefix<State, State>(
        `SET_ALL`,
        (state, newValue) => {
            return newValue;
        }
    )(reducerName);
    const set = makeActionCreatorWithReducerWithPrefix<State, Partial<State>>(
        `SET`,
        (state, newStateValues) => {
            return assign({},
                state,
                newStateValues
            );
        }
    )(reducerName);
    return {
        actions: assign({},
            getCreators(assign({}, actions, { setAll, set, reset })),
            { resetAll }
        ),
        reducer: createReducer<State>(initialState, assign({}, actions, { resetAllActionCreatorReducer, setAll, set, reset })),
    };
}

export function getActions<T extends { [key: string]: { actions?: Dictionary<any> } }>(creators: T): { [P in keyof T]: T[P]['actions'] } {
    return mapValues(creators, "actions") as { [P in keyof T]: T[P]['actions'] };
}

export function makeNestedSimpleReducerSimpleActions<AppState>(state: any) {
    const actionsReducers = mapValues(state, (value, key) => {
        return makeSimpleReducer(key, omit(value, 'actions'));
    });//{ [P in keyof T]: T[P]['actionCreator'] 
    const reducers = mapValues(actionsReducers, 'reducer');
    const actions = getActions(actionsReducers);
    const selectors = mapValues(state, (stateDepth1, stateDepth1Key) => {
        return mapValues(stateDepth1, (stateDepth2Value, stateDepth2Key) => {
            return (selectorState: AppState) => {
                console.log(`state.${stateDepth1Key}.${stateDepth2Key}`)
                return (selectorState as any)[stateDepth1Key][stateDepth2Key];
            }
        });
    })
    return ({
        actions,
        reducers,
        selectors
    } as any) as {
            reducers: {
                [P in keyof AppState]: Reducer<AppState[P], AnyAction>
            };
            actions: {
                [P in keyof AppState]: {
                    [A in keyof AppState[P]]: ActionCreator<AppState[P][A]>
                } & {
                    reset: ActionCreator<Array<keyof AppState[P]>>;
                    resetAll: () => {
                        type: string;
                        match: (action: AnyAction) => action is Action<undefined>;
                        (payload: undefined, meta?: Meta): Action<undefined>;
                    };
                    setAll: ActionCreator<AppState[P]>;
                    set: ActionCreator<Partial<AppState[P]>>;
                } & {
                    [A in keyof AppState[P]]: AppState[P][A]
                }
            };
            selectors: {
                [P in keyof AppState]: {
                    [A in keyof AppState[P]]: (state: AppState) => AppState[P][A];
                }
            };
        };
}

export function makeNestedSimpleStore<State, ThunkActions>(state: State, thunkActions?: ThunkActions) {
    const { actions: simpleActions, reducers, selectors } = makeNestedSimpleReducerSimpleActions<State>(state);
    const actionsWithThunks = merge(simpleActions, thunkActions);
    return {
        actions: actionsWithThunks,
        reducers,
        selectors
    };
}
