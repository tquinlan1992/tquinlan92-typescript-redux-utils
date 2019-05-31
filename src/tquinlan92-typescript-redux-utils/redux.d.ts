import { Dictionary, Omit } from 'lodash';
import { Action, AnyAction, ActionCreator } from "typescript-fsa";
import { Reducer } from 'redux';
export interface ActionCreatorWithReducer<StateType> {
    actionCreator: ActionCreator<any>;
    reducer: (state: StateType, action: any) => StateType;
}
export interface ActionCreatorWithReducerGroup<StateType> {
    [key: string]: ActionCreatorWithReducer<StateType>;
}
export declare function createReducer<StateType>(initialState: StateType, actions: ActionCreatorWithReducerGroup<StateType>): (state: StateType | undefined, incomingAction: Action<AnyAction>) => StateType;
export interface StateTypeReducer<StateType, ActionParams> {
    (state: StateType, action: ActionParams): StateType;
}
export declare function makeActionCreatorWithReducer<StateType, ActionParams>(name: string, reducer: StateTypeReducer<StateType, ActionParams>): {
    actionCreator: ActionCreator<ActionParams>;
    reducer: StateTypeReducer<StateType, ActionParams>;
};
export declare function getActionCreator<AppState>(): <ActionParams>(name: string, reducer: StateTypeReducer<AppState, ActionParams>) => {
    actionCreator: ActionCreator<ActionParams>;
    reducer: StateTypeReducer<AppState, ActionParams>;
};
export declare function getCreators<T extends {
    [key: string]: ActionCreatorWithReducer<any>;
}>(creators: T): {
    [P in keyof T]: T[P]['actionCreator'];
};
export declare function makeActionCreatorWithReducerWithPrefix<StateType, ActionParams>(actionName: string, reducer: StateTypeReducer<StateType, ActionParams>): (reducerName?: string | undefined) => {
    actionCreator: ActionCreator<ActionParams>;
    reducer: StateTypeReducer<StateType, ActionParams>;
};
export interface SimpleAndThunkActions {
    [key: string]: any;
}
export interface ActionsAndReducer {
    actions?: SimpleAndThunkActions;
    reducer?: Reducer<any, AnyAction>;
}
export declare function getReducersFromCombinedActionReducer<T extends {
    [key: string]: ActionsAndReducer;
}>(creators: T): {
    [P in keyof T]: T[P]['reducer'];
};
export declare function getActionsFromCombinedActionReducer<T extends {
    [key: string]: ActionsAndReducer;
}>(creators: T): {
    [P in keyof T]: T[P]['actions'];
};
export interface ActionsAndReducerSetup {
    [key: string]: ActionsAndReducer;
}
export interface ActionsReducersFromCombinedActionReducer<ActionsReducersInstances extends ActionsAndReducerSetup> {
    actions: {
        [P in keyof ActionsReducersInstances]: ActionsReducersInstances[P]['actions'];
    };
    reducers: {
        [P in keyof ActionsReducersInstances]: ActionsReducersInstances[P]['reducer'];
    };
}
export declare function getActionsAndReducersFromCombinedActionReducer<Creators extends ActionsAndReducerSetup>(creators: Creators): ActionsReducersFromCombinedActionReducer<Creators>;
export declare function testRunner<ReducerState>(reducer: Reducer): (initalState: ReducerState, action: AnyAction) => any;
declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
declare type OtherActions<State> = {
    [P in keyof State]?: ActionCreatorWithReducer<State>;
};
export declare function makeSimpleReducer<State extends {}>(reducerName: string, initialState: State, otherActions?: OtherActions<State>): {
    actions: { [P in keyof ({ [P in keyof State]: {
        actionCreator: ActionCreator<State[P]>;
        reducer: StateTypeReducer<State, State[P]>;
    }; } & {
        setAll: {
            actionCreator: ActionCreator<State>;
            reducer: StateTypeReducer<State, State>;
        };
        set: {
            actionCreator: ActionCreator<Partial<State>>;
            reducer: StateTypeReducer<State, Partial<State>>;
        };
        reset: {
            actionCreator: ActionCreator<"reverse" | "map" | "filter" | "forEach" | "length" | "toString" | "toLocaleString" | "concat" | "join" | "slice" | "indexOf" | "lastIndexOf" | "every" | "some" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "includes" | "pop" | "push" | "shift" | "sort" | "splice" | "unshift" | "fill" | "copyWithin">;
            reducer: StateTypeReducer<State, "reverse" | "map" | "filter" | "forEach" | "length" | "toString" | "toLocaleString" | "concat" | "join" | "slice" | "indexOf" | "lastIndexOf" | "every" | "some" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "includes" | "pop" | "push" | "shift" | "sort" | "splice" | "unshift" | "fill" | "copyWithin">;
        };
    } & OtherActions<State>)]: ({ [P in keyof State]: {
        actionCreator: ActionCreator<State[P]>;
        reducer: StateTypeReducer<State, State[P]>;
    }; } & {
        setAll: {
            actionCreator: ActionCreator<State>;
            reducer: StateTypeReducer<State, State>;
        };
        set: {
            actionCreator: ActionCreator<Partial<State>>;
            reducer: StateTypeReducer<State, Partial<State>>;
        };
        reset: {
            actionCreator: ActionCreator<"reverse" | "map" | "filter" | "forEach" | "length" | "toString" | "toLocaleString" | "concat" | "join" | "slice" | "indexOf" | "lastIndexOf" | "every" | "some" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "includes" | "pop" | "push" | "shift" | "sort" | "splice" | "unshift" | "fill" | "copyWithin">;
            reducer: StateTypeReducer<State, "reverse" | "map" | "filter" | "forEach" | "length" | "toString" | "toLocaleString" | "concat" | "join" | "slice" | "indexOf" | "lastIndexOf" | "every" | "some" | "reduce" | "reduceRight" | "find" | "findIndex" | "entries" | "keys" | "values" | "includes" | "pop" | "push" | "shift" | "sort" | "splice" | "unshift" | "fill" | "copyWithin">;
        };
    } & OtherActions<State>)[P]["actionCreator"]; } & {
        resetAll: () => Action<null>;
    };
    reducer: (state: State | undefined, incomingAction: Action<AnyAction>) => State;
};
export declare function getActions<T extends {
    [key: string]: {
        actions?: Dictionary<any>;
    };
}>(creators: T): {
    [P in keyof T]: T[P]['actions'];
};
declare type AppStateWithActions<InitialState extends {
    [key: string]: any;
}> = {
    [A in keyof InitialState]: {
        actions: {
            [P in keyof InitialState[A]['actions']]: {
                actionCreator: ActionCreator<any>;
                reducer: StateTypeReducer<Omit<InitialState[A], 'actions'>, any>;
            };
        };
    };
};
export declare function makeNestedSimpleReducerSimpleActions<AppState extends AppStateWithActions<AppState>>(state: any): {
    reducers: { [P in keyof AppState]: Reducer<AppState[P], AnyAction>; };
    actions: { [P in keyof AppState]: { [A in keyof Pick<AppState[P], Exclude<keyof AppState[P], "actions">>]: ActionCreator<AppState[P][A]>; } & {
        reset: ActionCreator<(keyof AppState[P])[]>;
        resetAll: () => {
            (payload: undefined, meta?: {
                [key: string]: any;
            } | null | undefined): Action<undefined>;
            type: string;
            match: (action: AnyAction) => action is Action<undefined>;
        };
        setAll: ActionCreator<AppState[P]>;
        set: ActionCreator<Partial<AppState[P]>>;
    } & { [A in keyof AppState[P]["actions"]]: AppState[P]["actions"][A]["actionCreator"]; }; };
    selectors: { [P in keyof AppState]: { [A in keyof AppState[P]]: (state: { [C in keyof AppState]: Omit<AppState[C], 'actions'>}) => AppState[P][A]; }; };
};

type NestedStateOmitActions<State> = {
    [C in keyof State]: Omit<State[C], 'actions'>
}

export declare function makeNestedSimpleStore<State extends AppStateWithActions<State>, ThunkActions>(state: State, thunkActions?: ThunkActions): {
    actions: { [P in keyof State]: { [A in keyof Pick<State[P], Exclude<keyof State[P], "actions">>]: ActionCreator<State[P][A]>; } & {
        reset: ActionCreator<(keyof State[P])[]>;
        resetAll: () => {
            (payload: undefined, meta?: {
                [key: string]: any;
            } | null | undefined): Action<undefined>;
            type: string;
            match: (action: AnyAction) => action is Action<undefined>;
        };
        setAll: ActionCreator<Omit<State[P], 'actions'>>;
        set: ActionCreator<Partial<State[P]>>;
    } & { [A in keyof State[P]["actions"]]: State[P]["actions"][A]["actionCreator"]; }; } & ThunkActions;
    reducers: { [P in keyof State]: Reducer<NestedStateOmitActions<State>[P], AnyAction>; };
    selectors: { [P in keyof State]: { [A in keyof State[P]]: (state: NestedStateOmitActions<State>) => State[P][A]; }; };
};
export {};