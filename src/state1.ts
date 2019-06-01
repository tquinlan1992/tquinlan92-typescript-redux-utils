import { mergeStateWithActions } from "./tquinlan92-typescript-redux-utils";

export * from './state1Thunks';

const state1NoActions = {
    input: '',
    results: [] as string[]
}

export const state1 = mergeStateWithActions(state1NoActions, {
    immuInput: (state, {value}: {value: number}) => {
        state.input = String(value);
    }
});
