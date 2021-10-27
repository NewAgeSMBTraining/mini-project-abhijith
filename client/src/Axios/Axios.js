import Axios from "axios";

export const BaseURL = Axios.create({
    baseURL: "http://localhost:5000/api/",
})

export const AdminAxios = Axios.create({
    baseURL: "http://localhost:5000/api/admin/",
});

export const UserAxios = Axios.create({
    baseURL: "http://localhost:5000/api/user/",
});
