/// <reference types="react" />
import { MapDispatchToPropsParam, ResolveThunks } from "react-redux";
export declare function createConnectedProps<AState>(): {
    connectedWithOwnProps: <OwnProps>() => <MapStateToProps extends (state: AState, ownProps: OwnProps) => {}, MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>>(mapStateToProps: MapStateToProps, mapDispatchToProps: MapDispatchToProps, Component: import("react").FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>) => {
        Component: import("react").FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>;
        mapStateToProps: MapStateToProps;
        mapDispatchToProps: MapDispatchToProps;
        Connected: import("react-redux").ConnectedComponentClass<any, Pick<{}, never> & OwnProps>;
    };
    connectedNoOwnProps: <MapStateToProps extends (state: AState) => {}, MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>>(mapStateToProps: MapStateToProps, mapDispatchToProps: MapDispatchToProps, Component: import("react").FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>) => {
        Component: import("react").FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>;
        mapStateToProps: MapStateToProps;
        mapDispatchToProps: MapDispatchToProps;
        Connected: import("react-redux").ConnectedComponentClass<any, Pick<{}, never>>;
    };
};
