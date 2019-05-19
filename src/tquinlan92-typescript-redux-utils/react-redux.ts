import { MapDispatchToPropsParam, ResolveThunks, connect } from "react-redux";

export function createConnectedProps<AState>() {
    return {
        connectedWithOwnProps: function withOwnProps<OwnProps>() {
            return function createConnectedComponent<
                MapStateToProps extends (state: AState, ownProps: OwnProps) => ({}),
                MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>>(
                    mapStateToProps: MapStateToProps,
                    mapDispatchToProps: MapDispatchToProps,
                    Component: React.FC<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>
                ) {
                return {
                    Component,
                    mapStateToProps,
                    mapDispatchToProps,
                    Connected: connect<AState, ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>, OwnProps>(mapStateToProps as any, mapDispatchToProps as any)(Component as any)
                };
            }
        },
        connectedNoOwnProps: function createConnectedComponent<
            MapStateToProps extends (state: AState) => ({}),
            MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>>(
                mapStateToProps: MapStateToProps,
                mapDispatchToProps: MapDispatchToProps,
                Component: React.FC<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>
            ) {
            return {
                Component,
                mapStateToProps,
                mapDispatchToProps,
                Connected: connect<AState, ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>(mapStateToProps as any, mapDispatchToProps as any)(Component as any)
            };
        }
    };
}