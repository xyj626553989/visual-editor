import React, { ReactNode } from "react";
import { Route, RouteComponentProps, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CombinedState } from "@/store/reducers";
import { LoginState } from "@/store/reducers/login.reducer";
interface RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  path: string;
  strict?: boolean;
}
type Props = RouteProps & LoginState;
const Protect = (props: Props) => {
  const { component: Component, path } = props;
  const render = (RouterProps: RouteComponentProps): ReactNode => {
    if (props.token) {
      return <Component {...RouterProps} />;
    } else {
      return <Redirect to={{ pathname: "/login", state: { from: path } }} />;
    }
  };
  return <Route strict={props.strict} render={render} />;
};

export default connect((state: CombinedState) => state.login)(Protect);
