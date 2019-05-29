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
        return (props: any): React.ReactElement => {
            return <Component classes={classes} {...props} />;
        };
    }
}

function createConnectedComponent<AppState, OwnProps = {}>() {
    return function <
        MapStateToProps extends (state: AppState, ownProps: OwnProps) => ({}),
        MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>,
        Styles = {}>(
            mapStateToProps: MapStateToProps,
            mapDispatchToProps: MapDispatchToProps = {} as any,
            styles: Styles = {} as any
        ) {
        return (Component: React.FC<ReturnType<MapStateToProps> & MapDispatchToProps & WithStyles<typeof styles>>) => {
            const StyledComponent = withStyles(styles)(Component);
            return {
                Component,
                mapStateToProps,
                mapDispatchToProps,
                Connected: connect<AppState, ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>, OwnProps>(mapStateToProps as any, mapDispatchToProps as any)(StyledComponent)
            };
        }
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