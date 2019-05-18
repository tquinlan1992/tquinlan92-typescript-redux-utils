import { getCreators, makeActionCreatorWithReducer } from 'tquinlan92-typescript-redux-utils';

const JSONStringify = JSON.stringify;

describe('1 test', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
});

describe('when getCreators is given', () => {
    describe('an empty object', () => {
        it('getCreators should return an empty object', () => {
            const creators = getCreators({});
            expect(creators).toMatchObject({});
        });
    });
    describe('with an object without a actionCreator', () => {
        it('getCreators should return an empty object', () => {
            const creators = getCreators({noActionCreator: {} as any});
            expect(creators).toMatchObject({});
        });
    });
    describe('with a validActionCreator', () => {
        it('getCreators should return object with validActionCreator', () => {
            const validActionCreator = makeActionCreatorWithReducer<any, any>('validActionCreator', () =>{});
            const creators = getCreators({ validActionCreator });
            expect(creators).toMatchObject({ validActionCreator: validActionCreator.actionCreator });
        });
    });
    describe('with 2 actionCreator', () => {
        it('getCreators should return object with validActionCreator', () => {
            const actionCreator1 = makeActionCreatorWithReducer<any, any>('validActionCreator1', () => { });
            const actionCreator2 = makeActionCreatorWithReducer<any, any>('validActionCreator2', () => { });
            const creators = getCreators({ actionCreator1, actionCreator2 });
            expect(JSONStringify(creators)).toEqual(JSONStringify({ actionCreator1: actionCreator1.actionCreator, actionCreator2: actionCreator1.actionCreator }));
        });
    });
    describe('with 1 actionCreator, 1 no acionCreator, 1 actionCreator', () => {
        it('getCreators should return object with validActionCreator', () => {
            const actionCreator1 = makeActionCreatorWithReducer<any, any>('validActionCreator1', () => { });
            const noActionCreator2 = {} as any;
            const actionCreator3 = makeActionCreatorWithReducer<any, any>('validActionCreator3', () => { });
            const creators = getCreators({ actionCreator1, noActionCreator2, actionCreator3 });
            expect(creators).toEqual({ actionCreator1: actionCreator1.actionCreator, actionCreator3: actionCreator3.actionCreator });
        });
    });
});

describe('when makeActionCreatorWithReducer is given', () => {
    describe('a valid state type and valid reducer', () => {
        interface ReducerState {
            test: string;
        }
        interface ActionParams {
            value: string;
        }
        const mockReducer = jest.fn((state, { value }) => {
            return state;
        });
        const actionWithReducer = makeActionCreatorWithReducer<ReducerState, ActionParams>('VALID_ACTION_NAME', mockReducer);
        expect(actionWithReducer).toMatchObject({
            actionCreator: expect.any(Function),
            reducer: mockReducer
        });
        const resultFromReducer = actionWithReducer.reducer({test: 'test2'}, {value: 'value2'});
        expect(mockReducer.mock.calls[0]).toMatchObject([{ test: 'test2' }, { value: 'value2' }]);
    });
});
