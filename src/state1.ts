import {
  createSlice,
  ThunkActionsForState,
} from "./tquinlan92-typescript-redux-utils";
import { actions, AppState } from "./store";

export const state1ThunkActions: ThunkActionsForState<AppState> = {
  getResults: () => (dispatch) => {
    dispatch(actions.state1.results(["item1", "item2", "item3"]));
  },
};

interface State1 {
  input: string;
  results: string[];
}

const state1InitialState: State1 = {
  input: "",
  results: [],
};

export const state1 = createSlice(state1InitialState, {
  immerInput: (state, { value }: { value: number }) => {
    state.input = String(value);
  },
});
