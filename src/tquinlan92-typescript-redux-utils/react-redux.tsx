import React from 'react';
import { MapDispatchToPropsParam, ResolveThunks, connect } from "react-redux";
import jss from 'jss';

interface WithStyles<Styles> {
    classes: {
        [keyin PStyles;
}

function StyleComponent(styles: any, Component: React.FC<any>) {
    const {classes} = jss.createStyleSheet(styles).attach()
    return (props: Object) => (<Component classes={classes} {...props}/>);

}

export function createConnectedProps<AppState>() {
    return {
        connectedWithOwnProps: function withOwnProps<OwnProps>() {
            return function createConnectedComponent<
                MapStateToProps extends (state: AppState, ownProps: OwnProps) => ({}),
                MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>>(
                    mapStateToProps: MapStateToProps,
                    mapDispatchToProps: MapDispatchToProps,
                    Component: React.FC<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>
                ) {
                return {
                    Component,
                    mapStateToProps,
                    mapDispatchToProps,
                    Connected: connect<AppState, ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>, OwnProps>(mapStateToProps as any, mapDispatchToProps as any)(Component as any)
                };
            }
        },
        connectedNoOwnProps: function createConnectedComponent<
            MapStateToProps extends (state: AppState) => ({}),
            MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>,
            Styles extends {}>(
                mapStateToProps: MapStateToProps,
                mapDispatchToProps: MapDispatchToProps,
                styles: Styles,
                Component: React.FC<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps> & WithStyles<typeof styles>>
            ) {

            const StyledComponent = StyleComponent(styles, Component);
            return {
                Component,
                mapStateToProps,
                mapDispatchToProps,
                Connected: connect<AppState, ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>(mapStateToProps as any, mapDispatchToProps as any)(StyledComponent)
            };
        }
    };
}