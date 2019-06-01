import { actions, AppState } from "./store";
import { ThunkActionsForState } from "./tquinlan92-typescript-redux-utils";


export const state1ThunkActions: ThunkActionsForState<AppState> = {
    getResults: () => async (dispatch) => {
        dispatch(actions.state1.results(['item1', 'item2', 'item3']));
    }
}