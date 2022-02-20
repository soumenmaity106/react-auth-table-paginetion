import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
const PublicRoute = ({ component: Component, ...rest }) => {
	const isLogin = AuthService.isLogin();
	return (
		<Route
			{...rest}
			render={(props) =>
				isLogin ? <Redirect to="/user" /> : <Component {...props} />
			}
		/>
	);
};

export default PublicRoute;
