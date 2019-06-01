import { mergeStateWithActions } from "./tquinlan92-typescript-redux-utils";
import { getResults } from "./getResults";

const state1NoActions = {
    input: '',
    results: [] as string[]
}


export const state1 = mergeStateWithActions(state1NoActions, {
    immerInput: (state, {value}: {value: number}) => {
        state.input = String(value);
    }
});

export const state1ThunkActions = {
    getResults
};
