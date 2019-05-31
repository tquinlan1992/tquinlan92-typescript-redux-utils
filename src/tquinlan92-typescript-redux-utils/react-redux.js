import React from 'react';
import { connect } from "react-redux";
import jss from 'jss';

export function withStyles(styles) {
    const { classes } = jss.createStyleSheet(styles).attach()
    return function (Component) {
        return (props) => {
            return <Component classes={classes} {...props} />;
        };
    }
}

function createConnectedComponent() {
    return function(
            mapStateToProps,
            mapDispatchToProps = {},
            styles = {}
        ) {
        return (Component) => {
            const StyledComponent = withStyles(styles)(Component);
            return {
                Component,
                mapStateToProps,
                mapDispatchToProps,
                Connected: connect(mapStateToProps, mapDispatchToProps)(StyledComponent)
            };
        }
    }
}

export function createConnectedProps() {
    return {
        connectedWithOwnProps: function withOwnProps() {
            return createConnectedComponent();
        },
        connectedNoOwnProps: createConnectedComponent()
    };
}