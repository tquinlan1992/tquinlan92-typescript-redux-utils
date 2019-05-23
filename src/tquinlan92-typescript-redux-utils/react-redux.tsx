import * as React from 'react';
import { MapDispatchToPropsParam, ResolveThunks, connect } from "react-redux";
import jss from 'jss';

export interface WithStyles<Styles> {
    classes: {
        [P in keyof Styles]: string;
    }
}

export function withStyles<Styles = {}>(styles: Styles) {
    const { classes } = jss.createStyleSheet(styles).attach()
    return function <OtherProps = {}>(Component: React.FC<WithStyles<Styles> & OtherProps>) {
        return (props: any) => (<Component classes={classes} {...props} />);
    }
}

function createConnectedComponent<AppState, OwnProps = {}>() {
    return function <
        MapStateToProps extends (state: AppState, ownProps: OwnProps) => ({}),
        MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>,
        Component extends React.FC,
        Styles = {}>(
            mapStateToProps: MapStateToProps,
            mapDispatchToProps: MapDispatchToProps,
            Component: React.FC<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps & WithStyles<typeof styles>>>, // eslint-disable-line
            styles: Styles = {} as any
        ) {
        const StyledComponent = withStyles(styles)(Component);
        return {
            Component,
            mapStateToProps,
            mapDispatchToProps,
            Connected: connect<AppState, ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>, OwnProps>(mapStateToProps as any, mapDispatchToProps as any)(StyledComponent)
        };
    }
}

export function createConnectedProps<AppState>() {
    return {
        connectedWithOwnProps: function withOwnProps<OwnProps>() {
            return createConnectedComponent<AppState, OwnProps>();
        },
        connectedNoOwnProps: createConnectedComponent<AppState>()
    };
}