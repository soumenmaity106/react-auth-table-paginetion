import http from "../http-common";
import authHeader from "./auth-header";
const getAll = (params) => {
	return http.get("/user", { headers: authHeader(), params });
};

const findByTitle = (first_name) => {
	return http.get(`/user?first_name=${first_name}`, {
		headers: authHeader(),
	});
};

const UserService = {
	getAll,
	findByTitle,
};

export default UserService;
