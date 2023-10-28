import axios from "axios";
const axiosClient = axios.create({
    baseURL:"http://localhost:3001",
    timeout:30000
})
axiosClient.interceptors.response.use(function(res){
    return res.data
}, function(e){
    return Promise.reject(e)
})
export default axiosClient;