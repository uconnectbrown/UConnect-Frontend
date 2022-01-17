import axios from "axios";

function JWTUtil() {
    const client = axios.create({
        baseURL: "http://localhost:5000"
    });

    client.interceptors.request.use(function (config) {
        const token = localStorage.getItem("JWTToken");
        config.headers.Authorization = token ? `Bearer ${token}` : "";

        const username = localStorage.getItem("Username");
        config.headers.Username = username ? username : "";

        return config;
    });

    function authenticateToken() {
        client.get("/")
            .then((res) => {
                return res.status === 200;
            });
    }

    function loginOAuth(username, authCode, registrationId) {
        client.post(`/v1/user/authenticate/oauth/google${registrationId}`,
            {authCode: authCode})
            .then((res) => {
                const token = res.data.token;
                if (token) {
                    localStorage.setItem("JWTToken", token);
                    localStorage.setItem("Username", username);
                }

                return token;
            });
    }
}

export default JWTUtil;