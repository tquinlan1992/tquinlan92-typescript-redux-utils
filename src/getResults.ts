import { AppThunk, storeActions } from "./store";

export function getResults(): AppThunk {
    return async (dispatch) => {
        dispatch(storeActions.state1.results(['item1', 'item2', 'item3']))
    };
}