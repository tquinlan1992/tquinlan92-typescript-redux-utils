import * as React from 'react';
import { MapDispatchToPropsParam, ResolveThunks } from "react-redux";
export interface WithStyles<Styles> {
    classes: {
        [P in keyof Styles]: string;
    };
}
export declare function withStyles<Styles = {}>(styles: Styles): <OtherProps = {}>(Component: React.FunctionComponent<WithStyles<Styles> & OtherProps>) => (props: any) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;

export declare function createConnectProps<AppState>(): <MapStateToProps extends (state: AppState, ownProps: any) => {}, MapDispatchToProps extends MapDispatchToPropsParam<{}, {}>>(mapStateToProps: MapStateToProps, mapDispatchToProps?: MapDispatchToProps) => (Component: React.FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>) => {
    Component: React.FunctionComponent<ReturnType<MapStateToProps> & ResolveThunks<MapDispatchToProps>>;
    mapStateToProps: MapStateToProps;
    mapDispatchToProps: MapDispatchToProps;
    Connected: import("react-redux").ConnectedComponentClass<(props: any) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>, Pick<any, never> & Parameters<MapStateToProps>[1] | {}>;
};