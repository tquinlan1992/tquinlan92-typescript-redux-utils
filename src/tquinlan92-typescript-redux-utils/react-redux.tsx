import * as React from 'react';
import { MapDispatchToPropsParam, ResolveThunks, connect } from "react-redux";
import jss from 'jss';

interface WithStyles<Styles> {
    classes: {
        [P in keyof Styles]: string;
    }
}

function StyleComponent(styles: any, Component: React.FC<any>) {
    const { classes } = jss.createStyleSheet(styles).attach()
    return (props: Object) => (<Component classes={classes} {...props} />);

}

function createConnectedComponent<AppState, OwnProps = {}>() {
    return function <
        MapStateToProps extends (state: AppState, ownProps: OwnProps) => ({}),
        MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>,
        Styles extends {}>(
            mapStateToProps: MapStateToProps,
            mapDispatchToProps: MapDispatchToProps,
            styles: Styles,
            Component: React.FC<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps & WithStyles<typeof styles>>>
        ) {
        const StyledComponent = StyleComponent(styles, Component);
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