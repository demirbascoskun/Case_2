import axios from 'axios';


const axiosInstance = axios.create({
	baseURL: "http://localhost:2501/api",
	timeout: 5000,
	headers: {
		Authorization: window.localStorage.getItem('user_token')
			? 'token ' + window.localStorage.getItem('user_token')
			: null,
		'Content-Type': 'multipart/form-data',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {

		if (
			error.response.status === 401
		) {
			
			window.location.reload();
			return Promise.reject(error);
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;