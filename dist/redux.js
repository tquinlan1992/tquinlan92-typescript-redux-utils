"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var typescript_fsa_1 = require("typescript-fsa");
function createReducer(initialState, actions) {
    return function (state, incomingAction) {
        if (state === void 0) { state = initialState; }
        var actionMatch = lodash_1.find(actions, function (action) {
            return typescript_fsa_1.isType(incomingAction, action.actionCreator);
        });
        if (actionMatch) {
            return actionMatch.reducer(state, incomingAction.payload);
        }
        else {
            return state;
        }
    };
}
exports.createReducer = createReducer;
function makeActionCreatorWithReducer(name, reducer) {
    var SimpleActionCreator = typescript_fsa_1.default();
    return {
        actionCreator: SimpleActionCreator(name),
        reducer: reducer
    };
}
exports.makeActionCreatorWithReducer = makeActionCreatorWithReducer;
function getCreators(creators) {
    return lodash_1.mapValues(creators, "actionCreator");
}
exports.getCreators = getCreators;
function makeActionCreatorWithReducerWithPrefix(actionName, reducer) {
    return function (reducerName) { return makeActionCreatorWithReducer(JSON.stringify({ reducerName: reducerName, actionName: actionName }), reducer); };
}
exports.makeActionCreatorWithReducerWithPrefix = makeActionCreatorWithReducerWithPrefix;
function getReducersFromCombinedActionReducer(creators) {
    return lodash_1.mapValues(creators, "reducer");
}
exports.getReducersFromCombinedActionReducer = getReducersFromCombinedActionReducer;
function getActionsFromCombinedActionReducer(creators) {
    return lodash_1.mapValues(creators, "actions");
}
exports.getActionsFromCombinedActionReducer = getActionsFromCombinedActionReducer;
function getActionsAndReducersFromCombinedActionReducer(creators) {
    return {
        actions: getActionsFromCombinedActionReducer(creators),
        reducers: getReducersFromCombinedActionReducer(creators)
    };
}
exports.getActionsAndReducersFromCombinedActionReducer = getActionsAndReducersFromCombinedActionReducer;
function testRunner(reducer) {
    return function (initalState, action) {
        return reducer(initalState, action);
    };
}
exports.testRunner = testRunner;
function makeSimpleReducer(reducerName, initialState, otherActions) {
    var actions = lodash_1.mapValues(initialState, function (propertyFromState, key) {
        var creatorReducer = makeActionCreatorWithReducerWithPrefix("UPDATE_" + key.toUpperCase(), function (state, newValue) {
            var _a;
            return lodash_1.assign({}, state, (_a = {}, _a[key] = newValue, _a));
        });
        return creatorReducer(reducerName);
    });
    var reset = makeActionCreatorWithReducer(reducerName + " - RESET", function (state, keysToReset) {
        return lodash_1.assign({}, state, lodash_1.pick(initialState, keysToReset));
    });
    var resetAllActionCreatorReducer = makeActionCreatorWithReducer(reducerName + " - RESET_All", function () {
        return initialState;
    });
    var resetAll = function () { return resetAllActionCreatorReducer.actionCreator(null); };
    var setAll = makeActionCreatorWithReducer(reducerName + " - SET_ALL", function (state, newValue) {
        return newValue;
    });
    var set = makeActionCreatorWithReducer(reducerName + " - SET", function (state, newStateValues) {
        return lodash_1.assign({}, state, newStateValues);
    });
    return {
        actions: lodash_1.assign({}, getCreators(lodash_1.assign({}, actions, { setAll: setAll, set: set, reset: reset }, otherActions)), { resetAll: resetAll }),
        reducer: createReducer(initialState, lodash_1.assign({}, actions, { resetAllActionCreatorReducer: resetAllActionCreatorReducer, setAll: setAll, set: set, reset: reset }, otherActions)),
    };
}
exports.makeSimpleReducer = makeSimpleReducer;
function getActions(creators) {
    return lodash_1.mapValues(creators, "actions");
}
exports.getActions = getActions;
function makeNestedSimpleReducerSimpleActions(state) {
    var actionsReducers = lodash_1.mapValues(state, function (value, key) {
        return makeSimpleReducer(key, lodash_1.omit(value, 'actions'), value.actions);
    });
    var reducers = lodash_1.mapValues(actionsReducers, 'reducer');
    var actions = getActions(actionsReducers);
    var selectors = lodash_1.mapValues(state, function (stateDepth1, stateDepth1Key) {
        return lodash_1.mapValues(stateDepth1, function (stateDepth2Value, stateDepth2Key) {
            return function (selectorState) {
                console.log("state." + stateDepth1Key + "." + stateDepth2Key);
                return selectorState[stateDepth1Key][stateDepth2Key];
            };
        });
    });
    return {
        actions: actions,
        reducers: reducers,
        selectors: selectors
    };
}
exports.makeNestedSimpleReducerSimpleActions = makeNestedSimpleReducerSimpleActions;
function makeNestedSimpleStore(state, thunkActions) {
    var _a = makeNestedSimpleReducerSimpleActions(state), simpleActions = _a.actions, reducers = _a.reducers, selectors = _a.selectors;
    var actionsWithThunks = lodash_1.merge(simpleActions, thunkActions);
    return {
        actions: actionsWithThunks,
        reducers: reducers,
        selectors: selectors
    };
}
exports.makeNestedSimpleStore = makeNestedSimpleStore;
//# sourceMappingURL=redux.js.map