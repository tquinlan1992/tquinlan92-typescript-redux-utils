"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var jss_1 = require("jss");
function withStyles(styles) {
    var classes = jss_1.default.createStyleSheet(styles).attach().classes;
    return function (Component) {
        return function (props) {
            return react_1.default.createElement(Component, __assign({ classes: classes }, props));
        };
    };
}
exports.withStyles = withStyles;
function createConnectedComponent() {
    return function (mapStateToProps, mapDispatchToProps, styles) {
        if (mapDispatchToProps === void 0) { mapDispatchToProps = {}; }
        if (styles === void 0) { styles = {}; }
        return function (Component) {
            var StyledComponent = withStyles(styles)(Component);
            return {
                Component: Component,
                mapStateToProps: mapStateToProps,
                mapDispatchToProps: mapDispatchToProps,
                Connected: react_redux_1.connect(mapStateToProps, mapDispatchToProps)(StyledComponent)
            };
        };
    };
}
function createConnectedProps() {
    return {
        connectedWithOwnProps: function withOwnProps() {
            return createConnectedComponent();
        },
        connectedNoOwnProps: createConnectedComponent()
    };
}
exports.createConnectedProps = createConnectedProps;
