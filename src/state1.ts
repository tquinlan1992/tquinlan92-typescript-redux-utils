import {
  mergeStateWithActions,
  ThunkActionsForState,
} from "./tquinlan92-typescript-redux-utils";
import { actions, AppState } from "./store";

export const state1ThunkActions: ThunkActionsForState<AppState> = {
  getResults: () => (dispatch) => {
    dispatch(actions.state1.results(["item1", "item2", "item3"]));
  },
};

const state1NoActions = {
  input: "",
  results: [] as string[],
};

export const state1 = mergeStateWithActions(state1NoActions, {
  immerInput: (state, { value }: { value: number }) => {
    state.input = String(value);
  },
});
