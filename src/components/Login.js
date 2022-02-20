import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

const Login = (props) => {
	const form = useRef();
	const checkBtn = useRef();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const onChangeemail = (e) => {
		const email = e.target.value;
		setEmail(email);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleLogin = (e) => {
		e.preventDefault();

		setMessage("");
		setLoading(true);

		form.current.validateAll();

		if (checkBtn.current.context._errors.length === 0) {
			AuthService.login(email, password).then(
				() => {
					props.history.push("/user");
					window.location.reload();
				},
				(error) => {
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					setLoading(false);
					setMessage(resMessage);
				}
			);
		} else {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="col-md-8">
				<h1 className="text-center">Login</h1>
				<div className="card card-container">
					<div className="card-body">
						<Form onSubmit={handleLogin} ref={form}>
							<div className="form-group">
								<label htmlFor="email">email</label>
								<Input
									type="text"
									className="form-control"
									name="email"
									value={email}
									onChange={onChangeemail}
									validations={[required]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>
								<Input
									type="password"
									className="form-control"
									name="password"
									value={password}
									onChange={onChangePassword}
									validations={[required]}
								/>
							</div>

							<div className="form-group">
								<button
									className="btn btn-primary btn-block"
									disabled={loading}
								>
									{loading && (
										<span className="spinner-border spinner-border-sm"></span>
									)}
									<span>Login</span>
								</button>
							</div>

							{message && (
								<div className="form-group">
									<div
										className="alert alert-danger"
										role="alert"
									>
										{message}
									</div>
								</div>
							)}
							<CheckButton
								style={{ display: "none" }}
								ref={checkBtn}
							/>
						</Form>
						<hr />
						<p className="text-center">
							Do not have an account?{" "}
							<Link to="/register">Sign Up</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
