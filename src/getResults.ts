import { AppThunk, actions } from "./store";

export function getResults(): AppThunk {
    return async (dispatch) => {
        dispatch(actions.state1.results(['item1', 'item2', 'item3']))
    };
}