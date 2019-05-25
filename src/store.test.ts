import { reduxStore, storeActions } from "./store";

describe('dispatching state1 actions', () => {
    describe('when state1.input is dispatched', () => {
        it('should set the state1.input value', () => {
            reduxStore.dispatch(storeActions.state1.input('newValue'));
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: 'newValue',
                    results: []
                }
            })
        })
    });
    describe('when state1.resetAll is dispatched', () => {
        it('should reset the state1 state to its initial state', () => {
            reduxStore.dispatch(storeActions.state1.resetAll());
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: '',
                    results: []
                }
            })
        })
    });
    describe('when state1.set is dispatched', () => {
        it('should update the properties on state1', () => {
            reduxStore.dispatch(storeActions.state1.set({input: 'newValueFromSet'}));
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: 'newValueFromSet',
                    results: []
                }
            })
        })
    });
    describe('when state1.setAll is dispatched', () => {
        it('should update the properties on state1', () => {
            reduxStore.dispatch(storeActions.state1.setAll({input: 'newValueFromSetAll', results: ['item1']}));
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: 'newValueFromSetAll',
                    results: ['item1']
                }
            })
        })
    });
    describe('when state1.reset is dispatched', () => {
        it('should reset the properties in params', () => {
            reduxStore.dispatch(storeActions.state1.results(['result1', 'result2', 'result3']));
            reduxStore.dispatch(storeActions.state1.reset(['results']));
            const newState = reduxStore.getState();
            expect(newState).toEqual({
                state1: {
                    input: 'newValueFromSetAll',
                    results: []
                }
            })
        })
    });
});