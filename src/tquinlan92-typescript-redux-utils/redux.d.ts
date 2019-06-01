import { Dictionary, Omit } from 'lodash';
import { Action, AnyAction, ActionCreator } from "typescript-fsa";
import { Reducer, Store, Middleware, AnyAction as ReduxAnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk'

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

export declare function getActionCreatorWithImmer<AppState>(): <ActionParams>(name: string, reducer: (appState: AppState, actionParams: ActionParams) => undefined | void) => {
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
        state: InitialState[A]['state'],
        actions: {
            [P in keyof InitialState[A]['actions']]: (state: InitialState[A]['state'], actionParams: any) => undefined | void;
        };
    };
};

export type NestedStatePick<State extends { [key: string]: { state: any}}> = {
    [C in keyof State]: State[C]['state']
}

export type ActionsForState<State> = {
    [P: string]: (state: Omit<State, 'actions'>, actionParams: any) => undefined | void;
}

export type ActionsForStateWithActions<State extends { actions: ActionsForState<State> }> = {
    [P in keyof State['actions']]: (state: Omit<State, 'actions'>, actionParams: any) => undefined | void;
} & {
    [key: string]: any
}

export type ThunkActionsForState<AppState> = {
    [key: string]: (params: any) => AppThunk<AppState>
}

export type AppThunk<AppState> = ThunkAction<void, AppState, void, ReduxAnyAction>;

export type StateWithActions<State> = {
    actions: ActionsForState<Omit<State, 'actions'>>
} & {
        [P in keyof Omit<State, 'actions'>]: any
    }

export declare function mergeStateWithActions<State, Actions extends ActionsForState<State>>(state: State, actions: Actions): { state: State, actions: Actions };

export declare function makeNestedStore<State extends AppStateWithActions<State>>(state: State, middleware?: Middleware[]): {
    actions: { [P in keyof State]: { [A in keyof State[P]['state']]: ActionCreator<State[P]['state'][A]>; } & {
        reset: ActionCreator<(keyof State[P]['state'])[]>;
        resetAll: () => {
            (payload: undefined, meta?: {
                [key: string]: any;
            } | null | undefined): Action<undefined>;
            type: string;
            match: (action: AnyAction) => action is Action<undefined>;
        };
        setAll: ActionCreator<State[P]['state']>;
        set: ActionCreator<Partial<State[P]['state']>>;
    } & { [A in keyof State[P]["actions"]]:  ActionCreator<Parameters<State[P]["actions"][A]>[1]>; }; };
    reducers: { [P in keyof State]: Reducer<NestedStatePick<State>, AnyAction>; };
    selectors: { [P in keyof State]: { [A in keyof State[P]['state']]: (state: NestedStatePick<State>) => State[P]['state'][A]; }; };
    initalState: NestedStatePick<State>,
    reducer: Reducer<State>,
    store: Store<State>
};
export { };
