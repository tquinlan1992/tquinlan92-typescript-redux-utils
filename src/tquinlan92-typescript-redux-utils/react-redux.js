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
            mapDispatchToProps = {}
        ) {
        return (Component) => {
            return {
                Component,
                mapStateToProps,
                mapDispatchToProps,
                Connected: connect(mapStateToProps, mapDispatchToProps)(Component)
            };
        }
    }
}

export function createConnectProps() {
    return createConnectedComponent();
}