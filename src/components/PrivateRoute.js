import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
const PrivateRoute = ({ component: Component, ...rest }) => {
	const isLogin = AuthService.isLogin();
	return (
		<Route
			{...rest}
			render={(props) =>
				isLogin ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;
