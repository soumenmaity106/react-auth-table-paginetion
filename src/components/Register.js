import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
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

const validEmail = (value) => {
	if (!isEmail(value)) {
		return (
			<div className="alert alert-danger" role="alert">
				This is not a valid email.
			</div>
		);
	}
};

const vfirst_name = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The first_name must be between 3 and 20 characters.
			</div>
		);
	}
};

const vlast_name = (value) => {
	if (value.length < 3 || value.length > 20) {
		return (
			<div className="alert alert-danger" role="alert">
				The first_name must be between 3 and 20 characters.
			</div>
		);
	}
};

const vpassword = (value) => {
	if (value.length < 8 || value.length > 16) {
		return (
			<div className="alert alert-danger" role="alert">
				The password must be between 8 and 16 characters.
			</div>
		);
	}
};

const Register = (props) => {
	const form = useRef();
	const checkBtn = useRef();

	const [first_name, setfirst_name] = useState("");
	const [last_name, setlest_name] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState("");

	const onChangefirst_name = (e) => {
		const first_name = e.target.value;
		setfirst_name(first_name);
	};
	const onChangelast_name = (e) => {
		const last_name = e.target.value;
		setlest_name(last_name);
	};

	const onChangeEmail = (e) => {
		const email = e.target.value;
		setEmail(email);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};

	const handleRegister = (e) => {
		e.preventDefault();

		setMessage("");
		setSuccessful(false);

		form.current.validateAll();

		if (checkBtn.current.context._errors.length === 0) {
			AuthService.register(first_name, last_name, email, password).then(
				(response) => {
					setMessage(response.data.message);
					setSuccessful(true);
				},
				(error) => {
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();

					setMessage(resMessage);
					setSuccessful(false);
				}
			);
		}
	};

	return (
		<div className="col-md-8">
			<h1 className="text-center">Sign Up</h1>
			<div className="card card-container">
				<div className="card-body">
					<Form onSubmit={handleRegister} ref={form}>
						{!successful && (
							<div>
								<div className="form-group">
									<label htmlFor="first_name">
										First Name
									</label>
									<Input
										type="text"
										className="form-control"
										name="first_name"
										value={first_name}
										onChange={onChangefirst_name}
										validations={[required, vfirst_name]}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="last_name">Last Name</label>
									<Input
										type="text"
										className="form-control"
										name="last_name"
										value={last_name}
										onChange={onChangelast_name}
										validations={[required, vlast_name]}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email">Email</label>
									<Input
										type="text"
										className="form-control"
										name="email"
										value={email}
										onChange={onChangeEmail}
										validations={[required, validEmail]}
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
										validations={[required, vpassword]}
									/>
								</div>

								<div className="form-group">
									<button className="btn btn-primary btn-block">
										Sign Up
									</button>
								</div>
							</div>
						)}

						{message && (
							<div className="form-group">
								<div
									className={
										successful
											? "alert alert-success"
											: "alert alert-danger"
									}
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
						Already have an account?
						<Link to="/login">Login</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
