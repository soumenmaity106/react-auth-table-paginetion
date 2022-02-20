import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AuthService from "./services/auth.service";
import UserlsList from "./components/userList";
import EventBus from "./common/EventBus";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
	const [currentUser, setCurrentUser] = useState(undefined);
	useEffect(() => {
		const user = AuthService.getCurrentUser();
		if (user) {
			setCurrentUser(user);
		}

		EventBus.on("logout", () => {
			logOut();
		});

		return () => {
			EventBus.remove("logout");
		};
	}, []);
	const logOut = () => {
		AuthService.logout();
		setCurrentUser(undefined);
	};
	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<a href="/home" className="navbar-brand">
					souMen
				</a>
				{currentUser ? (
					<div className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to={"/"} className="nav-link">
								{currentUser.first_name}
							</Link>
						</li>
						<li className="nav-item">
							<a
								href="/login"
								className="nav-link"
								onClick={logOut}
							>
								LogOut
							</a>
						</li>
					</div>
				) : (
					<div className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to={"/login"} className="nav-link">
								Login
							</Link>
						</li>

						<li className="nav-item">
							<Link to={"/register"} className="nav-link">
								Sign Up
							</Link>
						</li>
					</div>
				)}
			</nav>

			<div className="container mt-3">
				<Switch>
					<PublicRoute exact path={["/", "/home"]} component={Home} />
					<PublicRoute exact path="/login" component={Login} />
					<PublicRoute exact path="/register" component={Register} />
					<PrivateRoute path="/user" component={UserlsList} />
				</Switch>
			</div>
		</div>
	);
}

export default App;
