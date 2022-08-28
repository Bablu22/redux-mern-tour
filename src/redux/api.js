import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:8000/" });


API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})


export const signIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const googleSignUp = (data) => API.post("/user/googleSignIn", data);

// Tours api
export const createTourApi = (data) => API.post("/tour", data);
export const getTourApi = () => API.get("/tour");
export const getTour = (id) => API.get(`/tour/${id}`);
export const getTourByUserAPI = (userId) => API.get(`/tour/userTours/${userId}`);
export const deleteTourApi = (id) => API.delete(`/tour/${id}`);
export const updateTourApi = (updatedTourData, id) => API.patch(`/tour/${id}`, updatedTourData);


