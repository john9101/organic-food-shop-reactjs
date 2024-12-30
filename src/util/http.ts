import axios, {AxiosInstance} from "axios";
// import {Mutex} from "async-mutex";

// class Http {
//     instance: AxiosInstance
//
//     constructor() {
//         this.instance = axios.create({
//             baseURL: "http://localhost:8080/api/v1",
//             timeout: 10000,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             withCredentials: true,
//         })
//     }
//
//
// }
//
// const http = new Http().instance


const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 10000,
    withCredentials: true,
})

// const mutex = new Mutex();
// const NO_RETRY_HEADER = 'x-no-retry';

instance.interceptors.request.use((config) => {
    const accessToken = window.localStorage.getItem("access_token")
    if (typeof window !== "undefined" && window && window.localStorage && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
})

export default instance


