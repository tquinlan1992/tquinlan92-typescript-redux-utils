import * as React from 'react';
import { MapDispatchToPropsParam } from "react-redux";
export interface WithStyles<Styles> {
    classes: {
        [P in keyof Styles]: string;
    };
}
export declare function withStyles<Styles = {}>(styles: Styles): <OtherProps = {}>(Component: React.FunctionComponent<WithStyles<Styles> & OtherProps>) => (props: any) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export declare function createConnectedProps<AppState>(): {
    connectedWithOwnProps: <OwnProps>() => <MapStateToProps extends (state: AppState, ownProps: OwnProps) => {}, MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>, Styles = {}>(mapStateToProps: MapStateToProps, mapDispatchToProps?: MapDispatchToProps, styles?: Styles) => (Component: React.FunctionComponent<ReturnType<MapStateToProps> & MapDispatchToProps & WithStyles<Styles>>) => {
        Component: React.FunctionComponent<ReturnType<MapStateToProps> & MapDispatchToProps & WithStyles<Styles>>;
        mapStateToProps: MapStateToProps;
        mapDispatchToProps: MapDispatchToProps;
        Connected: import("react-redux").ConnectedComponentClass<(props: any) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, Pick<any, never> & OwnProps>;
    };
    connectedNoOwnProps: <MapStateToProps extends (state: AppState, ownProps: {}) => {}, MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>, Styles = {}>(mapStateToProps: MapStateToProps, mapDispatchToProps?: MapDispatchToProps, styles?: Styles) => (Component: React.FunctionComponent<ReturnType<MapStateToProps> & MapDispatchToProps & WithStyles<Styles>>) => {
        Component: React.FunctionComponent<ReturnType<MapStateToProps> & MapDispatchToProps & WithStyles<Styles>>;
        mapStateToProps: MapStateToProps;
        mapDispatchToProps: MapDispatchToProps;
        Connected: import("react-redux").ConnectedComponentClass<(props: any) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, Pick<any, never>>;
    };
};