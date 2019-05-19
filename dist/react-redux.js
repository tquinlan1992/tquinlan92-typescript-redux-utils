"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
function createConnectedProps() {
    return {
        connectedWithOwnProps: function withOwnProps() {
            return function createConnectedComponent(mapStateToProps, mapDispatchToProps, Component) {
                return {
                    Component: Component,
                    mapStateToProps: mapStateToProps,
                    mapDispatchToProps: mapDispatchToProps,
                    Connected: react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Component)
                };
            };
        },
        connectedNoOwnProps: function createConnectedComponent(mapStateToProps, mapDispatchToProps, Component) {
            return {
                Component: Component,
                mapStateToProps: mapStateToProps,
                mapDispatchToProps: mapDispatchToProps,
                Connected: react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Component)
            };
        }
    };
}
exports.createConnectedProps = createConnectedProps;
//# sourceMappingURL=react-redux.js.map