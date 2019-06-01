function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { connect } from "react-redux";
import jss from 'jss';
export function withStyles(styles) {
  const {
    classes
  } = jss.createStyleSheet(styles).attach();
  return function (Component) {
    return props => {
      return React.createElement(Component, _extends({
        classes: classes
      }, props));
    };
  };
}

function createConnectedComponent() {
  return function (mapStateToProps, mapDispatchToProps = {}, styles = {}) {
    return Component => {
      const StyledComponent = withStyles(styles)(Component);
      return {
        Component,
        mapStateToProps,
        mapDispatchToProps,
        Connected: connect(mapStateToProps, mapDispatchToProps)(StyledComponent)
      };
    };
  };
}

export function createConnectedProps() {
  return {
    connectedWithOwnProps: function withOwnProps() {
      return createConnectedComponent();
    },
    connectedNoOwnProps: createConnectedComponent()
  };
}