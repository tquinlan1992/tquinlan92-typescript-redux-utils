import * as React from 'react';
import { MapDispatchToPropsParam, ResolveThunks } from "react-redux";
export interface WithStyles<Styles> {
    classes: {
        [P in keyof Styles]: string;
    };
}
export declare function withStyles<Styles = {}>(styles: Styles): <OtherProps = {}>(Component: React.FunctionComponent<WithStyles<Styles> & OtherProps>) => (props: any) => JSX.Element;
export declare function createConnectedProps<AppState>(): {
    connectedWithOwnProps: <OwnProps>() => <MapStateToProps extends (state: AppState, ownProps: OwnProps) => {}, MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>, Component extends React.FunctionComponent<{}>, Styles = {}>(mapStateToProps: MapStateToProps, mapDispatchToProps: MapDispatchToProps, Component: React.FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps & WithStyles<Styles>>>, styles?: Styles) => {
        Component: React.FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps & WithStyles<Styles>>>;
        mapStateToProps: MapStateToProps;
        mapDispatchToProps: MapDispatchToProps;
        Connected: import("react-redux").ConnectedComponentClass<(props: any) => JSX.Element, Pick<any, Exclude<string, Extract<keyof ReturnType<MapStateToProps>, string> | Extract<keyof ResolveThunks<MapDispatchToProps>, string>>> & OwnProps>;
    };
    connectedNoOwnProps: <MapStateToProps extends (state: AppState, ownProps: {}) => {}, MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>, Component extends React.FunctionComponent<{}>, Styles = {}>(mapStateToProps: MapStateToProps, mapDispatchToProps: MapDispatchToProps, Component: React.FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps & WithStyles<Styles>>>, styles?: Styles) => {
        Component: React.FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps & WithStyles<Styles>>>;
        mapStateToProps: MapStateToProps;
        mapDispatchToProps: MapDispatchToProps;
        Connected: import("react-redux").ConnectedComponentClass<(props: any) => JSX.Element, Pick<any, Exclude<string, Extract<keyof ReturnType<MapStateToProps>, string> | Extract<keyof ResolveThunks<MapDispatchToProps>, string>>>>;
    };
};
