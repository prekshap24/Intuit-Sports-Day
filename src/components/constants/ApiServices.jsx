import axios from "axios";
import AuthenticationService from "../authentication/AuthenticationService";

class ApiServices {

    getDetailsRequestParams(url, payload) {
        const response = axios.post(url, payload);
        return response;
    }

    getDetailsWithoutRequestParams(url) {
        const response = axios.get(url);
        return response;
    }

    postWithRequestParams(url, payload) {
        const response = axios.post(url, payload);
        return response;
    }
}

export default new ApiServices();
